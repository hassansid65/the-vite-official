"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mutateStore, newId, resetStore, slugify, uniqueSlug } from "@/lib/db";
import { checkPassword, endSession, isAuthed, startSession } from "@/lib/auth";
import type {
  Announcement,
  Category,
  ColorOption,
  Department,
  LinkItem,
  Product,
} from "@/lib/types";

export type ActionState = { status: "idle" | "ok" | "error"; message: string };

const OK = (message: string): ActionState => ({ status: "ok", message });
const ERR = (message: string): ActionState => ({ status: "error", message });

/** Every mutating action goes through this, so an expired session can't write. */
async function requireAuth() {
  if (!(await isAuthed())) throw new Error("Not authorised");
}

function refresh() {
  revalidatePath("/", "layout");
}

const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
const bool = (fd: FormData, key: string) => fd.get(key) === "on" || fd.get(key) === "true";
const num = (fd: FormData, key: string, fallback = 0) => {
  const raw = str(fd, key);
  const n = Number(raw);
  return raw === "" || Number.isNaN(n) ? fallback : n;
};

function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseCsv(raw: string): string[] {
  return raw
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Splits "a | b | c" into a fixed-length array, padding with "". */
function parsePipes(line: string, count: number): string[] {
  const parts = line.split("|").map((p) => p.trim());
  return Array.from({ length: count }, (_, i) => parts[i] ?? "");
}

function parseLinks(raw: string): LinkItem[] {
  return parseLines(raw).map((line) => {
    const [label, href] = parsePipes(line, 2);
    return { label: label || "Link", href: href || "/" };
  });
}

/** "Black #111111" per line -> colour options. */
function parseColors(raw: string): ColorOption[] {
  return parseLines(raw).map((line) => {
    const m = line.match(/^(.*?)\s*(#[0-9a-fA-F]{3,8})\s*$/);
    if (m) return { name: m[1].trim() || "Colour", hex: m[2] };
    return { name: line, hex: "#111111" };
  });
}

/* ----------------------------------------------------------------- auth */

export async function loginAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const password = str(fd, "password");
  if (!password) return ERR("Enter your password.");
  if (!checkPassword(password)) return ERR("That password is not right.");
  await startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------- products */

const DEPARTMENTS: Department[] = ["men", "women", "unisex"];

export async function saveProductAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  await requireAuth();

  const id = str(fd, "id");
  const name = str(fd, "name");
  if (!name) return ERR("A product needs a name.");

  const price = num(fd, "price");
  if (price < 0) return ERR("Price cannot be negative.");

  const compareRaw = str(fd, "compareAtPrice");
  const compareAtPrice = compareRaw === "" ? null : Number(compareRaw);
  if (compareAtPrice !== null && Number.isNaN(compareAtPrice)) {
    return ERR("Compare-at price must be a number.");
  }

  const images = parseLines(str(fd, "images"));
  if (images.length === 0) return ERR("Add at least one image.");

  const categoryId = str(fd, "categoryId");
  if (!categoryId) return ERR("Pick a category.");

  const deptRaw = str(fd, "department") as Department;
  const department: Department = DEPARTMENTS.includes(deptRaw) ? deptRaw : "unisex";

  const fields = {
    name,
    description: str(fd, "description"),
    categoryId,
    department,
    price,
    compareAtPrice,
    images,
    colors: parseColors(str(fd, "colors")),
    sizes: parseCsv(str(fd, "sizes")),
    badge: str(fd, "badge") || null,
    featured: bool(fd, "featured"),
    active: bool(fd, "active"),
    stock: Math.max(0, Math.round(num(fd, "stock"))),
  };

  const desiredSlug = slugify(str(fd, "slug") || name);

  const savedId = await mutateStore((store) => {
    if (id) {
      const existing = store.products.find((p) => p.id === id);
      if (!existing) return null;
      const taken = store.products.filter((p) => p.id !== id).map((p) => p.slug);
      Object.assign(existing, fields, { slug: uniqueSlug(desiredSlug, taken) });
      return existing.id;
    }
    const taken = store.products.map((p) => p.slug);
    const product: Product = {
      id: newId("p"),
      slug: uniqueSlug(desiredSlug, taken),
      createdAt: new Date().toISOString(),
      ...fields,
    };
    store.products.unshift(product);
    return product.id;
  });

  if (!savedId) return ERR("That product no longer exists.");

  refresh();
  if (!id) redirect(`/admin/products/${savedId}?created=1`);
  return OK("Product saved.");
}

export async function deleteProductAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  await mutateStore((store) => {
    store.products = store.products.filter((p) => p.id !== id);
  });
  refresh();
  redirect("/admin/products");
}

export async function toggleProductFieldAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  const field = str(fd, "field");
  if (field !== "active" && field !== "featured") return;
  await mutateStore((store) => {
    const p = store.products.find((x) => x.id === id);
    if (p) p[field] = !p[field];
  });
  refresh();
}

