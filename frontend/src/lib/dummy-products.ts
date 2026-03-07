export type ProductItem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  seo_tags: string[];
  sustainability_attributes: string[];
};

export const dummyProducts: ProductItem[] = [
  {
    _id: "p_001",
    name: "Bamboo Toothbrush",
    description:
      "Biodegradable bamboo toothbrush with soft BPA-free bristles for everyday use.",
    category: "Personal Care",
    seo_tags: [
      "bamboo toothbrush",
      "eco toothbrush",
      "biodegradable oral care",
      "plastic free bathroom",
      "sustainable hygiene",
    ],
    sustainability_attributes: ["biodegradable", "plastic-free"],
  },
  {
    _id: "p_002",
    name: "Compostable Coffee Cup",
    description:
      "Plant-based takeaway cup suitable for cafes and events focused on low-waste service.",
    category: "Food Service",
    seo_tags: [
      "compostable cup",
      "eco takeaway cup",
      "cafe packaging",
      "zero waste cup",
    ],
    sustainability_attributes: ["compostable", "food-safe"],
  },
  {
    _id: "p_003",
    name: "Bagasse Meal Container",
    description:
      "Durable sugarcane fiber meal boxes for restaurants replacing single-use plastic boxes.",
    category: "Packaging",
    seo_tags: [
      "bagasse container",
      "compostable meal box",
      "eco food packaging",
      "sugarcane container",
      "sustainable takeaway",
      "plastic alternative",
    ],
    sustainability_attributes: ["compostable", "plastic-alternative"],
  },
];
