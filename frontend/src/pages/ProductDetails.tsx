import { ArrowLeft, BadgeCheck, Leaf, LoaderCircle, Tag } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductItem } from "@/lib/dummy-products";
import { getProduct } from "@/lib/product-api";
import { Link, useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product id.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await getProduct(id);
        setProduct(response);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load product.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-emerald-50/80 via-cyan-50/50 to-slate-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-3xl place-items-center rounded-2xl border border-emerald-200/50 bg-white/80 py-12 dark:border-emerald-900/30 dark:bg-slate-900/60">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" />
            Loading product details...
          </p>
        </div>
      </main>
    );
  }

  if (!product || error) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-emerald-50/80 via-cyan-50/50 to-slate-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card className="border border-rose-200/70 bg-white/90 dark:border-rose-900/40 dark:bg-slate-900/70">
            <CardHeader>
              <CardDescription className="text-rose-600 dark:text-rose-300">
                PRODUCT NOT FOUND
              </CardDescription>
              <CardTitle>{error ?? `Invalid product id: ${id}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <ArrowLeft className="size-4" />
                Back to Products
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-linear-to-b from-emerald-50/80 via-cyan-50/50 to-slate-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <section className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Back to Products
          </Link>
        </section>

        <Card className="border border-emerald-200/50 bg-white/90 dark:border-emerald-900/30 dark:bg-slate-900/70">
          <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              {product.category}
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">
              {product.name}
            </CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag className="size-4" />
                SEO Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {product.seo_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-emerald-200/80 bg-emerald-100/70 px-2.5 py-1 text-xs text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-900/40 dark:text-emerald-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <Leaf className="size-4" />
                Sustainability Attributes
              </p>
              <div className="space-y-2 space-x-2">
                {product.sustainability_attributes.map((attribute) => (
                  <p
                    key={attribute}
                    className="inline-flex items-center gap-2 rounded-md border border-emerald-200/60 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-100"
                  >
                    <BadgeCheck className="size-4" />
                    {attribute}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ProductDetails;
