import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Sparkles,
  Tag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import AddProductDialog from "@/components/products/AddProductDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductItem } from "@/lib/dummy-products";
import { createProduct, listProducts, removeProduct } from "@/lib/product-api";
import { Link } from "react-router";

const MAX_VISIBLE_TAGS = 3;
const PAGE_SIZE = 6;

const Product = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async (page: number) => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const response = await listProducts(page, PAGE_SIZE);
      setProducts(response.data);
      setCurrentPage(response.page);
      setTotalPages(Math.max(response.totalPages, 1));
      setTotalProducts(response.total);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch products.";
      setLoadError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts(currentPage);
  }, [currentPage]);

  const handleCreateProduct = async (payload: {
    name: string;
    description: string;
  }) => {
    try {
      setIsCreating(true);
      setCreateError(null);
      setCreateSuccess(null);

      await createProduct(payload);
      setCreateSuccess("Product created successfully.");

      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        await fetchProducts(1);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create product.";
      setCreateError(message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setDeletingId(id);
      await removeProduct(id);
      setCreateSuccess("Product deleted successfully.");
      setCreateError(null);

      if (products.length === 1 && currentPage > 1) {
        setCurrentPage((previous) => previous - 1);
      } else {
        await fetchProducts(currentPage);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete product.";
      setCreateError(message);
    } finally {
      setDeletingId(null);
    }
  };

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
                Review AI-ready product entries with category, description, and
                SEO tags.
              </p>
            </div>

            <AddProductDialog
              isCreating={isCreating}
              onCreate={handleCreateProduct}
              errorMessage={createError}
              successMessage={createSuccess}
            />
          </div>
        </section>

        {createError ? (
          <section className="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
            {createError}
          </section>
        ) : null}

        {createSuccess ? (
          <section className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
            {createSuccess}
          </section>
        ) : null}

        {loadError ? (
          <section className="mt-4 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
            <p className="font-medium">Failed to load products.</p>
            <p className="mt-1">{loadError}</p>
            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() => void fetchProducts(currentPage)}
            >
              Retry
            </Button>
          </section>
        ) : null}

        {!loadError && isLoading ? (
          <section className="mt-6 grid place-items-center rounded-2xl border border-emerald-200/50 bg-white/80 py-12 dark:border-emerald-900/30 dark:bg-slate-900/60">
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Loading products...
            </p>
          </section>
        ) : null}

        {!loadError && !isLoading && products.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-dashed border-emerald-300/70 bg-white/70 p-10 text-center dark:border-emerald-900/50 dark:bg-slate-900/60">
            <h2 className="text-lg font-semibold text-foreground">
              No products yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your first product to start AI metadata generation.
            </p>
          </section>
        ) : null}

        {!loadError && !isLoading && products.length > 0 ? (
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
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardDescription className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                          {product.category}
                        </CardDescription>
                        <CardTitle className="mt-1">{product.name}</CardTitle>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-rose-600 hover:bg-rose-100 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40"
                        onClick={() => void handleDeleteProduct(product._id)}
                        disabled={deletingId === product._id}
                      >
                        {deletingId === product._id ? (
                          <LoaderCircle className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </Button>
                    </div>
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

                    <Link
                      to={`/products/${product._id}`}
                      className="inline-flex text-sm font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
                    >
                      View details
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        ) : null}

        {!loadError && !isLoading && totalProducts > 0 ? (
          <section className="mt-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-emerald-200/50 bg-white/80 p-4 text-sm dark:border-emerald-900/30 dark:bg-slate-900/60 sm:flex-row sm:items-center">
            <p className="text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
              {(currentPage - 1) * PAGE_SIZE + products.length} of{" "}
              {totalProducts} products
            </p>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() =>
                  setCurrentPage((previous) => Math.max(previous - 1, 1))
                }
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <span className="px-2 text-sm text-foreground/80">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((previous) =>
                    Math.min(previous + 1, totalPages),
                  )
                }
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default Product;
