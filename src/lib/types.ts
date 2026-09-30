export type ColorOption = { name: string; hex: string };

export type Department = "men" | "women" | "unisex";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  department: Department;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  badge: string | null;
  featured: boolean;
  active: boolean;
  stock: number;
  createdAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  order: number;
};

export type Announcement = {
  id: string;
  text: string;
  href: string;
  active: boolean;
  order: number;
};

export type LinkItem = { label: string; href: string };

export type FeatureItem = { id: string; icon: string; title: string; text: string };

export type FooterColumn = { id: string; title: string; links: LinkItem[] };


export type StyleTile = { id: string; label: string; href: string; image: string };

export type InstagramTile = { id: string; image: string; href: string };

export type Settings = {
  brandName: string;
  brandMark: string;
  logo: string;
  tagline: string;
  location: string;
  currency: string;
  currencyCode: string;

  announcementEnabled: boolean;
  announcementSeconds: number;

  nav: LinkItem[];

  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    image: string;
    mobileImage: string;
  };


  newArrivals: { title: string; subtitle: string; href: string };

  edit: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };

  denim: {
    title: string;
    subtitle: string;
    fits: LinkItem[];
    ctaLabel: string;
    ctaHref: string;
  };

  look: {
    title: string;
    text: string;
    frontLabel: string;
    backLabel: string;
    frontImage: string;
    backImage: string;
    ctaLabel: string;
    ctaHref: string;
  };

  why: { title: string; items: FeatureItem[] };

  styleInspiration: {
    title: string;
    subtitle: string;
    tiles: StyleTile[];
    ctaLabel: string;
    ctaHref: string;
  };

  instagram: {
    title: string;
    subtitle: string;
    handle: string;
    profileUrl: string;
    tiles: InstagramTile[];
    ctaLabel: string;
  };

  brandStory: {
    titleLine1: string;
    titleLine2: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
  };

  newsletter: { title: string; text: string; buttonLabel: string };

  footer: { about: string; columns: FooterColumn[]; copyright: string };

  freeShippingThreshold: number;
};

export type Store = {
  products: Product[];
  categories: Category[];
  announcements: Announcement[];
  settings: Settings;
  subscribers: { id: string; email: string; createdAt: string }[];
};
