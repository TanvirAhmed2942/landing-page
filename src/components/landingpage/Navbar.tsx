"use client";

import WritersFormModal from "@/components/landingpage/WritersFormModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#preview", label: "Preview" },
  { href: "#demo", label: "Demo" },
  { href: "#download", label: "Download" },
] as const;

function Navbar() {
  const [writersOpen, setWritersOpen] = useState(false);

  return (
    <header className="relative border-b  bg-transparent ">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-indigo-500/8 via-violet-500/4 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-violet-500/6 to-transparent"
        aria-hidden
      />

      <nav
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 sm:h-17 sm:px-8 lg:px-10"
        aria-label="Main"
      >
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

        <div className="flex flex-1 items-center justify-end gap-6 sm:gap-8 lg:gap-10">
          <ul className="hidden items-center gap-6 sm:flex md:gap-8">
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
            Join KP Writers
          </Button>
        </div>
      </nav>

      <WritersFormModal open={writersOpen} onOpenChange={setWritersOpen} />
    </header>
  );
}

export default Navbar;
