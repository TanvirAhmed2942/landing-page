"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Gift,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "01",
    title: "Chapter-Based Reading",
    description:
      "Enjoy stories divided into easy-to-read chapters. Perfect for reading on the go or during breaks.",
    icon: BookOpen,
  },
  {
    num: "02",
    title: "Personalized Recommendations",
    description:
      "Discover new stories tailored to your taste. Our smart algorithm learns what you love.",
    icon: Wand2,
  },
  {
    num: "03",
    title: "Bookmark & Continue Reading",
    description:
      "Never lose your place. Pick up right where you left off on any device, anytime.",
    icon: Bookmark,
  },
  {
    num: "04",
    title: "Daily Premium Books",
    description: "Read quality and refreshing chapters daily.",
    icon: Gift,
  },
] as const;

function ReadingExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEls = headerRef.current?.children;
      const cardEls = cardsRef.current?.querySelectorAll("[data-feature-card]");
      const cta = ctaRef.current;

      gsap.set(headerEls ? Array.from(headerEls) : [], {
        opacity: 0,
        y: 36,
      });
      if (cardEls?.length) {
        gsap.set(cardEls, { opacity: 0, y: 48 });
      }
      if (cta) gsap.set(cta, { opacity: 0, y: 28 });

      const runEnter = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (headerEls?.length) {
          tl.to(Array.from(headerEls), {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
          });
        }

        if (cardEls?.length) {
          tl.to(
            cardEls,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.14,
            },
            "-=0.35"
          );
        }

        if (cta) {
          tl.to(
            cta,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.4"
          );
        }
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: runEnter,
      });

      if (ctaButtonRef.current) {
        gsap.to(ctaButtonRef.current, {
          scale: 1.2,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "easeInOut",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        className="pointer-events-none absolute -left-24 top-20 size-[min(420px,70vw)] rounded-full bg-violet-400/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-32 size-[min(380px,65vw)] rounded-full bg-blue-400/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center sm:mb-16 lg:mb-20"
        >
          <Badge
            variant="secondary"
            className={cn(
              "mb-5 h-auto gap-1.5 rounded-full border-0 bg-indigo-50/90 px-3.5 py-1.5 text-sm font-medium text-violet-700",
              "shadow-sm"
            )}
          >
            <Sparkles className="size-3.5 text-violet-600" aria-hidden />
            Features
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Everything You Need for the Perfect Reading Experience
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-500 sm:text-lg">
            Discover powerful features designed to make your reading journey
            smooth, enjoyable, and personalized.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6"
        >
          {features.map(({ num, title, description, icon: Icon }) => (
            <div
              key={num}
              data-feature-card
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="rounded-3xl bg-linear-to-b from-sky-400 via-indigo-500 to-pink-600 p-px shadow-sm will-change-transform"
            >
              <div className="flex h-full flex-col rounded-[calc(1.4rem-1px)] bg-white p-7 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-100 to-indigo-50 text-violet-600"
                    aria-hidden
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-3xl font-bold tabular-nums text-indigo-400/35 sm:text-4xl"
                    aria-hidden
                  >
                    {num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 sm:text-[0.9375rem]">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-5 text-center sm:mt-16 lg:mt-20"
        >
          <p className="text-base text-slate-500 sm:text-lg">
            Ready to start your reading journey?
          </p>
          <Button
            asChild
            size="lg"
            className={cn(
              "h-12 rounded-full border-0 px-8 text-base font-semibold text-white shadow-md",
              "bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600",
              "hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500",
              "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
            )}
          >
            <Link
              ref={ctaButtonRef}
              href="#download"
              className="inline-flex items-center gap-2"
            >
              Get KPnovel Now
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ReadingExperience;
