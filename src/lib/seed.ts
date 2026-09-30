import type { Department, Store } from "./types";

const INDIGO = { name: "Indigo", hex: "#2F3F5C" };
const MIDBLUE = { name: "Mid Blue", hex: "#5A7296" };
const BLACK = { name: "Black", hex: "#141414" };
const CHARCOAL = { name: "Charcoal", hex: "#4A4A4A" };
const WHITE = { name: "White", hex: "#EDEAE4" };
const STONE = { name: "Stone", hex: "#B9A899" };
const OLIVE = { name: "Olive", hex: "#585B44" };

const CLOTHES = ["S", "M", "L", "XL", "XXL"];
const WAISTS = ["28", "30", "32", "34", "36", "38"];

const IG = "https://instagram.com/theviteofficial";

const IMG = {
  jacket: "/images/products/tech-jacket.jpg",
  hoodie: "/images/products/oversized-hoodie.jpg",
  tee: "/images/products/utility-tee.jpg",
  denim: "/images/products/cargo-pants.jpg",
  look: "/images/products/storm-parka.jpg",
  hero: "/images/hero.jpg",
  heroMobile: "/images/hero-mobile.jpg",
};

type SeedProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  department: Department;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  images?: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: string | null;
  featured?: boolean;
  stock: number;
};

