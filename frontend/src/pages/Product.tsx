import { Plus, Sparkles, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductItem = {
  _id: string;
  name: string;
  description: string;
  category: string;
  seo_tags: string[];
  sustainability_attributes: string[];
};

const products: ProductItem[] = [
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

const MAX_VISIBLE_TAGS = 3;

const Product = () => {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-emerald-50/80 via-cyan-50/50 to-slate-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <section className="rounded-2xl border border-emerald-200/60 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                <Sparkles className="size-3.5" />
                PRODUCT GENERATION
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Product Catalog
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Review AI-ready product entries with category, description, and SEO tags.
              </p>
            </div>

            <Button
              type="button"
              className="bg-emerald-700 text-emerald-50 hover:bg-emerald-800"
            >
              <Plus className="size-4" />
              Add Product
            </Button>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const visibleTags = product.seo_tags.slice(0, MAX_VISIBLE_TAGS);
            const remainingCount = Math.max(
              product.seo_tags.length - MAX_VISIBLE_TAGS,
              0,
            );

            return (
              <Card
                key={product._id}
                className="border border-emerald-200/50 bg-white/90 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-900/30 dark:bg-slate-900/70"
              >
                <CardHeader>
                  <CardDescription className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                    {product.category}
                  </CardDescription>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {product.description}
                  </p>

                  <div>
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80">
                      <Tag className="size-3.5" />
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {visibleTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-200/80 bg-emerald-100/70 px-2.5 py-1 text-xs text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-900/40 dark:text-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {remainingCount > 0 ? (
                        <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                          +{remainingCount} more
                        </span>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Product;
