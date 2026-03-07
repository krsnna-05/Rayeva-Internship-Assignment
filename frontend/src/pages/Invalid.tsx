import { AlertTriangle, Box } from "lucide-react";
import { Link } from "react-router";

const Invalid = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-linear-to-b from-rose-50 via-orange-50 to-amber-50 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-lg rounded-2xl border border-rose-300/40 bg-white/80 p-8 text-center shadow-sm backdrop-blur dark:border-rose-800/40 dark:bg-slate-900/70">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
          <AlertTriangle className="size-7" />
        </span>

        <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-rose-600 dark:text-rose-300">
          404 ERROR
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you are looking for does not exist. Try going back to a valid
          route.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Box className="size-4" />
            Product Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Invalid;