const PRODUCTS: SeedProduct[] = [
  {
    id: "p_classic_blue_denim",
    slug: "classic-blue-denim",
    name: "Classic Blue Denim",
    description:
      "A straight-leg jean in a clean mid-blue wash. Cut for everyday wear, with enough room through the thigh to move and a hem that sits right over a sneaker.",
    categoryId: "cat_denim",
    department: "men",
    price: 2499,
    compareAtPrice: 2999,
    image: IMG.denim,
    colors: [MIDBLUE, INDIGO, BLACK],
    sizes: WAISTS,
    badge: "NEW",
    featured: false,
    stock: 32,
  },
  {
    id: "p_premium_oversized_tee",
    slug: "premium-oversized-tee",
    name: "Premium Oversized Tee",
    description:
      "A heavyweight cotton tee with a dropped shoulder and a boxy body. Holds its shape wash after wash and layers cleanly under a shirt or jacket.",
    categoryId: "cat_tshirts",
    department: "unisex",
    price: 1299,
    compareAtPrice: null,
    image: IMG.tee,
    colors: [BLACK, WHITE, STONE],
    sizes: CLOTHES,
    badge: "NEW",
    featured: false,
    stock: 74,
  },
  {
    id: "p_essential_casual_shirt",
    slug: "essential-casual-shirt",
    name: "Essential Casual Shirt",
    description:
      "An easy button-down that works on its own or open over a tee. Soft brushed weave, a relaxed collar and a hem short enough to wear untucked.",
    categoryId: "cat_shirts",
    department: "men",
    price: 1899,
    compareAtPrice: null,
    image: IMG.hoodie,
    colors: [BLACK, WHITE, OLIVE],
    sizes: CLOTHES,
    badge: "NEW",
    featured: false,
    stock: 41,
  },
  {
    id: "p_relaxed_fit_jeans",
    slug: "relaxed-fit-jeans",
    name: "Relaxed Fit Jeans",
    description:
      "A wider, easier jean with a straight fall from the knee. Rigid cotton denim that softens with wear and keeps its shape through the day.",
    categoryId: "cat_jeans",
    department: "men",
    price: 2799,
    compareAtPrice: null,
    image: IMG.denim,
    colors: [INDIGO, BLACK],
    sizes: WAISTS,
    badge: "NEW",
    featured: false,
    stock: 27,
  },
  {
    id: "p_slim_fit_jeans",
    slug: "slim-fit-jeans",
    name: "Slim Fit Jeans",
    description:
      "A narrow leg with a little stretch, tapered from the knee down. The everyday pair for anyone who likes a closer fit.",
    categoryId: "cat_denim",
    department: "men",
    price: 2299,
    compareAtPrice: null,
    image: IMG.denim,
    colors: [INDIGO, MIDBLUE, BLACK],
    sizes: WAISTS,
    badge: null,
    stock: 38,
  },
  {
    id: "p_distressed_denim",
    slug: "distressed-denim",
    name: "Distressed Denim",
    description:
      "Worn-in denim with hand-finished detailing at the knee and hem. A relaxed fit with character built in from day one.",
    categoryId: "cat_denim",
    department: "unisex",
    price: 2699,
    compareAtPrice: 3199,
    image: IMG.denim,
    colors: [MIDBLUE, INDIGO],
    sizes: WAISTS,
    badge: "SALE",
    stock: 19,
  },
  {
    id: "p_everyday_crew_tee",
    slug: "everyday-crew-tee",
    name: "Everyday Crew Tee",
    description:
      "The plain tee done properly. Combed cotton, a ribbed collar that keeps its shape, and a regular fit that sits close without clinging.",
    categoryId: "cat_tshirts",
    department: "unisex",
    price: 899,
    compareAtPrice: null,
    image: IMG.tee,
    colors: [WHITE, BLACK, CHARCOAL],
    sizes: CLOTHES,
    badge: null,
    stock: 96,
  },
  {
    id: "p_oversized_sweatshirt",
    slug: "oversized-sweatshirt",
    name: "Oversized Sweatshirt",
    description:
      "Brushed-back fleece with a dropped shoulder and ribbed cuffs. Warm without bulk, and cut long enough to wear over a tee.",
    categoryId: "cat_sweatshirts",
    department: "unisex",
    price: 1999,
    compareAtPrice: null,
    image: IMG.hoodie,
    colors: [BLACK, CHARCOAL, STONE],
    sizes: CLOTHES,
    badge: null,
    stock: 33,
  },
  {
    id: "p_smart_casual_shirt",
    slug: "smart-casual-shirt",
    name: "Smart Casual Shirt",
    description:
      "A crisp shirt with a structured collar that holds a clean line. Dress it up for the evening or wear it open over a tee.",
    categoryId: "cat_shirts",
    department: "men",
    price: 2199,
    compareAtPrice: null,
    image: IMG.hoodie,
    colors: [WHITE, BLACK],
    sizes: CLOTHES,
    badge: null,
    stock: 24,
  },
  {
    id: "p_relaxed_trousers",
    slug: "relaxed-trousers",
    name: "Relaxed Trousers",
    description:
      "A soft-tailored trouser with a straight leg and an easy waistband. Smart enough to dress up, comfortable enough for all day.",
    categoryId: "cat_trousers",
    department: "men",
    price: 2399,
    compareAtPrice: null,
    image: IMG.denim,
    colors: [BLACK, OLIVE, STONE],
    sizes: WAISTS,
    badge: null,
    stock: 21,
  },
  {
    id: "p_womens_relaxed_tee",
    slug: "womens-relaxed-tee",
    name: "Relaxed Tee",
    description:
      "An easy everyday tee with a slightly cropped body and a soft hand feel. Works with high-rise denim or layered under a shirt.",
    categoryId: "cat_tshirts",
    department: "women",
    price: 1199,
    compareAtPrice: null,
    image: IMG.tee,
    colors: [WHITE, BLACK, STONE],
    sizes: CLOTHES,
    badge: null,
    stock: 48,
  },
  {
    id: "p_womens_high_rise_denim",
    slug: "womens-high-rise-denim",
    name: "High Rise Denim",
    description:
      "A high-rise jean with a straight leg and a clean indigo wash. Holds its shape through the day and pairs with almost anything.",
    categoryId: "cat_denim",
    department: "women",
    price: 2599,
    compareAtPrice: null,
    image: IMG.denim,
    colors: [INDIGO, MIDBLUE, BLACK],
    sizes: WAISTS,
    badge: null,
    stock: 29,
  },
];

const LOOK = (slug: string, n: number) => [
  `/images/products/${slug}-front.jpg`,
  `/images/products/${slug}-back.jpg`,
  ...Array.from({ length: n }, (_, i) => `/images/products/${slug}-detail${i + 1}.jpg`),
];

