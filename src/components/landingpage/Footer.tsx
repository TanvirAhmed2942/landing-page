"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send } from "lucide-react";
import Image from "next/image";
import BugReport from "@/components/landingpage/BugReport";
import ContactUs from "@/components/landingpage/ContactUs";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const productLinks = [
  { href: "#features", label: "Features" },
  { href: "#preview", label: "App Preview" },
  { href: "#join", label: "Join KP Writers" },
  { href: "#download", label: "Download" },
] as const;

type SupportLink =
  | { label: string; href: string }
  | { label: string; bugReport: true }
  | { label: string; contactUs: true };

const supportLinks: SupportLink[] = [
  { href: "#", label: "Help Center" },
  { href: "#faqs", label: "FAQs" },
  { href: "#", label: "Copyright Notice" },
  { label: "Contact Us", contactUs: true },
  { label: "Report a Bug", bugReport: true },
];

type NewsletterFormValues = {
  email: string;
};

function SocialIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <Link
      href="#"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full bg-zinc-800 text-white transition-colors hover:bg-zinc-700"
    >
      {children}
    </Link>
  );
}

function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const subscribeWrapRef = useRef<HTMLDivElement>(null);
  const [bugReportOpen, setBugReportOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    defaultValues: { email: "" },
  });

  const onNewsletterSubmit = (data: NewsletterFormValues) => {
    void data;
    reset();
    toast.success("You're subscribed", {
      description: "Thanks! We'll send updates and new releases to your inbox.",
    });
  };

  const onNewsletterInvalid = () => {
    toast.error("Please enter a valid email", {
      description: "Check the email field and try again.",
    });
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cols = topRef.current?.querySelectorAll("[data-footer-col]");
      const newsKids = newsletterRef.current?.children;
      const bottomKids = bottomRef.current?.children;

      if (cols?.length) gsap.set(cols, { opacity: 0, y: 28 });
      if (newsKids?.length) gsap.set(newsKids, { opacity: 0, y: 20 });
      if (bottomKids?.length) gsap.set(bottomKids, { opacity: 0 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          if (cols?.length) {
            tl.to(cols, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
          }
          if (newsKids?.length) {
            tl.to(
              Array.from(newsKids),
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
              "-=0.35"
            );
          }
          if (bottomKids?.length) {
            tl.to(
              Array.from(bottomKids),
              { opacity: 1, duration: 0.45 },
              "-=0.25"
            );
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const onSubscribeEnter = () => {
    if (!subscribeWrapRef.current) return;
    gsap.to(subscribeWrapRef.current, {
      scale: 1.04,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onSubscribeLeave = () => {
    if (!subscribeWrapRef.current) return;
    gsap.to(subscribeWrapRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden bg-[#0a0a0a] text-zinc-400"
    >
      <div
        className="pointer-events-none absolute -left-24 top-0 size-80 rounded-full bg-violet-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-32 size-72 rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div
          ref={topRef}
          className="grid gap-12 border-b border-zinc-800 pb-14 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pb-16"
        >
          <div data-footer-col className="lg:pr-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white outline-none ring-offset-2 ring-offset-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              <Image
                src="/white_logo.svg"
                alt="KPnovel Logo"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Your gateway to endless stories. Read, explore, and immerse
              yourself in captivating narratives. Join millions of readers
              worldwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SocialIcon label="Facebook">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Twitter">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="YouTube">
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-bold text-white">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-bold text-white">Support</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  {"contactUs" in item && item.contactUs ? (
                    <button
                      type="button"
                      onClick={() => setContactUsOpen(true)}
                      className="text-left transition-colors hover:text-white"
                    >
                      {item.label}
                    </button>
                  ) : "bugReport" in item && item.bugReport ? (
                    <button
                      type="button"
                      onClick={() => setBugReportOpen(true)}
                      className="text-left transition-colors hover:text-white"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={"href" in item ? item.href : "#"}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-bold text-white">Contact</h3>
            <div className="mt-4 flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-600/90 text-white">
                <Mail className="size-4" aria-hidden />
              </div>
              <div className="text-sm leading-snug">
                <a
                  href="mailto:support@kpnovel.com"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  support@kpnovel.com
                </a>
                <p className="mt-3 text-zinc-500">Available Mon-Fri</p>
                <p className="text-zinc-500">9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={newsletterRef}
          id="join"
          className="scroll-mt-24 border-b border-zinc-800 py-12 text-center sm:py-14 lg:py-16"
        >
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Stay Updated
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-400 sm:text-base">
            Subscribe to our newsletter for the latest updates and new story
            releases.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-start sm:gap-3"
            onSubmit={handleSubmit(onNewsletterSubmit, onNewsletterInvalid)}
            noValidate
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                  aria-hidden
                />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? "footer-email-error" : undefined
                  }
                  className={cn(
                    "h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500",
                    "outline-none transition-colors focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/25",
                    errors.email &&
                    "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/25"
                  )}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p
                  id="footer-email-error"
                  className="text-left text-xs text-red-400 sm:pl-0.5"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
            <div
              ref={subscribeWrapRef}
              className="shrink-0 will-change-transform"
              onMouseEnter={onSubscribeEnter}
              onMouseLeave={onSubscribeLeave}
            >
              <Button
                type="submit"
                className={cn(
                  "h-12 w-full rounded-xl border-0 px-6 text-sm font-semibold text-white sm:w-auto",
                  "bg-linear-to-t from-violet-600 to-blue-600 shadow-lg shadow-violet-900/30",
                  "hover:from-violet-500 hover:to-blue-500",
                  "focus-visible:ring-2 focus-visible:ring-violet-400/60"
                )}
              >
                Subscribe
                <Send className="ml-2 size-4" aria-hidden />
              </Button>
            </div>
          </form>
        </div>

        <div
          ref={bottomRef}
          className="flex flex-col items-center justify-between gap-4 pt-10 text-sm text-zinc-500 sm:flex-row sm:pt-12"
        >
          <p>© {new Date().getFullYear()} Rinik Tech Company Limited. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="transition-colors hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-zinc-300">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-zinc-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <ContactUs open={contactUsOpen} onOpenChange={setContactUsOpen} />
      <BugReport open={bugReportOpen} onOpenChange={setBugReportOpen} />
    </footer>
  );
}

export default Footer;
