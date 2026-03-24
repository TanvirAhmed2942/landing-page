"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Palette, Pause, Play, Video, Zap } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const DEMO_VIDEO = "/material_1.mp4";

const features = [
  {
    icon: BookOpen,
    title: "Easy Navigation",
    description: "Intuitive and simple to use",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Smooth and responsive",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Crafted for readers",
  },
] as const;

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const playWrapRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = mediaRef.current;
    if (!video) return;

    const syncDuration = () => {
      const next = video.duration;
      if (Number.isFinite(next) && next > 0) {
        setDuration(next);
      }
    };

    syncDuration();
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("durationchange", syncDuration);
    video.addEventListener("loadeddata", syncDuration);
    video.addEventListener("canplay", syncDuration);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
      video.removeEventListener("loadeddata", syncDuration);
      video.removeEventListener("canplay", syncDuration);
    };
  }, []);

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
      if (videoRef.current) {
        gsap.set(videoRef.current, { opacity: 0, y: 36, scale: 0.96 });
      }
      if (playWrapRef.current) {
        gsap.set(playWrapRef.current, { opacity: 0, scale: 0.85 });
      }
      if (cards?.length) {
        gsap.set(cards, { opacity: 0, y: 44 });
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
              duration: 0.55,
              stagger: 0.08,
            });
          }
          if (videoRef.current) {
            tl.to(
              videoRef.current,
              { opacity: 1, y: 0, scale: 1, duration: 0.75 },
              "-=0.25"
            );
          }
          if (playWrapRef.current) {
            tl.to(
              playWrapRef.current,
              { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
              "-=0.45"
            );
          }
          if (cards?.length) {
            tl.to(
              cards,
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
              "-=0.35"
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onPlayEnter = () => {
    if (!playWrapRef.current) return;
    gsap.to(playWrapRef.current, {
      scale: 1.08,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onPlayLeave = () => {
    if (!playWrapRef.current) return;
    gsap.to(playWrapRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const togglePlayback = async () => {
    const video = mediaRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      return;
    }
    video.pause();
  };

  const formatTime = (seconds: number | null) => {
    if (seconds == null || Number.isNaN(seconds) || !Number.isFinite(seconds)) {
      return "--:--";
    }
    const total = Math.max(0, Math.floor(seconds));
    const hours = Math.floor(total / 3600);
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    if (hours > 0) {
      const remMins = Math.floor((total % 3600) / 60);
      return `${hours}:${remMins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="bg-white px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-12 lg:mb-14"
        >
          <Badge
            variant="secondary"
            className={cn(
              "mb-4 h-auto gap-1.5 rounded-full border-0 bg-violet-100/95 px-3.5 py-1.5 text-sm font-medium text-violet-900",
              "shadow-sm"
            )}
          >
            <Video className="size-3.5 text-violet-700" aria-hidden />
            Demo Video
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            See How It Works
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-base text-slate-500 sm:text-lg">
            Watch a quick demo to discover all the amazing features that make
            KPNovel the best reading app.
          </p>
        </div>

        <div
          ref={videoRef}
          className="relative mx-auto mb-12  sm:mb-14 lg:mb-16"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl shadow-[0_24px_64px_-20px_rgba(79,70,229,0.25),0_12px_32px_-16px_rgba(15,23,42,0.12)]",
              "ring-1 ring-black/5"
            )}
          >
            <div className="relative aspect-video w-full bg-slate-900">
              <video
                ref={mediaRef}
                className="h-full w-full object-cover"
                preload="metadata"
                playsInline
                loop
                onLoadedMetadata={(event) => {
                  const next = event.currentTarget.duration;
                  if (Number.isFinite(next) && next > 0) setDuration(next);
                }}
                onDurationChange={(event) => {
                  const next = event.currentTarget.duration;
                  if (Number.isFinite(next) && next > 0) setDuration(next);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(event) => {
                  setCurrentTime(event.currentTarget.currentTime);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
              >
                <source src={DEMO_VIDEO} type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30"
                aria-hidden
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  ref={playWrapRef}
                  className="will-change-transform"
                  onMouseEnter={onPlayEnter}
                  onMouseLeave={onPlayLeave}
                >
                  <Button
                    type="button"
                    size="icon-lg"
                    aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                    onClick={togglePlayback}
                    className={cn(
                      "size-16 rounded-full border-0 shadow-xl sm:size-18",
                      "bg-linear-to-br from-violet-600 to-blue-600 text-white",
                      "hover:from-violet-500 hover:to-blue-500",
                      "focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="size-7 fill-current sm:size-8" aria-hidden />
                    ) : (
                      <Play
                        className="ml-0.5 size-7 fill-current sm:size-8"
                        aria-hidden
                      />
                    )}
                  </Button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 pb-5 sm:p-6 sm:pb-6">
                <div className="min-w-0 text-left text-white">
                  <p className="text-base font-bold drop-shadow-sm sm:text-lg">
                    KPNovel App Tour
                  </p>
                  <p className="mt-0.5 text-sm text-white/90 drop-shadow-sm sm:text-base">
                    A complete walkthrough of all features
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium tabular-nums text-white backdrop-blur-sm sm:text-sm"
                  aria-hidden
                >
                  {duration != null && Number.isFinite(duration)
                    ? `-${formatTime(Math.max(duration - currentTime, 0))}`
                    : "--:--"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className={cn(
                "flex flex-col items-center rounded-2xl border border-violet-200/60 bg-violet-50/70 px-5 py-7 text-center",
                "shadow-sm sm:px-6 sm:py-8"
              )}
            >
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white/80 text-2xl shadow-sm ring-1 ring-violet-100"
                aria-hidden
              >
                <Icon className="size-6 text-violet-700" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