const ARRIVALS: SeedProduct[] = [
  {
    id: "p_onyx_classic_shirt",
    slug: "onyx-classic-shirt",
    name: "Onyx Classic Shirt",
    description:
      "A clean-cut shirt in a soft matte weave, worn here with a straight-leg blue denim. Quality buttons, a relaxed collar and a hem that sits right whether it is tucked or loose.",
    categoryId: "cat_shirts",
    department: "men",
    price: 1899,
    compareAtPrice: 2299,
    image: "",
    images: LOOK("onyx-classic-shirt", 5),
    colors: [BLACK, CHARCOAL],
    sizes: CLOTHES,
    badge: "NEW",
    featured: true,
    stock: 26,
  },
  {
    id: "p_cocoa_sweatshirt",
    slug: "cocoa-oversized-sweatshirt",
    name: "Cocoa Oversized Sweatshirt",
    description:
      "Heavyweight brushed fleece in a deep cocoa, cut oversized with ribbed cuffs and hem. Styled with a light-wash classic denim.",
    categoryId: "cat_sweatshirts",
    department: "unisex",
    price: 2199,
    compareAtPrice: null,
    image: "",
    images: LOOK("cocoa-oversized-sweatshirt", 4),
    colors: [{ name: "Cocoa", hex: "#4A342B" }, BLACK],
    sizes: CLOTHES,
    badge: "NEW",
    featured: true,
    stock: 31,
  },
  {
    id: "p_graphite_washed_tee",
    slug: "graphite-washed-tee",
    name: "Graphite Washed Tee",
    description:
      "A garment-washed tee with a boxy drop shoulder and a soft, lived-in hand feel. Finished with the signature Vite mark at the chest.",
    categoryId: "cat_tshirts",
    department: "unisex",
    price: 1299,
    compareAtPrice: null,
    image: "",
    images: LOOK("graphite-washed-tee", 5),
    colors: [CHARCOAL, BLACK],
    sizes: CLOTHES,
    badge: "NEW",
    featured: true,
    stock: 58,
  },
  {
    id: "p_ivory_utility_overshirt",
    slug: "ivory-utility-overshirt",
    name: "Ivory Utility Overshirt",
    description:
      "An easy overshirt in a warm ivory with twin chest pockets, worn open over a white tee. Light enough to layer all year.",
    categoryId: "cat_shirts",
    department: "men",
    price: 2499,
    compareAtPrice: null,
    image: "",
    images: LOOK("ivory-utility-overshirt", 4),
    colors: [{ name: "Ivory", hex: "#E9E2D4" }, STONE],
    sizes: CLOTHES,
    badge: "NEW",
    featured: true,
    stock: 22,
  },
  {
    id: "p_espresso_field_overshirt",
    slug: "espresso-field-overshirt",
    name: "Espresso Field Overshirt",
    description:
      "A brushed cotton overshirt in deep espresso with twin flap pockets, worn open over a white tee and cream utility trousers. Light enough to layer, structured enough to wear as a jacket.",
    categoryId: "cat_shirts",
    department: "men",
    price: 2299,
    compareAtPrice: null,
    image: "",
    images: [
      "/images/products/espresso-field-overshirt-front.jpg",
      "/images/products/espresso-field-overshirt-back.jpg",
    ],
    colors: [{ name: "Espresso", hex: "#4A342B" }, { name: "Sand", hex: "#E5DCC8" }],
    sizes: CLOTHES,
    badge: "NEW",
    featured: true,
    stock: 18,
  },
];

