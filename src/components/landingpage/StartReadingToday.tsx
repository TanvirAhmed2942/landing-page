"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Smartphone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=https%3A%2F%2Fkpnovel.app";

const stats = [
  { value: "10M+", label: "Downloads" },
  { value: "4.9", label: "App Rating" },
  { value: "1000+", label: "Stories" },
  { value: "50K+", label: "Chapters" },
] as const;

function AppleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function StartReadingToday() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerKids = headerRef.current?.children;
      const storeKids = storesRef.current?.children;
      const statKids = statsRef.current?.children;

      gsap.set(headerKids ? Array.from(headerKids) : [], {
        opacity: 0,
        y: 26,
      });
      if (storeKids?.length) gsap.set(storeKids, { opacity: 0, y: 32 });
      if (statKids?.length) gsap.set(statKids, { opacity: 0, y: 28 });
      if (qrRef.current) gsap.set(qrRef.current, { opacity: 0, y: 24 });

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
              duration: 0.55,
              stagger: 0.08,
            });
          }
          if (storeKids?.length) {
            tl.to(
              storeKids,
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
              "-=0.25"
            );
          }
          if (statKids?.length) {
            tl.to(
              statKids,
              { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
              "-=0.35"
            );
          }
          if (qrRef.current) {
            tl.to(
              qrRef.current,
              { opacity: 1, y: 0, duration: 0.6 },
              "-=0.3"
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative overflow-hidden bg-linear-to-b from-[#4f46e5] to-[#9333ea] px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >


      <div className="relative mx-auto max-w-4xl text-center">
        <div
          ref={headerRef}
          className="mx-auto mb-10 flex max-w-2xl flex-col items-center sm:mb-12 lg:mb-14"
        >
          <Badge
            variant="outline"
            className={cn(
              "mb-4 h-auto gap-1.5 rounded-full border border-white/50 bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white",
              "shadow-sm backdrop-blur-sm"
            )}
          >
            <Star className="size-3.5 fill-white text-white" aria-hidden />
            Download Now
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
            Start Reading Today
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-base text-white/85 sm:text-lg">
            Download KPNovel and dive into a world of endless stories.
            Available on all platforms.
          </p>
        </div>

        <div
          ref={storesRef}
          className="mb-10 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mb-12"
        >
          <StoreCard
            href="#"
            className="bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
            iconBoxClassName="bg-[#34A853]"
            icon={<Smartphone className="size-6 text-white" strokeWidth={2} />}
            kicker="GET IT ON"
            title="Google Play"
            kickerClassName="text-slate-500"
            titleClassName="text-slate-900"
          />
          <StoreCard
            href="#"
            className="bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
            iconBoxClassName="bg-[#007AFF]"
            icon={<AppleMark className="size-7 text-white" />}
            kicker="Download on the"
            title="App Store"
            kickerClassName="text-slate-500"
            titleClassName="text-slate-900"
          />
          <StoreCard
            href="#"
            className="border border-white/45 bg-white/10 shadow-none backdrop-blur-md"
            iconBoxClassName="bg-white/10 border border-white/45"
            icon={<Download className="size-6 text-white" strokeWidth={2.25} />}
            kicker="Direct Download"
            title="APK File"
            kickerClassName="text-blue-100/90"
            titleClassName="text-white"
          />
        </div>

        <div
          ref={statsRef}
          className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mb-12 lg:grid-cols-4"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/35 bg-white/10 px-4 py-5 backdrop-blur-sm sm:px-5 sm:py-6"
            >
              <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs text-blue-100/90 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div ref={qrRef} className="flex flex-col items-center">
          <p className="mb-4 text-sm text-blue-100/90 sm:text-base">
            Scan to download on mobile
          </p>
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="mx-auto flex w-fit flex-col items-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/80 p-4">
              <Image
                src={QR_SRC}
                alt="QR code to open KPNovel download page"
                width={200}
                height={200}
                className="size-[180px] sm:size-[200px]"
                unoptimized
              />
              <p className="mt-2 text-xs font-medium text-slate-500">Scan Me</p>
            </div>
            <p className="mt-5 text-center text-base font-bold text-slate-900 sm:text-lg">
              KPNovel App
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreCard({
  href,
  className,
  iconBoxClassName,
  icon,
  kicker,
  title,
  kickerClassName,
  titleClassName,
}: {
  href: string;
  className?: string;
  iconBoxClassName: string;
  icon: ReactNode;
  kicker: string;
  title: string;
  kickerClassName: string;
  titleClassName: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-2xl p-4 text-left transition-transform hover:scale-[1.02] sm:gap-4 sm:p-5",
        className
      )}
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl sm:size-14",
          iconBoxClassName
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className={cn("text-[10px] font-medium uppercase sm:text-xs", kickerClassName)}>
          {kicker}
        </p>
        <p className={cn("text-base font-bold sm:text-lg", titleClassName)}>
          {title}
        </p>
      </div>
    </Link>
  );
}

export default StartReadingToday;
