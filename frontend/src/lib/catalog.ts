/* Offline fixture. The running site reads the Laravel API, not this file. */

export const WHATSAPP_NUMBER = "254700000000";
export const PHONE = "+254 700 000 000";
export const EMAIL = "info@jaburahome.com";

export type Category = {
  slug: string;
  name: string;
  headline: string;
  blurb: string;
  image: string;
  subcategories: string[];
  resultCount: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  compareAt?: number;
  tag?: "Restocked" | "New Arrival" | "Last Piece";
  image: string;
  gallery: string[];
  description: string;
  details: string[];
};

const categoryMeta = [
  {
    slug: "living-room",
    name: "Living Room",
    headline: "Living room",
    blurb: "Recliners, sofas and coffee tables you can sit on in the Juja showroom before you buy.",
    image: "/categories/living-room.jpg",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    headline: "Bedroom",
    blurb: "Dressing pieces for the room you get ready in — starting with our valet stand.",
    image: "/categories/bedroom.jpg",
  },
  {
    slug: "dining",
    name: "Dining",
    headline: "Dining",
    blurb: "Simple tables for everyday meals. More dining pieces are on the floor — ask in the showroom.",
    image: "/categories/dining.jpg",
  },
  {
    slug: "office",
    name: "Office",
    headline: "Office",
    blurb: "Reception counters, meeting tables, workstations and chairs for offices around Nairobi.",
    image: "/categories/office.jpg",
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    headline: "Kitchen",
    blurb: "Kitchen pieces will land here. Visit the Juja showroom or WhatsApp us in the meantime.",
    image: "/categories/dining.jpg",
  },
  {
    slug: "home-decor",
    name: "Home Decor",
    headline: "Home decor",
    blurb: "Decor pieces will land here. Visit the Juja showroom or WhatsApp us in the meantime.",
    image: "/categories/living-room.jpg",
  },
  {
    slug: "bespoke-studio",
    name: "Bespoke Studio",
    headline: "Made to order",
    blurb: "Need a size, colour or layout we do not stock? We can build it in Juja.",
    image: "/categories/bespoke.jpg",
  },
] as const;

