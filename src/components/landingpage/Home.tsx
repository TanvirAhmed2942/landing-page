import { GlowOrb } from "@/components/landingpage/AmbientGlows";
import Footer from "@/components/landingpage/Footer";
import HeroSection from "@/components/landingpage/HeroSection";
import HowItWorks from "@/components/landingpage/HowItWorks";
import KPnovelExample from "@/components/landingpage/KPnovelExample";
import Navbar from "@/components/landingpage/Navbar";
import ReadingExperience from "@/components/landingpage/ReadingExperience";
import StartReadingToday from "@/components/landingpage/StartReadingToday";
import WeeklyWinner from "@/components/landingpage/WeeklyWinner";

/**
 * One tall `relative` shell so backdrop + glows use a single `absolute inset-0` layer
 * for the whole main column — blurs aren’t clipped between sections. CTA + footer stay out.
 * Tune orb `className`s (e.g. `top-[40%]`, colors) as you like.
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <div className="relative overflow-x-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 z-0 bg-white" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 z-1 overflow-x-hidden"
          aria-hidden
        >
          <GlowOrb className="-left-32 top-[0%] size-[min(520px,90vw)] bg-violet-500/15" />
          <GlowOrb className="-right-24 top-[10%] size-[min(480px,85vw)] bg-indigo-500/18" />
          <GlowOrb className="left-1/2 top-[26%] size-[min(640px,110vw)] -translate-x-1/2 bg-blue-500/16" />
          <GlowOrb className="-left-36 top-[40%] size-[min(500px,88vw)] bg-violet-400/14" />
          <GlowOrb className="-right-28 top-[46%] size-[min(460px,82vw)] bg-blue-400/11" />
          <GlowOrb className="-right-20 top-[56%] size-[min(500px,85vw)] bg-indigo-500/13" />
          <GlowOrb className="left-1/2 top-[70%] size-[min(620px,105vw)] -translate-x-1/2 bg-violet-500/10" />
          <GlowOrb className="-left-28 top-[84%] size-[min(480px,85vw)] bg-violet-500/18" />
          <GlowOrb className="-right-24 top-[80%] size-[min(440px,80vw)] bg-indigo-500/15" />
        </div>

        <div className="relative z-10 [&>section]:bg-transparent!">
          <HeroSection />
          <ReadingExperience />
          <KPnovelExample />
          <HowItWorks />
          <WeeklyWinner />
        </div>
      </div>

      <StartReadingToday />
      <Footer />
    </>
  );
}
