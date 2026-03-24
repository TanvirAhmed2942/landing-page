"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type GsapFadeInProps = {
  children: React.ReactNode;
  className?: string;
};

export function GsapFadeIn({ children, className }: GsapFadeInProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power2.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
