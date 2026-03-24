"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Play,
    Smartphone,
    Star,
    Users,
    Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const HERO_PHONE_PORTRAIT = "/book-app-portrait.png";
const HERO_PHONE_LANDSCAPE = "/book-app-landscape.png";

function HeroSection() {
    const rootRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const lineDiveRef = useRef<HTMLSpanElement>(null);
    const lineStoriesRef = useRef<HTMLSpanElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const phoneLandscapeRef = useRef<HTMLDivElement>(null);
    const ratedRef = useRef<HTMLDivElement>(null);
    const statStoriesRef = useRef<HTMLSpanElement>(null);
    const statReadersRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.set(
                [
                    badgeRef.current,
                    lineDiveRef.current,
                    lineStoriesRef.current,
                    subRef.current,
                    ctaRef.current,
                    statsRef.current,
                ].filter(Boolean),
                { opacity: 0, y: 28 }
            );

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.05,
            });

            tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.55 })
                .to(
                    lineDiveRef.current,
                    { opacity: 1, y: 0, duration: 0.6 },
                    "-=0.35"
                )
                .to(
                    lineStoriesRef.current,
                    { opacity: 1, y: 0, duration: 0.65 },
                    "-=0.45"
                )
                .to(subRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.4")
                .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
                .to(statsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");

            if (phoneRef.current) {
                gsap.from(phoneRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.15,
                });
                gsap.to(phoneRef.current, {
                    y: -10,
                    duration: 2.6,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            if (phoneLandscapeRef.current) {
                gsap.from(phoneLandscapeRef.current, {
                    opacity: 0,
                    y: 28,
                    duration: 0.9,
                    ease: "power3.out",
                    delay: 0.25,
                });
                gsap.to(phoneLandscapeRef.current, {
                    y: 6,
                    duration: 3.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            if (ratedRef.current) {
                gsap.from(ratedRef.current, {
                    opacity: 0,
                    scale: 0.92,
                    duration: 0.65,
                    ease: "back.out(1.4)",
                    delay: 0.55,
                });
                gsap.to(ratedRef.current, {
                    y: 10,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 0.2,
                });
            }

            const storiesEl = statStoriesRef.current;
            const readersEl = statReadersRef.current;

            ScrollTrigger.create({
                trigger: root,
                start: "top 78%",
                once: true,
                onEnter: () => {
                    if (storiesEl) {
                        const proxy = { v: 0 };
                        gsap.to(proxy, {
                            v: 1000,
                            duration: 1.35,
                            ease: "power2.out",
                            onUpdate: () => {
                                storiesEl.textContent = `${Math.round(proxy.v)}+`;
                            },
                        });
                    }
                    if (readersEl) {
                        const proxy = { v: 0 };
                        gsap.to(proxy, {
                            v: 10,
                            duration: 1.4,
                            ease: "power2.out",
                            onUpdate: () => {
                                const n = Math.min(10, Math.max(1, Math.ceil(proxy.v)));
                                readersEl.textContent = `${n}M+`;
                            },
                            onComplete: () => {
                                readersEl.textContent = "10M+";
                            },
                        });
                    }
                },
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            className="relative overflow-hidden bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 md:px-8 lg:px-10 lg:pb-28 lg:pt-14"
        >
            <div className="relative mx-auto grid max-w-6xl gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="flex min-w-0 flex-col gap-5 sm:gap-6 lg:gap-7">
                    <div ref={badgeRef}>
                        <Badge
                            variant="outline"
                            className={cn(
                                "h-auto gap-2 rounded-full border-zinc-200/90 bg-white py-2 pl-3 pr-3.5 text-zinc-500 shadow-sm",
                                "font-normal"
                            )}
                        >
                            <span className="flex items-center gap-0.5" aria-hidden>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-3.5 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </span>
                            <span className="text-xs sm:text-sm">4.9 • 10M+ Downloads</span>
                        </Badge>
                    </div>

                    <h1 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight text-slate-900 min-[390px]:text-[2rem] sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-6xl lg:leading-[1.05] xl:text-7xl">
                        <span ref={lineDiveRef} className="block">
                            Dive into
                        </span>
                        <span
                            ref={lineStoriesRef}
                            className="mt-0.5 block text-balance bg-linear-to-b from-[#4f46e5] to-[#9333ea] bg-clip-text text-transparent sm:mt-0"
                        >
                            Endless{" "}
                            <span className="max-[340px]:block max-[340px]:leading-tight sm:inline">
                                Stories
                            </span>
                        </span>
                    </h1>

                    <p
                        ref={subRef}
                        className="max-w-lg text-pretty text-[0.9375rem] leading-relaxed text-slate-500 sm:text-base md:text-lg"
                    >
                        Thousands of chapters, free reading, daily updates. Your next
                        adventure awaits.
                    </p>

                    <div
                        ref={ctaRef}
                        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                    >
                        <Button
                            asChild
                            size="lg"
                            className={cn(
                                "h-12 lg:h-14 rounded-lg border-0 px-7 text-base font-semibold text-white shadow-md",
                                "bg-linear-to-t from-violet-600 via-indigo-600 to-blue-600",
                                "hover:from-violet-500 hover:via-indigo-500 hover:to-blue-500",
                                "focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2"
                            )}
                        >
                            <Link href="#download" className="inline-flex items-center gap-2">
                                <Smartphone className="size-5" aria-hidden />
                                Download Now
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className={cn(
                                "h-12 lg:h-14 rounded-lg border-zinc-200/90 bg-white px-2 pl-6 text-base font-semibold text-slate-800 shadow-sm",
                                "hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-violet-400/40"
                            )}
                        >
                            <Link
                                href="#demo"
                                className="inline-flex w-full items-center justify-between gap-4 sm:w-auto"
                            >
                                <span>Watch Demo</span>
                                <span
                                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white shadow-inner"
                                    aria-hidden
                                >
                                    <Play className="size-4 fill-current" />
                                </span>
                            </Link>
                        </Button>
                    </div>

                    <div
                        ref={statsRef}
                        className="grid w-full grid-cols-1 gap-3 pt-2 min-[480px]:grid-cols-3 sm:gap-3 sm:pt-4 lg:gap-4"
                    >
                        <StatBlock
                            className="min-w-0 w-full"
                            icon={<Zap className="size-4 text-violet-600" />}
                            value={
                                <span ref={statStoriesRef} className="tabular-nums">
                                    0+
                                </span>
                            }
                            label="Stories"
                        />
                        <StatBlock
                            className="min-w-0 w-full"
                            icon={<Star className="size-4 text-violet-600" />}
                            value={<span className="tabular-nums">Daily</span>}
                            label="Updates"
                        />
                        <StatBlock
                            className="min-w-0 w-full"
                            icon={<Users className="size-4 text-violet-600" />}
                            value={
                                <span ref={statReadersRef} className="tabular-nums">
                                    0M+
                                </span>
                            }
                            label="Readers"
                        />
                    </div>
                </div>

                <div className="relative mx-auto w-full max-w-md min-w-0 lg:mx-0 lg:max-w-none">
                    <Card
                        className={cn(
                            "relative gap-0 p-2 overflow-visible rounded-2xl border-zinc-100 bg-white shadow-[0_24px_64px_-12px_rgba(79,70,229,0.18)] ring-zinc-200/80",
                            // "px-3 pb-3 pt-4 sm:rounded-[2rem] sm:px-5 sm:pb-5 sm:pt-6 lg:rounded-[2.25rem] lg:px-8 lg:pb-8 lg:pt-10"
                        )}
                    >
                        <CardContent className="relative p-2">
                            <div
                                className="relative mx-auto w-full overflow-visible"
                                style={{ aspectRatio: "5 / 4" }}
                            >
                                <div
                                    className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-slate-100 via-indigo-50/90 to-violet-100 sm:rounded-2xl"
                                    aria-hidden
                                />
                                <div className="pointer-events-none absolute -left-6 top-4 size-28 rounded-full bg-blue-400/25 blur-2xl sm:-left-8 sm:size-32" />
                                <div className="pointer-events-none absolute -right-4 bottom-8 size-36 rounded-full bg-violet-400/20 blur-2xl sm:size-40" />

                                {/* Landscape phone — behind, right, tilted (outer = static transform; inner = GSAP float) */}
                                <div
                                    className={cn(
                                        "absolute z-0",
                                        "left-[8%] top-[6%] w-[min(92%,420px)] max-[380px]:left-[4%] max-[380px]:top-[10%] max-[380px]:w-[min(98%,360px)]",
                                        "sm:left-[14%] sm:top-[8%] sm:w-[min(88%,440px)]",
                                        "lg:left-[18%] lg:top-[6%] lg:w-[min(82%,480px)]"
                                    )}
                                    style={{
                                        transform:
                                            "rotate(-11deg) translate3d(6%, 2%, 0)",
                                    }}
                                >
                                    <div
                                        ref={phoneLandscapeRef}
                                        className="will-change-transform"
                                    >
                                        <div
                                            className="relative w-full drop-shadow-[0_20px_36px_-8px_rgba(15,23,42,0.35)]"
                                            style={{ aspectRatio: "16 / 10" }}
                                        >
                                            <Image
                                                src={HERO_PHONE_LANDSCAPE}
                                                alt="KPnovel app on phone in landscape"
                                                fill
                                                className="object-contain object-center"
                                                sizes="(max-width: 640px) 90vw, 480px"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Portrait phone — front, left, tilted */}
                                <div
                                    className={cn(
                                        "absolute z-10",
                                        "left-0 bottom-0 w-[min(52%,220px)] max-[380px]:w-[min(58%,200px)]",
                                        "sm:left-[2%] sm:bottom-[2%] sm:w-[min(48%,240px)]",
                                        "lg:left-[4%] lg:bottom-[4%] lg:w-[min(44%,260px)]"
                                    )}
                                    style={{
                                        transform:
                                            "rotate(9deg) translate3d(0, -2%, 0)",
                                    }}
                                >
                                    <div ref={phoneRef} className="will-change-transform">
                                        <div
                                            className="relative w-full drop-shadow-[0_24px_44px_-10px_rgba(15,23,42,0.42)]"
                                            style={{ aspectRatio: "9 / 19" }}
                                        >
                                            <Image
                                                src={HERO_PHONE_PORTRAIT}
                                                alt="KPnovel app on phone in portrait"
                                                fill
                                                className="object-contain object-center"
                                                sizes="(max-width: 640px) 55vw, 260px"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <Card
                            ref={ratedRef}
                            size="sm"
                            className={cn(
                                "absolute -bottom-2 right-1 z-2 flex-row items-center gap-2 border-zinc-100 bg-white py-2 pl-2.5 pr-3 shadow-lg ring-zinc-200/60 max-[479px]:max-w-[calc(100%-1rem)] sm:-bottom-4 sm:right-3 sm:py-2.5 sm:pl-3 sm:pr-3.5 md:right-4"
                            )}
                        >
                            <span className="flex items-center gap-0.5" aria-hidden>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-3 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </span>
                            <span className="text-xs font-medium text-slate-600 sm:text-sm">
                                Highly Rated
                            </span>
                        </Card>
                    </Card>
                </div>
            </div>
        </section>
    );
}

function StatBlock({
    className,
    icon,
    value,
    label,
}: {
    className?: string;
    icon: ReactNode;
    value: ReactNode;
    label: string;
}) {
    return (
        <Card
            size="sm"
            className={cn(
                "gap-0 border-violet-200/60 bg-violet-50/50 py-3 shadow-none ring-0",
                className
            )}
        >
            <CardContent className="flex items-center gap-2.5 p-0 px-3 py-0.5 sm:gap-3 sm:px-3.5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-violet-100 sm:size-12">
                    {icon}
                </div>
                <div className="min-w-0 flex flex-col gap-0.5 text-left">
                    <p className="text-sm font-bold leading-tight text-slate-900 sm:text-base">
                        {value}
                    </p>
                    <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default HeroSection;
