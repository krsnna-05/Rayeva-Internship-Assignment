import { useState } from "react";
import { Boxes, FileText, Leaf, Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router";

const navLinks = [
  { label: "Product Generation", href: "/products", icon: Boxes },
  {
    label: "Proposal Generation",
    href: "/proposal",
    icon: FileText,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-emerald-300/40 bg-linear-to-r from-emerald-100/95 via-lime-50/95 to-cyan-100/95 backdrop-blur-md dark:from-emerald-950/80 dark:via-slate-950/80 dark:to-cyan-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-900 transition-opacity hover:opacity-80 dark:text-emerald-100"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-800 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-900">
              <Leaf className="size-4" />
            </span>
            <span>AI Commerce Automation</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-emerald-900/85 transition-colors hover:bg-emerald-200/60 hover:text-emerald-950 dark:text-emerald-100/90 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-50"
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-emerald-300/40 bg-background/95 px-4 py-3 backdrop-blur md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/85 hover:bg-muted hover:text-foreground"
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;
