"use client";

import WritersFormModal from "@/components/landingpage/WritersFormModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Languages, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function Navbar() {
  const t = useTranslations("header.navlink");
  const [currentLocale, setCurrentLocale] = useState("en");
  const router = useRouter();
  const [writersOpen, setWritersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Language toggle handler
  const handleLanguageToggle = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";

    // 1. Update state
    setCurrentLocale(newLocale);

    // 2. Set cookie (this is what your i18n config reads!)
    if (typeof document !== "undefined") {
      document.cookie = `MYNEXTAPP_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // 3. Also update localStorage for backwards compatibility
      localStorage.setItem("locale", newLocale);
    }

    // 4. Refresh the router to apply new locale
    startTransition(() => {
      router.refresh();
    });
  };
  const navLinks = [
    { href: "#features", label: t("features") },
    { href: "#preview", label: t("preview") },
    { href: "#demo", label: t("demo") },
    { href: "#download", label: t("download") },
  ] as const;
  return (
    <header className="relative border-b bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-indigo-500/8 via-violet-500/4 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-violet-500/6 to-transparent"
        aria-hidden
      />

      <nav
        className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10"
        aria-label="Main"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-500/40"
          >
            <Image
              src="/logo.svg"
              alt="KPnovel Logo"
              width={300}
              height={300}
              className="w-auto h-auto"
              priority
            />
          </Link>

          <div className="flex items-center gap-x-8">
            <ul className="hidden items-center gap-6 md:flex md:gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "text-sm font-medium text-zinc-500 transition-colors",
                      "hover:text-zinc-900 focus-visible:text-zinc-900",
                      "outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-indigo-500/30 rounded-sm"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 md:flex">
              <Button
                type="button"
                size="lg"
                onClick={() => setWritersOpen(true)}
                className={cn(
                  "h-10 rounded-full border-0 px-6 text-sm font-semibold text-white shadow-sm",
                  "bg-linear-to-b from-blue-600 via-indigo-600 to-violet-600",
                  "hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500",
                  "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                )}
              >
                {t("joinWritersButton")}
              </Button>
              <Button
                type="button"
                size="lg"
                className={cn(
                  "h-10 w-10 rounded-full border-0  text-sm font-semibold text-white shadow-sm",
                  "bg-linear-to-b from-blue-600 via-indigo-600 to-violet-600",
                  "hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500",
                  "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                )}
                onClick={handleLanguageToggle}
              >
                <Languages />
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex size-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="pb-4 md:hidden">
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  setWritersOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "h-10 flex-1 rounded-full border-0 px-4 text-sm font-semibold text-white shadow-sm",
                  "bg-linear-to-b from-blue-600 via-indigo-600 to-violet-600",
                  "hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500",
                  "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                )}
              >
                {t("joinWritersButton")}
              </Button>
              <Button
                type="button"
                className={cn(
                  "h-10 w-10 shrink-0 rounded-full border-0 text-sm font-semibold text-white shadow-sm",
                  "bg-linear-to-b from-blue-600 via-indigo-600 to-violet-600",
                  "hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500",
                  "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                )}
                onClick={handleLanguageToggle}
              >
                <Languages />
              </Button>
            </div>
          </div>
        )}
      </nav>

      <WritersFormModal open={writersOpen} onOpenChange={setWritersOpen} />
    </header>
  );
}

export default Navbar;