export function seedStore(): Store {
  const now = Date.now();

  return {
    categories: [
      {
        id: "cat_denim",
        slug: "denim",
        name: "Denim",
        description: "From classic fits to relaxed silhouettes — find the pair that feels like yours.",
        image: IMG.denim,
        order: 1,
      },
      {
        id: "cat_jeans",
        slug: "jeans",
        name: "Jeans",
        description: "Everyday jeans in fits that actually work.",
        image: IMG.denim,
        order: 2,
      },
      {
        id: "cat_shirts",
        slug: "shirts",
        name: "Shirts",
        description: "Easy pieces. Effortless style.",
        image: IMG.hoodie,
        order: 3,
      },
      {
        id: "cat_tshirts",
        slug: "t-shirts",
        name: "T-Shirts",
        description: "Everyday essentials, elevated.",
        image: IMG.tee,
        order: 4,
      },
      {
        id: "cat_sweatshirts",
        slug: "sweatshirts",
        name: "Sweatshirts",
        description: "Warm layers with an easy fit.",
        image: IMG.hoodie,
        order: 5,
      },
      {
        id: "cat_trousers",
        slug: "trousers",
        name: "Trousers",
        description: "Soft-tailored trousers for every day.",
        image: IMG.denim,
        order: 6,
      },
    ],

    // Newest first, so the New Arrivals grid has a sensible default order.
    products: [...ARRIVALS, ...PRODUCTS].map((p, i) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      categoryId: p.categoryId,
      department: p.department,
      price: p.price,
      compareAtPrice: p.compareAtPrice ?? null,
      images: p.images ?? [p.image],
      colors: p.colors,
      sizes: p.sizes,
      badge: p.badge ?? null,
      featured: p.featured ?? false,
      active: true,
      stock: p.stock,
      createdAt: new Date(now - i * 60_000).toISOString(),
    })),

    announcements: [
      {
        id: "a_1",
        text: "NEW ARRIVALS ARE HERE • SHOP THE LATEST STYLES",
        href: "/shop",
        active: true,
        order: 1,
      },
      {
        id: "a_2",
        text: "PREMIUM FASHION • CURATED FOR YOUR STYLE",
        href: "/shop",
        active: true,
        order: 2,
      },
    ],

    subscribers: [],

    settings: {
      brandName: "The Vite",
      brandMark: "THE VITE",
      logo: "/images/logo.png",
      tagline: "Curated fashion for every version of you",
      location: "Jaipur",
      currency: "₹",
      currencyCode: "INR",

      announcementEnabled: true,
      announcementSeconds: 5,

      nav: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Men", href: "/men" },
        { label: "Women", href: "/women" },
        { label: "Collections", href: "/collections" },
        { label: "About", href: "/about" },
      ],

      hero: {
        eyebrow: "THE VITE — JAIPUR",
        titleLine1: "YOUR STYLE.",
        titleLine2: "YOUR STATEMENT.",
        subtitle: "Curated fashion pieces for every version of you.",
        ctaLabel: "SHOP COLLECTION",
        ctaHref: "/shop",
        secondaryCtaLabel: "EXPLORE NEW ARRIVALS",
        secondaryCtaHref: "/shop?sort=new",
        image: IMG.hero,
        mobileImage: IMG.heroMobile,
      },


      newArrivals: {
        title: "NEW ARRIVALS",
        subtitle: "Fresh styles. New fits. Your next favourite piece.",
        href: "/shop",
      },

      edit: {
        eyebrow: "THE VITE EDIT",
        titleLine1: "BUILT FOR EVERYDAY.",
        titleLine2: "MADE TO STAND OUT.",
        text: "From everyday denim to statement shirts, discover pieces that bring comfort, character and confidence to your wardrobe.",
        ctaLabel: "EXPLORE THE EDIT",
        ctaHref: "/shop",
      },

      denim: {
        title: "DENIM, YOUR WAY.",
        subtitle:
          "From classic fits to relaxed silhouettes — find the pair that feels like yours.",
        fits: [
          { label: "SLIM FIT", href: "/collections/denim" },
          { label: "REGULAR FIT", href: "/collections/denim" },
          { label: "RELAXED FIT", href: "/collections/jeans" },
          { label: "FLARED", href: "/collections/denim" },
          { label: "DISTRESSED", href: "/product/distressed-denim" },
        ],
        ctaLabel: "SHOP DENIM",
        ctaHref: "/collections/denim",
      },

      look: {
        title: "THE LOOK",
        text: "The right fit changes everything.",
        frontLabel: "FRONT VIEW",
        backLabel: "BACK VIEW",
        frontImage: "/images/looks/look-front.jpg",
        backImage: "/images/looks/look-back.jpg",
        ctaLabel: "SHOP THE LOOK",
        ctaHref: "/shop",
      },

      why: {
        title: "WHY THE VITE",
        items: [
          {
            id: "w1",
            icon: "diamond",
            title: "CURATED STYLE",
            text: "Fashion pieces selected with an eye for current trends and timeless essentials.",
          },
          {
            id: "w2",
            icon: "check",
            title: "QUALITY-FIRST",
            text: "Pieces chosen for fit, feel and everyday wear.",
          },
          {
            id: "w3",
            icon: "refresh",
            title: "EVERYDAY VERSATILITY",
            text: "From casual days to elevated looks.",
          },
          {
            id: "w4",
            icon: "pin",
            title: "JAIPUR ROOTED",
            text: "A fashion destination built in Jaipur.",
          },
        ],
      },

      styleInspiration: {
        title: "STYLE IT YOUR WAY",
        subtitle: "See what's trending at The Vite.",
        tiles: [
          { id: "st1", label: "CASUAL", href: "/collections/sweatshirts", image: "/images/looks/style-casual.jpg" },
          { id: "st2", label: "SMART CASUAL", href: "/collections/shirts", image: "/images/looks/style-smart-casual.jpg" },
          { id: "st3", label: "STREET", href: "/collections/sweatshirts", image: "/images/looks/style-street.jpg" },
          { id: "st4", label: "EVERYDAY DENIM", href: "/collections/denim", image: "/images/looks/style-denim.jpg" },
        ],
        ctaLabel: "EXPLORE STYLES",
        ctaHref: "/collections",
      },

      instagram: {
        title: "FOLLOW THE VITE",
        subtitle: "See the latest drops, fits and inspiration on Instagram.",
        handle: "@theviteofficial",
        profileUrl: IG,
        tiles: [
          { id: "ig1", image: "/images/looks/insta-1.jpg", href: IG },
          { id: "ig2", image: "/images/looks/insta-2.jpg", href: IG },
          { id: "ig3", image: "/images/looks/insta-3.jpg", href: IG },
          { id: "ig4", image: "/images/looks/insta-4.jpg", href: IG },
          { id: "ig5", image: "/images/looks/insta-5.jpg", href: IG },
          { id: "ig6", image: "/images/looks/insta-6.jpg", href: IG },
        ],
        ctaLabel: "FOLLOW US ON INSTAGRAM",
      },

      brandStory: {
        titleLine1: "MORE THAN CLOTHES.",
        titleLine2: "IT'S YOUR VITE.",
        body: "The Vite brings together contemporary fashion, everyday essentials and standout pieces for people who like to define their own style.\nBased in Jaipur, we're building a fashion destination where finding your next favourite fit feels effortless.",
        ctaLabel: "OUR STORY",
        ctaHref: "/about",
        image: "/images/storefront.jpg",
      },

      newsletter: {
        title: "STAY IN THE VITE",
        text: "Be the first to know about new arrivals, fresh drops and exclusive offers.",
        buttonLabel: "JOIN",
      },

      footer: {
        about:
          "Contemporary fashion, everyday essentials and standout pieces — curated in Jaipur.",
        columns: [
          {
            id: "c1",
            title: "SHOP",
            links: [
              { label: "New Arrivals", href: "/shop?sort=new" },
              { label: "Men", href: "/men" },
              { label: "Women", href: "/women" },
              { label: "Denim", href: "/collections/denim" },
              { label: "Shirts", href: "/collections/shirts" },
              { label: "T-Shirts", href: "/collections/t-shirts" },
              { label: "Jeans", href: "/collections/jeans" },
              { label: "Collections", href: "/collections" },
            ],
          },
          {
            id: "c2",
            title: "HELP",
            links: [
              { label: "Contact Us", href: "/about" },
              { label: "Shipping", href: "/about" },
              { label: "Returns", href: "/about" },
              { label: "Size Guide", href: "/about" },
              { label: "FAQs", href: "/about" },
            ],
          },
          {
            id: "c3",
            title: "THE VITE",
            links: [
              { label: "About Us", href: "/about" },
              { label: "Our Story", href: "/about" },
              { label: "Instagram", href: IG },
              { label: "Store", href: "/about" },
            ],
          },
          {
            id: "c4",
            title: "CONNECT",
            links: [
              { label: "@theviteofficial", href: IG },
            ],
          },
        ],
        copyright: "© 2026 The Vite. All rights reserved.",
      },

      freeShippingThreshold: 1999,
    },
  };
}
