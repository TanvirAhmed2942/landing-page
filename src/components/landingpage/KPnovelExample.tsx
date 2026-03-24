"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Chapter Reading",
    description: "Smooth scrolling and custom fonts",
    image: "/example/example_1.jpg",
  },
  {
    title: "Reading Settings",
    description: "Beautiful, distraction-free reading",
    image: "/example/example_2.png",
  },
  {
    title: "Power Stones",
    description: "Earn power stones for vote",
    image: "/example/example_3.png",
  },
  {
    title: "Story Library",
    description: "Browse thousands of titles in one place",
    image: "/example/example_2.png",
  },
  {
    title: "Community",
    description: "Discuss chapters with fellow readers",
    image: "/example/example_1.jpg",
  },
] as const;

function KPnovelExample() {
  return (
    <section
      id="preview"
      className="relative overflow-hidden bg-transparent px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-14 lg:mb-16">
          <Badge
            variant="outline"
            className="mb-4 h-auto gap-1.5 rounded-full border-sky-200 bg-sky-50/90 px-3.5 py-1.5 text-sm font-medium text-sky-800 shadow-sm"
          >
            <Smartphone className="size-3.5 text-sky-600" aria-hidden />
            App Preview
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            See KPnovel In Action
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-base text-slate-500 sm:text-lg">
            Experience the beautiful interface designed for the ultimate reading
            pleasure.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".kp-example-prev",
              nextEl: ".kp-example-next",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="kp-example-swiper pb-12!"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.title} className="w-full pb-2 px-1 sm:px-2">
                <Card className="rounded-3xl border border-zinc-200/70 gap-0 bg-white pt-0 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)] p-0">
                  <CardContent className="p-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={900}
                      height={1400}
                      className="h-[320px] w-full rounded-t-3xl object-cover sm:h-[420px] md:h-[460px]"
                    />
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-1 rounded-b-3xl border-zinc-100 bg-white px-5 py-4 sm:px-6 sm:py-5">
                    <CardTitle className="text-lg font-bold text-slate-900 sm:text-xl">
                      {slide.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-slate-500">
                      {slide.description}
                    </CardDescription>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous slide"
            className="kp-example-prev absolute left-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-100/95 text-zinc-700 shadow-[0_10px_22px_-14px_rgba(15,23,42,0.55)] backdrop-blur-sm transition hover:bg-white lg:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="kp-example-next absolute right-2 top-1/2 z-20 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-100/95 text-zinc-700 shadow-[0_10px_22px_-14px_rgba(15,23,42,0.55)] backdrop-blur-sm transition hover:bg-white lg:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

    </section>
  );
}

export default KPnovelExample;
