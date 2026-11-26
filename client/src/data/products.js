import dummyPhoto from "../assets/dummyphoto.jpeg";

const maroonFilter = "hue-rotate(-14deg) saturate(0.85) brightness(0.7)";
const kumkumFilter = "hue-rotate(18deg) saturate(1.3) brightness(0.95)";

const RED = { src: dummyPhoto, filter: "none", hex: "#C8102E" };
const MAROON = { src: dummyPhoto, filter: maroonFilter, hex: "#6E2331" };
const photos = [dummyPhoto, dummyPhoto, dummyPhoto, dummyPhoto];

const sindoorHighlights = [
  "100% Herbal & Safe: zero lead, mercury or harmful chemicals",
  "Smart 5-layer packaging: gold lid, airtight seal and sifter",
  "Rich & smooth texture: deep colour that lasts all day",
  "Compact & travel-friendly: sturdy 3.5 cm x 3.5 cm jar",
];

export const products = [
  {
    id: "premium-sindoor",
    name: "Premium Sindoor",
    category: "Sindoor",
    tag: "Best seller",
    badge: "#1 Best Seller",
    rating: 4.8,
    reviews: 128,
    sizes: [
      { label: "10 g", price: 299, mrp: 499 },
      { label: "5 g", price: 179, mrp: 299 },
    ],
    shades: [
      {
        id: "red",
        name: "Red",
        note: "Traditional Red",
        hex: "#C8102E",
        subtitle:
          "Traditional vibrant red · Chemical-free · Mess-free sifter jar",
        images: photos,
        filter: "none",
      },
      {
        id: "maroon",
        name: "Maroon",
        note: "Deep Maroon",
        hex: "#6E2331",
        subtitle: "Deep rich maroon · Chemical-free · Mess-free sifter jar",
        images: photos,
        filter: maroonFilter,
      },
    ],
    offer: { text: "Buy any 2 and save an extra 10%", code: "YOROMA10" },
    highlights: sindoorHighlights,
    stock: "In Stock",
    deliveryNote: "Fast delivery in 2-4 days",
    swatches: ["#C8102E", "#6E2331"],
    cardNote: "Red · Maroon · 10 g / 5 g",
  },
  {
    id: "pack2-red",
    name: "Buy 2 Pack · Red",
    category: "Combo",
    tag: "Best value",
    badge: "Best Value",
    rating: 4.8,
    reviews: 64,
    price: 539,
    mrp: 998,
    subtitle: "2 boxes · Red · 10 g each",
    images: photos,
    filter: "none",
    pack: [RED, RED],
    includes: [
      { name: "Red Sindoor", note: "Traditional Red · 10 g", hex: RED.hex },
      { name: "Red Sindoor", note: "Traditional Red · 10 g", hex: RED.hex },
    ],
    highlights: sindoorHighlights,
    stock: "In Stock",
    deliveryNote: "Fast delivery in 2-4 days",
    swatches: [RED.hex, RED.hex],
    cardNote: "2 boxes · Red · 10 g each",
  },
  {
    id: "pack2-maroon",
    name: "Buy 2 Pack · Maroon",
    category: "Combo",
    tag: "Best value",
    badge: "Best Value",
    rating: 4.8,
    reviews: 41,
    price: 539,
    mrp: 998,
    subtitle: "2 boxes · Maroon · 10 g each",
    images: photos,
    filter: maroonFilter,
    pack: [MAROON, MAROON],
    includes: [
      { name: "Maroon Sindoor", note: "Deep Maroon · 10 g", hex: MAROON.hex },
      { name: "Maroon Sindoor", note: "Deep Maroon · 10 g", hex: MAROON.hex },
    ],
    highlights: sindoorHighlights,
    stock: "In Stock",
    deliveryNote: "Fast delivery in 2-4 days",
    swatches: [MAROON.hex, MAROON.hex],
    cardNote: "2 boxes · Maroon · 10 g each",
  },
  {
    id: "duo-red-maroon",
    name: "Red + Maroon Duo",
    category: "Combo",
    tag: "Festive pick",
    badge: "Festive Pick",
    rating: 4.9,
    reviews: 37,
    price: 539,
    mrp: 998,
    subtitle: "1 Red + 1 Maroon · 10 g each",
    images: photos,
    filter: "none",
    pack: [RED, MAROON],
    includes: [
      { name: "Red Sindoor", note: "Traditional Red · 10 g", hex: RED.hex },
      { name: "Maroon Sindoor", note: "Deep Maroon · 10 g", hex: MAROON.hex },
    ],
    highlights: sindoorHighlights,
    stock: "In Stock",
    deliveryNote: "Fast delivery in 2-4 days",
    swatches: [RED.hex, MAROON.hex],
    cardNote: "1 Red + 1 Maroon · 10 g each",
  },
  {
    id: "herbal-kumkum",
    name: "Herbal Kumkum",
    category: "Kumkum",
    tag: "New",
    badge: "New Arrival",
    rating: 4.7,
    reviews: 22,
    price: 149,
    mrp: 249,
    subtitle: "Pooja-grade kumkum · Skin-friendly · Mess-free jar",
    images: photos,
    filter: kumkumFilter,
    highlights: [
      "Made with herbal ingredients, gentle on skin",
      "Fine texture, easy to apply for tilak and pooja",
      "Airtight jar keeps it fresh",
      "Compact and travel-friendly",
    ],
    stock: "In Stock",
    deliveryNote: "Fast delivery in 2-4 days",
    swatches: ["#B3261E"],
    cardNote: "1 jar · 10 g",
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const cardImages = (p) => {
  if (p.pack) return p.pack;
  const source = p.shades ? p.shades[0] : p;
  const src = source.images && source.images[0];
  return src ? [{ src, filter: source.filter || "none" }] : [];
};

export const cardPrice = (p) =>
  p.sizes ? { price: p.sizes[0].price, mrp: p.sizes[0].mrp } : p;