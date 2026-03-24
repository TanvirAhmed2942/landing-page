import { cn } from "@/lib/utils";

/** One blurred orb; parent should be `relative overflow-hidden`. Tune `className` for position, size, color. */
export function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        className
      )}
      aria-hidden
    />
  );
}

export type AmbientGlowsProps = {
  className?: string;
  /** Show / hide each blob (default: all on) */
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
  /** Extra classes per blob — full control per section */
  leftClassName?: string;
  rightClassName?: string;
  bottomClassName?: string;
};

const defaultLeft =
  "-left-32 top-0 size-[min(520px,90vw)] bg-violet-500/35";
const defaultRight =
  "-right-24 top-24 size-[min(480px,85vw)] bg-indigo-500/28";
const defaultBottom =
  "bottom-0 left-1/2 size-[min(600px,100vw)] -translate-x-1/2 bg-blue-500/22";

/**
 * Preset trio of orbs; prefer `GlowOrb` in `Home` when you want manual placement.
 */
export function AmbientGlows({
  className,
  left = true,
  right = true,
  bottom = true,
  leftClassName,
  rightClassName,
  bottomClassName,
}: AmbientGlowsProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {left ? <GlowOrb className={cn(defaultLeft, leftClassName)} /> : null}
      {right ? <GlowOrb className={cn(defaultRight, rightClassName)} /> : null}
      {bottom ? <GlowOrb className={cn(defaultBottom, bottomClassName)} /> : null}
    </div>
  );
}
