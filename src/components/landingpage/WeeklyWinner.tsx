"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BOOK_IMAGE =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80";
const AUTHOR_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";

const winners = [
  {
    id: "book",
    cardTitle: "Best Book of the Week",
    name: "Your Soul is a River",
    subtitle: "Nikita Gill",
    votes: "5.9K votes",
    image: BOOK_IMAGE,
    imageAlt: "Book cover placeholder for Your Soul is a River",
    backgroundColor: "#FEF9E7",
    votePillClassName: "bg-zinc-900 text-white",
    voteIconClassName: "fill-amber-300 text-amber-300",
    championPillClassName: "bg-zinc-200/90 text-zinc-700",
  },
  {
    id: "author",
    cardTitle: "Best Author of the Week",
    name: "Nikita Gill",
    subtitle: "Creative fiction writer with a love.",
    votes: "5.9K votes",
    image: AUTHOR_IMAGE,
    imageAlt: "Author writing in a notebook",
    backgroundColor: "#E3F2FD",
    votePillClassName: "border border-slate-200/80 bg-white text-slate-900 shadow-sm",
    voteIconClassName: "text-amber-500",
    championPillClassName:
      "border border-slate-200/80 bg-white text-slate-600 shadow-sm",
  },
] as const;

function WeeklyWinner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerKids = headerRef.current?.children;
      const cards = cardsRef.current?.children;

      gsap.set(headerKids ? Array.from(headerKids) : [], {
        opacity: 0,
        y: 28,
      });
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          if (headerKids?.length) {
            tl.to(Array.from(headerKids), {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
            });
          }
          if (cards?.length) {
            tl.to(
              cards,
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.15 },
              "-=0.35"
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onCardEnter = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      scale: 1.02,
      y: -4,
      duration: 0.4,
      ease: "power2.out",
      boxShadow:
        "0 28px 60px -18px rgba(15, 23, 42, 0.18), 0 12px 24px -12px rgba(15, 23, 42, 0.12)",
    });
  };

  const onCardLeave = (el: HTMLElement | null) => {
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      boxShadow:
        "0 20px 40px -24px rgba(15, 23, 42, 0.12), 0 8px 16px -8px rgba(15, 23, 42, 0.08)",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Weekly Winners
          </h2>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            Celebrating the top book and author of the week.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {winners.map((winner) => (
            <Card
              key={winner.id}
              onMouseEnter={(e) => onCardEnter(e.currentTarget)}
              onMouseLeave={(e) => onCardLeave(e.currentTarget)}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl p-3 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.12),0_8px_16px_-8px_rgba(15,23,42,0.08)] sm:p-4",
                "will-change-transform"
              )}
              style={{ backgroundColor: winner.backgroundColor }}
            >
              <h3 className="mb-3 text-center text-3xl font-bold tracking-tight text-slate-900 sm:mb-4 sm:text-[2rem]">
                {winner.cardTitle}
              </h3>
              <CardContent className="mx-auto mb-4 w-full overflow-hidden rounded-xl p-0">
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={winner.image}
                    alt={winner.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex items-end justify-between gap-3 border-0 bg-transparent py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[1.9rem] font-bold leading-none text-slate-900 sm:text-[2rem]">
                    {winner.name}
                  </p>
                  <p className="mt-1 truncate text-xl text-slate-600 sm:text-2xl">
                    {winner.subtitle}
                  </p>
                  <span
                    className={cn(
                      "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold",
                      winner.votePillClassName
                    )}
                    aria-label="5.9 thousand votes"
                  >
                    <Zap
                      className={cn("size-3 shrink-0", winner.voteIconClassName)}
                    />
                    {winner.votes}
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-slate-900 sm:text-5xl">
                    1
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
                      winner.championPillClassName
                    )}
                  >
                    Champion
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeeklyWinner;