export const products: Product[] = [
  {
    id: "modern-sofa-01",
    name: "Forest Green Leather Recliner",
    category: "living-room",
    subcategory: "Recliners",
    price: 289000,
    tag: "Restocked",
    image: "/products/living-room/modern-sofa-01/main-image.jpg",
    gallery: [
      "/products/living-room/modern-sofa-01/main-image.jpg",
      "/products/living-room/modern-sofa-01/angle-1.jpg",
      "/products/living-room/modern-sofa-01/angle-2.jpg",
      "/products/living-room/modern-sofa-01/angle-3.jpg",
      "/products/living-room/modern-sofa-01/angle-4.jpg",
      "/products/living-room/modern-sofa-01/angle-5.jpg",
    ],
    description:
      "A single-seat recliner in deep forest-green leatherette, with a high pillow-top back, thick padded arms and a manual lever on the side. Other colours are usually on the floor beside it.",
    details: [
      "Single-seat recliner",
      "Textured leatherette upholstery",
      "Forest green with cream contrast stitching",
      "Manual recline lever",
      "Pillow-top arms and zoned back cushions",
    ],
  },
  {
    id: "modern-sofa-02",
    name: "Cognac Tufted Sofa Set",
    category: "living-room",
    subcategory: "Sofas",
    price: 245000,
    tag: "New Arrival",
    image: "/products/living-room/modern-sofa-02/main-image.jpg",
    gallery: [
      "/products/living-room/modern-sofa-02/main-image.jpg",
      "/products/living-room/modern-sofa-02/angle-1.jpg",
      "/products/living-room/modern-sofa-02/angle-2.jpg",
    ],
    description:
      "A three-seater and two matching armchairs in cognac leatherette, square-grid tufted on the seat and back, with short chrome block feet. Shown with a curved glass coffee table on a white base.",
    details: [
      "3-seater plus two armchairs",
      "Cognac leatherette, grid tufting",
      "Track arms, chrome block feet",
      "Glass coffee table sold separately in the showroom",
    ],
  },
  {
    id: "modern-sofa-03",
    name: "Light Grey Recliner Sofa with Console",
    category: "living-room",
    subcategory: "Recliners",
    price: 178000,
    image: "/products/living-room/modern-sofa-03/main-image.jpg",
    gallery: ["/products/living-room/modern-sofa-03/main-image.jpg"],
    description:
      "A two-seat recliner in light grey microfibre with a centre console, cup holders and a padded lift lid. Manual pull handles sit on the outer sides.",
    details: [
      "Two-seat recliner with centre console",
      "Light grey microfibre / faux-suede",
      "Cup holders and storage in the console",
      "Manual recline handles",
    ],
  },
  {
    id: "modern-sofa-04",
    name: "Black Tufted Three-Seater",
    category: "living-room",
    subcategory: "Sofas",
    price: 315000,
    image: "/products/living-room/modern-sofa-04/main-image.jpg",
    gallery: [
      "/products/living-room/modern-sofa-04/main-image.jpg",
      "/products/living-room/modern-sofa-04/angle-1.jpg",
      "/products/living-room/modern-sofa-04/angle-2.jpg",
    ],
    description:
      "A low, boxy three-seater in matte black leatherette. One long bench seat, grid tufting on the back and seat, wide track arms and short chrome legs.",
    details: [
      "Three-seater, bench cushion",
      "Matte black leatherette",
      "Square-grid tufting",
      "Chrome metal legs",
    ],
  },
  {
    id: "modern-sofa-05",
    name: "Four-Drawer Steel Filing Cabinet",
    category: "office",
    subcategory: "Storage Cabinets",
    price: 198000,
    image: "/products/living-room/modern-sofa-05/main-image.jpg",
    gallery: ["/products/living-room/modern-sofa-05/main-image.jpg"],
    description:
      "A full-height four-drawer metal filing cabinet in light grey, with silver pull handles and a keyed lock. Useful in an office, clinic or school store.",
    details: [
      "Steel four-drawer cabinet",
      "Light grey finish",
      "Horizontal silver handles",
      "Keyed lock",
    ],
  },
  {
    id: "modern-sofa-06",
    name: "Beige Recliner Living Set",
    category: "living-room",
    subcategory: "Sofas",
    price: 168000,
    tag: "New Arrival",
    image: "/products/living-room/modern-sofa-06/main-image.jpg",
    gallery: ["/products/living-room/modern-sofa-06/main-image.jpg"],
    description:
      "A matching recliner three-seater, two-seater with cup-holder console, and armchair in beige microfibre with white contrast stitching. Round marble-look nesting tables with gold frames sit in front.",
    details: [
      "3-seater, 2-seater with console, armchair",
      "Beige textured microfibre",
      "Manual recline levers",
      "Shown with marble-look nesting tables",
    ],
  },
  {
    id: "modern-sofa-07",
    name: "Chocolate Z-Frame Lounge Set",
    category: "living-room",
    subcategory: "Sofas",
    price: 156000,
    image: "/products/living-room/modern-sofa-07/main-image.jpg",
    gallery: ["/products/living-room/modern-sofa-07/main-image.jpg"],
    description:
      "A compact two-seater and two armchairs in chocolate-brown leatherette, set in a light wood Z-shaped side frame. Low lounge height — good for a small sitting room or waiting area.",
    details: [
      "Loveseat plus two chairs",
      "Chocolate-brown leatherette",
      "Light wood Z-frame arms and legs",
      "Low lounge profile",
    ],
  },
  {
    id: "l-sofa-01",
    name: "Charcoal Tufted Two-Seater",
    category: "living-room",
    subcategory: "Sofas",
    price: 345000,
    tag: "Restocked",
    image: "/products/living-room/l-sofa-01/main-image.jpg",
    gallery: ["/products/living-room/l-sofa-01/main-image.jpg"],
    description:
      "A two-seater in charcoal leatherette with button tufting on the back, straight track arms and low chrome legs. Neat enough for a flat, firm enough for everyday sitting.",
    details: [
      "Two-seater loveseat",
      "Charcoal leatherette",
      "Button-tufted back",
      "Chrome metal legs",
    ],
  },
  {
    id: "l-sofa-02",
    name: "Black Lounge Set with Wood Arm Caps",
    category: "living-room",
    subcategory: "Sofas",
    price: 298000,
    image: "/products/living-room/l-sofa-02/main-image.jpg",
    gallery: ["/products/living-room/l-sofa-02/main-image.jpg"],
    description:
      "A three-seater and two chairs in matte black leatherette, with a dark wood panel on top of each arm — somewhere to rest a cup. Comes with a matching two-tier coffee table.",
    details: [
      "3+1+1 seating",
      "Black leatherette, block stitching",
      "Dark wood arm caps",
      "Matching two-tier coffee table",
    ],
  },
  {
    id: "chesterfield-01",
    name: "Black Leather Reclining Sofa",
    category: "living-room",
    subcategory: "Recliners",
    price: 198000,
    image: "/products/living-room/chesterfield-01/main-image.jpg",
    gallery: ["/products/living-room/chesterfield-01/main-image.jpg"],
    description:
      "A glossy black leatherette reclining sofa with pillow-top arms, bustle-back cushions and a pull lever on the side. Contrast stitching runs along the seams. Grey and beige versions are often nearby in the showroom.",
    details: [
      "Reclining sofa",
      "Gloss black leatherette",
      "Manual pull lever",
      "Pillow-top arms, contrast stitching",
    ],
  },
  {
    id: "coffee-table-01",
    name: "Mahogany Two-Tier Coffee Table",
    category: "living-room",
    subcategory: "Coffee Tables",
    price: 112000,
    image: "/products/living-room/coffee-table-01/main-image.jpg",
    gallery: ["/products/living-room/coffee-table-01/main-image.jpg"],
    description:
      "A rectangular coffee table in polished reddish-brown hardwood, with a lower shelf for remotes and magazines and thick square legs. Simple, heavy, and easy to wipe.",
    details: [
      "Solid hardwood, mahogany stain",
      "High-gloss lacquer",
      "Full-length lower shelf",
      "Square block legs",
    ],
  },
  {
    id: "tv-stand-01",
    name: "Obsidian and Walnut Reception Counter",
    category: "office",
    subcategory: "Reception Desks",
    price: 89000,
    image: "/products/living-room/tv-stand-01/main-image.jpg",
    gallery: ["/products/living-room/tv-stand-01/main-image.jpg"],
    description:
      "An L-shaped reception desk with a high visitor counter and a lower staff desk. Matte black laminate on the body, walnut-grain worktops, and a recessed kick plate so it sits cleanly on tiled floors.",
    details: [
      "L-shaped two-height counter",
      "Matte black laminate and walnut grain",
      "Recessed black kick plate",
      "Built for reception and lobby use",
    ],
  },
  {
    id: "tv-stand-02",
    name: "White and Oak L-Shaped Office Desk",
    category: "office",
    subcategory: "Executive Desks",
    price: 95000,
    tag: "New Arrival",
    image: "/products/living-room/tv-stand-02/main-image.jpg",
    gallery: ["/products/living-room/tv-stand-02/main-image.jpg"],
    description:
      "A two-tone L-desk in matte white with a light-oak raised platform and a cable grommet on the side. Diamond-shaped panels decorate the left return. Suits a manager’s office or a compact studio.",
    details: [
      "L-shaped executive desk",
      "Matte white and light oak laminate",
      "Side cable grommet",
      "Raised wood-grain platform",
    ],
  },
  {
    id: "dining-set-01",
    name: "Round Walnut Meeting Table",
    category: "office",
    subcategory: "Meeting Tables",
    price: 312000,
    tag: "Last Piece",
    image: "/products/dining/dining-set-01/main-image.jpg",
    gallery: ["/products/dining/dining-set-01/main-image.jpg"],
    description:
      "A round dark-walnut meeting table on a cross-shaped wood pedestal with chrome glides. Shown with black cantilever visitor chairs — chairs can be ordered with the table.",
    details: [
      "Circular meeting table",
      "Dark walnut wood-grain top",
      "X-shaped wood pedestal, chrome glides",
      "Pairs with chrome cantilever chairs",
    ],
  },
  {
    id: "bar-stools-01",
    name: "White Round Dining Table",
    category: "dining",
    subcategory: "Dining Tables",
    price: 48000,
    image: "/products/dining/bar-stools-01/main-image.jpg",
    gallery: [
      "/products/dining/bar-stools-01/main-image.jpg",
      "/products/dining/bar-stools-01/angle-1.jpg",
      "/products/dining/bar-stools-01/angle-2.jpg",
    ],
    description:
      "A round white table on a powder-coated steel X-base. Compact enough for a kitchen or a four-person dining nook. Chairs are sold separately.",
    details: [
      "Round dining / accent table",
      "White lacquered top",
      "Powder-coated steel X-base",
      "Seats about three to four",
    ],
  },
  {
    id: "executive-desk-01",
    name: "Round Dark-Walnut Conference Table",
    category: "office",
    subcategory: "Meeting Tables",
    price: 268000,
    image: "/products/office/executive-desk-01/main-image.jpg",
    gallery: [
      "/products/office/executive-desk-01/main-image.jpg",
      "/products/office/executive-desk-01/angle-1.jpg",
      "/products/office/executive-desk-01/angle-2.jpg",
    ],
    description:
      "A circular conference table in dark walnut laminate, thick edge, on an X-pedestal with chrome levelling feet. Made for a small boardroom or a home office meeting corner.",
    details: [
      "Round conference table",
      "Dark walnut laminate, thick top",
      "Cross pedestal with chrome glides",
      "Typically seats four to six",
    ],
  },
  {
    id: "executive-desk-02",
    name: "Four-Person Workstation Cluster",
    category: "office",
    subcategory: "Workstations",
    price: 295000,
    tag: "Restocked",
    image: "/products/office/executive-desk-02/main-image.jpg",
    gallery: [
      "/products/office/executive-desk-02/main-image.jpg",
      "/products/office/executive-desk-02/angle-1.jpg",
      "/products/office/executive-desk-02/angle-2.jpg",
      "/products/office/executive-desk-02/angle-3.jpg",
    ],
    description:
      "A four-desk cluster with walnut-grain tops, charcoal privacy screens and a pedestal (drawer plus cupboard) for each person. Built for an open office that still needs a bit of separation.",
    details: [
      "Four workstations in a plus layout",
      "Walnut-grain laminate tops",
      "Charcoal privacy dividers",
      "Drawer and cupboard per user",
    ],
  },
  {
    id: "executive-desk-03",
    name: "Light-Grain Reception Desk with Oak Slats",
    category: "office",
    subcategory: "Reception Desks",
    price: 215000,
    image: "/products/office/executive-desk-03/main-image.jpg",
    gallery: [
      "/products/office/executive-desk-03/main-image.jpg",
      "/products/office/executive-desk-03/angle-1.jpg",
    ],
    description:
      "A reception counter in pale wood-grain laminate. The front has a diagonal cut that shows a panel of vertical oak slats — a bit of texture without looking busy.",
    details: [
      "Reception / front counter",
      "Pale wood-grain laminate",
      "Natural oak vertical slats",
      "L-shaped staff side",
    ],
  },
  {
    id: "executive-desk-04",
    name: "White and Blue Reception Desk",
    category: "office",
    subcategory: "Reception Desks",
    price: 145000,
    tag: "New Arrival",
    image: "/products/office/executive-desk-04/main-image.jpg",
    gallery: [
      "/products/office/executive-desk-04/main-image.jpg",
      "/products/office/executive-desk-04/angle-1.jpg",
    ],
    description:
      "A high-gloss white L-shaped reception desk with royal-blue capping and a ribbed blue front panel. Two heights: a standing counter for visitors and a lower desk for the receptionist.",
    details: [
      "L-shaped two-tier reception desk",
      "High-gloss white laminate",
      "Royal blue slatted front",
      "Standing counter plus seated workspace",
    ],
  },
  {
    id: "executive-desk-05",
    name: "Gloss Mahogany Coffee Table",
    category: "living-room",
    subcategory: "Coffee Tables",
    price: 178000,
    image: "/products/office/executive-desk-05/main-image.jpg",
    gallery: ["/products/office/executive-desk-05/main-image.jpg"],
    description:
      "A rectangular two-tier coffee table in glossy mahogany-stained wood, with a lower shelf and thick square legs. Same family as the living-room coffee table on the floor.",
    details: [
      "Hardwood, mahogany stain",
      "Gloss finish, visible grain",
      "Lower display shelf",
      "Block legs",
    ],
  },
  {
    id: "executive-desk-06",
    name: "Boardroom Conference Table",
    category: "office",
    subcategory: "Conference Tables",
    price: 195000,
    image: "/products/office/executive-desk-06/main-image.jpg",
    gallery: ["/products/office/executive-desk-06/main-image.jpg"],
    description:
      "A long rectangular conference table with a dark wood-grain top, metal edge trim and three charcoal pedestals. Sized for a full boardroom — about twelve to fourteen seats depending on the chairs.",
    details: [
      "Large rectangular conference table",
      "Dark wood veneer top, metal edge",
      "Three pedestal bases",
      "Centre connectivity recess",
    ],
  },
  {
    id: "ergonomic-chair-01",
    name: "Mahogany-Frame Leather Office Chair",
    category: "office",
    subcategory: "Office Chairs",
    price: 89000,
    tag: "Restocked",
    image: "/products/office/ergonomic-chair-01/main-image.jpg",
    gallery: [
      "/products/office/ergonomic-chair-01/main-image.jpg",
      "/products/office/ergonomic-chair-01/angle-1.jpg",
      "/products/office/ergonomic-chair-01/angle-2.jpg",
    ],
    description:
      "A high-back visitor or boardroom chair in black leatherette, with a polished mahogany wood frame, curved wood arms and four fixed legs. It does not swivel or roll.",
    details: [
      "High-back, four wooden legs",
      "Black leatherette seat and back",
      "Mahogany / cherry wood frame and arms",
      "Fixed base — not a swivel chair",
    ],
  },
  {
    id: "ergonomic-chair-02",
    name: "Black High-Back Conference Chair",
    category: "office",
    subcategory: "Office Chairs",
    price: 65000,
    image: "/products/office/ergonomic-chair-02/main-image.jpg",
    gallery: [
      "/products/office/ergonomic-chair-02/main-image.jpg",
      "/products/office/ergonomic-chair-02/angle-1.jpg",
      "/products/office/ergonomic-chair-02/angle-2.jpg",
      "/products/office/ergonomic-chair-02/angle-3.jpg",
    ],
    description:
      "A black high-back task chair with a padded headrest, T-armrests and a chrome five-star base on casters. Sold per chair; we usually keep a set around the conference tables.",
    details: [
      "High-back with headrest",
      "Black mesh / fabric seat",
      "Chrome five-star base, casters",
      "T-shaped armrests",
    ],
  },
  {
    id: "ergonomic-chair-03",
    name: "Black Tufted Club Chair",
    category: "living-room",
    subcategory: "Accent Chairs",
    price: 98000,
    image: "/products/office/ergonomic-chair-03/main-image.jpg",
    gallery: [
      "/products/office/ergonomic-chair-03/main-image.jpg",
      "/products/office/ergonomic-chair-03/angle-1.jpg",
      "/products/office/ergonomic-chair-03/angle-2.jpg",
    ],
    description:
      "A boxy black leatherette armchair with square-grid tufting on the seat and back, wide track arms and short chrome legs. Works in a sitting room or as a guest chair in an office.",
    details: [
      "Single club / accent chair",
      "Black leatherette, grid tufting",
      "Track arms",
      "Polished chrome legs",
    ],
  },
  {
    id: "ergonomic-chair-04",
    name: "Black Sofa Set with Honey-Oak Arms",
    category: "living-room",
    subcategory: "Sofas",
    price: 52000,
    tag: "New Arrival",
    image: "/products/office/ergonomic-chair-04/main-image.jpg",
    gallery: [
      "/products/office/ergonomic-chair-04/main-image.jpg",
      "/products/office/ergonomic-chair-04/angle-1.jpg",
      "/products/office/ergonomic-chair-04/angle-2.jpg",
    ],
    description:
      "A 3+2+1 set in black leatherette with light honey-oak panels on the armrests, plus a matching two-tier coffee table in the same wood. A practical lounge set for home or a reception.",
    details: [
      "3-seater, 2-seater and armchair",
      "Black leatherette",
      "Honey-oak arm caps and table",
      "Matching coffee table included in the set",
    ],
  },
  {
    id: "ergonomic-chair-05",
    name: "Red and Black Racing Chair",
    category: "office",
    subcategory: "Office Chairs",
    price: 78000,
    image: "/products/office/ergonomic-chair-05/main-image.jpg",
    gallery: [
      "/products/office/ergonomic-chair-05/main-image.jpg",
      "/products/office/ergonomic-chair-05/angle-1.jpg",
      "/products/office/ergonomic-chair-05/angle-2.jpg",
      "/products/office/ergonomic-chair-05/angle-3.jpg",
    ],
    description:
      "A racing-style high-back chair in black and red PU leather, diamond-quilted on the seat and back, with a headrest pillow, lumbar pillow and a pull-out footrest.",
    details: [
      "Racing / gaming high-back",
      "Black and red PU leather, diamond quilting",
      "Headrest and lumbar pillows",
      "Retractable footrest, caster base",
    ],
  },
  {
    id: "ergonomic-chair-06",
    name: "Round Meeting Set with Cantilever Chairs",
    category: "office",
    subcategory: "Meeting Tables",
    price: 72000,
    image: "/products/office/ergonomic-chair-06/main-image.jpg",
    gallery: ["/products/office/ergonomic-chair-06/main-image.jpg"],
    description:
      "A charcoal round table on a four-leg pedestal, with four black cantilever chairs — chrome frames, padded arms and a diamond-quilted leatherette panel on the upper back.",
    details: [
      "Round table plus four chairs",
      "Charcoal tabletop, metal pedestal",
      "Chrome cantilever frames",
      "Black fabric seat, quilted leatherette back",
    ],
  },
  {
    id: "bookshelf-01",
    name: "White Reception Desk with Obsidian Shelf",
    category: "office",
    subcategory: "Reception Desks",
    price: 135000,
    image: "/products/office/bookshelf-01/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-01/main-image.jpg",
      "/products/office/bookshelf-01/angle-1.jpg",
      "/products/office/bookshelf-01/angle-2.jpg",
      "/products/office/bookshelf-01/angle-3.jpg",
    ],
    description:
      "A two-height reception unit in off-white laminate. The visitor shelf is charcoal, held on silver standoffs, and the whole piece sits on a recessed black plinth.",
    details: [
      "Two-tier reception desk",
      "Off-white laminate body",
      "Charcoal transaction shelf",
      "Metal standoffs, black plinth",
    ],
  },
  {
    id: "bookshelf-02",
    name: "Light Oak Lockable Sideboard",
    category: "office",
    subcategory: "Storage Cabinets",
    price: 185000,
    image: "/products/office/bookshelf-02/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-02/main-image.jpg",
      "/products/office/bookshelf-02/angle-1.jpg",
      "/products/office/bookshelf-02/angle-2.jpg",
    ],
    description:
      "A two-door low cabinet in light oak grain, silver bar handles, a centre lock and a dark kick plate. Fine as office storage or a living-room sideboard.",
    details: [
      "Two-door low cabinet",
      "Light oak laminate",
      "Silver bar handles, keyed lock",
      "Recessed dark plinth",
    ],
  },
  {
    id: "bookshelf-03",
    name: "Pale Reception Counter with Oak Slats",
    category: "office",
    subcategory: "Reception Desks",
    price: 78000,
    image: "/products/office/bookshelf-03/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-03/main-image.jpg",
      "/products/office/bookshelf-03/angle-1.jpg",
    ],
    description:
      "A pale-grey wood-grain reception desk. The front is split: a solid panel on one side and vertical oak slats on the other, cut on a diagonal.",
    details: [
      "Reception counter",
      "Pale grey wood-grain laminate",
      "Warm oak vertical slats",
      "Asymmetric front",
    ],
  },
  {
    id: "bookshelf-04",
    name: "Charcoal and Walnut Reception Desk",
    category: "office",
    subcategory: "Reception Desks",
    price: 92000,
    image: "/products/office/bookshelf-04/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-04/main-image.jpg",
      "/products/office/bookshelf-04/angle-1.jpg",
      "/products/office/bookshelf-04/angle-2.jpg",
    ],
    description:
      "An L-shaped reception desk with a charcoal front, walnut-grain counter and a lower staff worktop. A black kick plate keeps the base off the floor.",
    details: [
      "L-shaped two-tier desk",
      "Charcoal laminate front",
      "Walnut-grain countertop",
      "Black recessed kick plate",
    ],
  },
  {
    id: "bookshelf-05",
    name: "Two-Tone Lockable Storage Cabinets",
    category: "office",
    subcategory: "Storage Cabinets",
    price: 68000,
    image: "/products/office/bookshelf-05/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-05/main-image.jpg",
      "/products/office/bookshelf-05/angle-1.jpg",
      "/products/office/bookshelf-05/angle-2.jpg",
    ],
    description:
      "A pair of waist-high two-door cabinets with vertical black handles and locks. One is white doors on a light-oak body; the other is black doors on a white body. Sold as a pair or asked for singly in the showroom.",
    details: [
      "Two-door low cabinets",
      "Melamine / MDF laminate",
      "Vertical black handles, keyed locks",
      "White/oak and black/white colourways",
    ],
  },
  {
    id: "bookshelf-06",
    name: "Grey and Oak L-Shaped Executive Desk",
    category: "office",
    subcategory: "Executive Desks",
    price: 165000,
    tag: "Last Piece",
    image: "/products/office/bookshelf-06/main-image.jpg",
    gallery: [
      "/products/office/bookshelf-06/main-image.jpg",
      "/products/office/bookshelf-06/angle-1.jpg",
      "/products/office/bookshelf-06/angle-2.jpg",
      "/products/office/bookshelf-06/angle-3.jpg",
    ],
    description:
      "An L-shaped desk in light grey with a light-oak raised platform, a built-in power module, a side cable grommet and diamond-shaped accents on the front return.",
    details: [
      "L-shaped executive desk",
      "Light grey and oak laminate",
      "Built-in power / data module",
      "Cable grommet on the side",
    ],
  },
  {
    id: "bookshelf-07",
    name: "Walnut Reception Counter with White Panel",
    category: "office",
    subcategory: "Reception Desks",
    price: 42000,
    image: "/products/office/bookshelf-07/main-image.jpg",
    gallery: ["/products/office/bookshelf-07/main-image.jpg"],
    description:
      "A standing-height reception counter in horizontal walnut grain, with a matte white front panel and a slightly lower inner desk for the person working behind it.",
    details: [
      "Two-tone reception counter",
      "Walnut-grain laminate",
      "Matte white accent panel",
      "Inner staff worktop",
    ],
  },
  {
    id: "sun-lounger-01",
    name: "Jewel-Tone Velvet Tub Chairs",
    category: "living-room",
    subcategory: "Accent Chairs",
    price: 156000,
    image: "/products/outdoor/sun-lounger-01/main-image.jpg",
    gallery: ["/products/outdoor/sun-lounger-01/main-image.jpg"],
    description:
      "Barrel chairs in plush velvet with a wrap-around back and slim brushed-gold legs. Shown in ruby, olive, terracotta and mustard — pick a colour or mix a set.",
    details: [
      "Tub / barrel accent chair",
      "Velvet upholstery, circular seat cushion",
      "Brushed-gold tapered metal legs",
      "Several jewel colours on the floor",
    ],
  },
  {
    id: "wall-mirror-01",
    name: "Mahogany Suit Valet",
    category: "bedroom",
    subcategory: "Dressing",
    price: 64500,
    tag: "New Arrival",
    image: "/products/home-decor/wall-mirror-01/main-image.jpg",
    gallery: ["/products/home-decor/wall-mirror-01/main-image.jpg"],
    description:
      "A standing valet for a jacket and trousers: a curved mahogany hanger, a chrome trouser bar and a round weighted wood base. For a bedroom or a dressing corner — not a wall mirror.",
    details: [
      "Freestanding suit valet",
      "Mahogany-stained hardwood",
      "Polished chrome hanger support and trouser rail",
      "Circular wooden base",
    ],
  },
  {
    id: "bespoke-commission",
    name: "Made-to-Order Conversation",
    category: "bespoke-studio",
    subcategory: "Custom Orders",
    price: 15000,
    image: "/categories/bespoke.jpg",
    gallery: ["/categories/bespoke.jpg"],
    description:
      "Bring a photo, a measurement or a sketch. We will sit with you in Juja, agree timber, fabric and size, and give you a written quote. The visit fee comes off the order if you go ahead.",
    details: [
      "Showroom or workshop visit",
      "Drawings and a fixed quote",
      "Fee credited against your order",
      "Hotels, offices and homes",
    ],
  },
];