export async function duplicateProductAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  const copyId = await mutateStore((store) => {
    const src = store.products.find((p) => p.id === id);
    if (!src) return null;
    const taken = store.products.map((p) => p.slug);
    const copy: Product = {
      ...src,
      id: newId("p"),
      slug: uniqueSlug(`${src.slug}-copy`, taken),
      name: `${src.name} (copy)`,
      featured: false,
      active: false,
      createdAt: new Date().toISOString(),
    };
    store.products.unshift(copy);
    return copy.id;
  });
  refresh();
  if (copyId) redirect(`/admin/products/${copyId}`);
}

/* ----------------------------------------------------------- categories */

export async function saveCategoryAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  await requireAuth();

  const id = str(fd, "id");
  const name = str(fd, "name");
  if (!name) return ERR("A collection needs a name.");

  const fields = {
    name,
    description: str(fd, "description"),
    image: str(fd, "image"),
    order: Math.round(num(fd, "order", 99)),
  };
  const desiredSlug = slugify(str(fd, "slug") || name);

  await mutateStore((store) => {
    if (id) {
      const existing = store.categories.find((c) => c.id === id);
      if (!existing) return;
      const taken = store.categories.filter((c) => c.id !== id).map((c) => c.slug);
      Object.assign(existing, fields, { slug: uniqueSlug(desiredSlug, taken) });
      return;
    }
    const taken = store.categories.map((c) => c.slug);
    const cat: Category = { id: newId("cat"), slug: uniqueSlug(desiredSlug, taken), ...fields };
    store.categories.push(cat);
  });

  refresh();
  return OK("Collection saved.");
}

export async function deleteCategoryAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  await mutateStore((store) => {
    // Products in a removed collection are kept but hidden, never silently lost.
    for (const p of store.products) {
      if (p.categoryId === id) {
        p.active = false;
        p.featured = false;
      }
    }
    store.categories = store.categories.filter((c) => c.id !== id);
  });
  refresh();
  redirect("/admin/collections");
}

/* -------------------------------------------------------- announcements */

export async function saveAnnouncementAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  await requireAuth();

  const id = str(fd, "id");
  const text = str(fd, "text");
  if (!text) return ERR("An announcement needs some text.");

  const fields = {
    text,
    href: str(fd, "href"),
    active: bool(fd, "active"),
    order: Math.round(num(fd, "order", 99)),
  };

  await mutateStore((store) => {
    if (id) {
      const existing = store.announcements.find((a) => a.id === id);
      if (existing) Object.assign(existing, fields);
      return;
    }
    const item: Announcement = { id: newId("a"), ...fields };
    store.announcements.push(item);
  });

  refresh();
  return OK("Announcement saved.");
}

export async function deleteAnnouncementAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  await mutateStore((store) => {
    store.announcements = store.announcements.filter((a) => a.id !== id);
  });
  refresh();
}

export async function toggleAnnouncementAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  await mutateStore((store) => {
    const a = store.announcements.find((x) => x.id === id);
    if (a) a.active = !a.active;
  });
  refresh();
}

/* ------------------------------------------------------------- settings */