const HIDDEN_FROM_SHOP = new Set(["bespoke-commission"]);

export const shopProducts = products.filter((p) => !HIDDEN_FROM_SHOP.has(p.id));

export type ProductType = {
  slug: string;
  name: string;
  category: string;
  count: number;
  image: string;
};

const typeSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const productTypes: ProductType[] = [...new Set(shopProducts.map((p) => p.subcategory))]
  .sort((a, b) => a.localeCompare(b))
  .map((name) => {
    const items = shopProducts.filter((p) => p.subcategory === name);
    const first = items[0]!;
    return {
      slug: typeSlug(name),
      name,
      category: first.category,
      count: items.length,
      image: first.image,
    };
  });

export const getProductType = (slug: string) => productTypes.find((t) => t.slug === slug);
export const productsByType = (slug: string) => {
  const type = getProductType(slug);
  if (!type) return [];
  return shopProducts.filter((p) => p.subcategory === type.name);
};

export const categories: Category[] = categoryMeta.map((c) => {
  const items = shopProducts.filter((p) => p.category === c.slug);
  return {
    ...c,
    subcategories: [...new Set(items.map((p) => p.subcategory))],
    resultCount: items.length,
  };
});

export const heroSlides = [
  {
    image: "/products/living-room/modern-sofa-04/main-image.jpg",
    eyebrow: "Juja showroom",
    title: "Come sit on it first",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    slug: "living-room",
    cta: "See living room",
  },
  {
    image: "/hero/hero-2.jpg",
    eyebrow: "Office furniture",
    title: "Desks that go to work",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    slug: "office",
    cta: "See office",
  },
  {
    image: "/hero/hero-3.jpg",
    eyebrow: "Made in Juja",
    title: "If we do not stock it, we can build it",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    slug: "bespoke-studio",
    cta: "Talk to us",
  },
];

export const quickCircles = [
  { label: "Sofas", image: "/products/living-room/l-sofa-01/main-image.jpg", slug: "living-room", sub: "Sofas" },
  { label: "Recliners", image: "/products/living-room/modern-sofa-01/main-image.jpg", slug: "living-room", sub: "Recliners" },
  { label: "Desks", image: "/products/living-room/tv-stand-02/main-image.jpg", slug: "office", sub: "Executive Desks" },
  { label: "Reception", image: "/products/living-room/tv-stand-01/main-image.jpg", slug: "office", sub: "Reception Desks" },
  { label: "Chairs", image: "/products/office/ergonomic-chair-01/main-image.jpg", slug: "office", sub: "Office Chairs" },
  { label: "Accent Chairs", image: "/products/outdoor/sun-lounger-01/main-image.jpg", slug: "living-room", sub: "Accent Chairs" },
] as const;

export const formatKsh = (v: number) => `KSh ${v.toLocaleString("en-KE")}`;

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsByCategory = (slug: string) => shopProducts.filter((p) => p.category === slug);

export const searchProducts = (q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return shopProducts
    .filter((p) =>
      [p.name, p.subcategory, p.category.replace("-", " "), p.description].join(" ").toLowerCase().includes(term),
    )
    .slice(0, 6);
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