export async function saveSettingsAction(
  _prev: ActionState,
  fd: FormData,
): Promise<ActionState> {
  await requireAuth();

  await mutateStore((store) => {
    const s = store.settings;

    /* Brand */
    s.brandName = str(fd, "brandName") || s.brandName;
    s.brandMark = str(fd, "brandMark") || s.brandMark;
    s.logo = str(fd, "logo");
    s.tagline = str(fd, "tagline");
    s.location = str(fd, "location");
    s.currency = str(fd, "currency") || "₹";
    s.currencyCode = str(fd, "currencyCode") || "INR";
    s.freeShippingThreshold = Math.max(0, num(fd, "freeShippingThreshold"));

    /* Announcement bar */
    s.announcementEnabled = bool(fd, "announcementEnabled");
    s.announcementSeconds = Math.max(2, Math.round(num(fd, "announcementSeconds", 5)));

    /* Navigation */
    s.nav = parseLinks(str(fd, "nav"));

    /* Hero */
    s.hero = {
      eyebrow: str(fd, "heroEyebrow"),
      titleLine1: str(fd, "heroTitleLine1"),
      titleLine2: str(fd, "heroTitleLine2"),
      subtitle: str(fd, "heroSubtitle"),
      ctaLabel: str(fd, "heroCtaLabel"),
      ctaHref: str(fd, "heroCtaHref") || "/shop",
      secondaryCtaLabel: str(fd, "heroSecondaryCtaLabel"),
      secondaryCtaHref: str(fd, "heroSecondaryCtaHref") || "/shop",
      image: str(fd, "heroImage") || s.hero.image,
      mobileImage: str(fd, "heroMobileImage"),
    };


    /* New arrivals */
    s.newArrivals = {
      title: str(fd, "newArrivalsTitle") || s.newArrivals.title,
      subtitle: str(fd, "newArrivalsSubtitle"),
      href: str(fd, "newArrivalsHref") || "/shop",
    };

    /* The Vite Edit */
    s.edit = {
      eyebrow: str(fd, "editEyebrow"),
      titleLine1: str(fd, "editTitleLine1"),
      titleLine2: str(fd, "editTitleLine2"),
      text: str(fd, "editText"),
      ctaLabel: str(fd, "editCtaLabel"),
      ctaHref: str(fd, "editCtaHref") || "/shop",
    };

    /* Denim */
    s.denim = {
      title: str(fd, "denimTitle") || s.denim.title,
      subtitle: str(fd, "denimSubtitle"),
      fits: parseLinks(str(fd, "denimFits")),
      ctaLabel: str(fd, "denimCtaLabel"),
      ctaHref: str(fd, "denimCtaHref") || "/shop",
    };

    /* The Look */
    s.look = {
      title: str(fd, "lookTitle") || s.look.title,
      text: str(fd, "lookText"),
      frontLabel: str(fd, "lookFrontLabel") || "FRONT VIEW",
      backLabel: str(fd, "lookBackLabel") || "BACK VIEW",
      frontImage: str(fd, "lookFrontImage"),
      backImage: str(fd, "lookBackImage"),
      ctaLabel: str(fd, "lookCtaLabel"),
      ctaHref: str(fd, "lookCtaHref") || "/shop",
    };

    /* Why The Vite — four fixed slots */
    s.why = {
      title: str(fd, "whyTitle") || s.why.title,
      items: s.why.items.map((item, i) => ({
        id: item.id,
        icon: str(fd, `whyIcon${i}`) || item.icon,
        title: str(fd, `whyItemTitle${i}`),
        text: str(fd, `whyItemText${i}`),
      })),
    };

    /* Style inspiration */
    s.styleInspiration = {
      title: str(fd, "styleTitle") || s.styleInspiration.title,
      subtitle: str(fd, "styleSubtitle"),
      tiles: parseLines(str(fd, "styleTiles")).map((line, i) => {
        const [label, href, image] = parsePipes(line, 3);
        return {
          id: s.styleInspiration.tiles[i]?.id ?? newId("st"),
          label: label || "Style",
          href: href || "/shop",
          image,
        };
      }),
      ctaLabel: str(fd, "styleCtaLabel"),
      ctaHref: str(fd, "styleCtaHref") || "/collections",
    };

    /* Instagram */
    const profileUrl = str(fd, "instagramProfileUrl") || s.instagram.profileUrl;
    s.instagram = {
      title: str(fd, "instagramTitle") || s.instagram.title,
      subtitle: str(fd, "instagramSubtitle"),
      handle: str(fd, "instagramHandle"),
      profileUrl,
      tiles: parseLines(str(fd, "instagramTiles")).map((line, i) => {
        const [image, href] = parsePipes(line, 2);
        return {
          id: s.instagram.tiles[i]?.id ?? newId("ig"),
          image,
          href: href || profileUrl,
        };
      }),
      ctaLabel: str(fd, "instagramCtaLabel"),
    };

    /* Brand story */
    s.brandStory = {
      titleLine1: str(fd, "storyTitleLine1"),
      titleLine2: str(fd, "storyTitleLine2"),
      body: str(fd, "storyBody"),
      ctaLabel: str(fd, "storyCtaLabel"),
      ctaHref: str(fd, "storyCtaHref") || "/about",
      image: str(fd, "storyImage"),
    };

    /* Newsletter */
    s.newsletter = {
      title: str(fd, "newsletterTitle"),
      text: str(fd, "newsletterText"),
      buttonLabel: str(fd, "newsletterButton") || "JOIN",
    };

    /* Footer */
    s.footer.about = str(fd, "footerAbout");
    s.footer.copyright = str(fd, "footerCopyright");
    s.footer.columns = s.footer.columns.map((col, i) => ({
      id: col.id,
      title: str(fd, `footerColTitle${i}`) || col.title,
      links: parseLinks(str(fd, `footerColLinks${i}`)),
    }));
  });

  refresh();
  return OK("Settings saved.");
}

/* ---------------------------------------------------------- maintenance */

export async function deleteSubscriberAction(fd: FormData): Promise<void> {
  await requireAuth();
  const id = str(fd, "id");
  await mutateStore((store) => {
    store.subscribers = store.subscribers.filter((s) => s.id !== id);
  });
  refresh();
}

export async function resetStoreAction(fd: FormData): Promise<void> {
  await requireAuth();
  if (str(fd, "confirm") !== "RESET") return;
  await resetStore();
  refresh();
  redirect("/admin?reset=1");
}
