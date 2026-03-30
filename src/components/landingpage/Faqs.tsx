"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    id: "what-is-kpnovel",
    question: "What is KPnovel?",
    answer:
      "KPnovel is a reading app for serialized fiction—chapters, bookmarks, and a library built for long stories. Read on your phone or tablet with a clean, distraction-free experience.",
  },
  {
    id: "free-to-read",
    question: "Is KPnovel free to use?",
    answer:
      "You can explore the app and many stories at no cost. Some titles or premium features may be offered separately—we keep pricing clear inside the app.",
  },
  {
    id: "offline",
    question: "Can I read offline?",
    answer:
      "Offline support depends on the book and your device. Downloaded or cached chapters may be available where the app supports it—check reading settings for your library.",
  },
  {
    id: "writers",
    question: "How do I publish as a writer?",
    answer:
      "Use Join KP Writers in the nav to submit your profile. Our team reviews submissions and will guide you through onboarding, serialization, and reaching readers.",
  },
  {
    id: "devices",
    question: "Which devices are supported?",
    answer:
      "KPnovel is built for mobile-first reading on iOS and Android. Use the Download section for store links and the latest supported versions.",
  },
  {
    id: "account",
    question: "How do I manage my account or data?",
    answer:
      "Open app settings for account details, notifications, and privacy. For data requests or account closure, contact support—we respond during business hours listed in the footer.",
  },
] as const;

function Faqs() {
  return (
    <section
      id="faqs"
      className="bg-transparent px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <Badge
            variant="outline"
            className={cn(
              "mb-4 h-auto gap-1.5 rounded-full border-violet-200 bg-violet-50/90 px-3.5 py-1.5 text-sm font-medium text-violet-900",
              "shadow-sm"
            )}
          >
            <HelpCircle className="size-3.5 text-violet-700" aria-hidden />
            FAQs
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-500 sm:text-lg">
            Quick answers about reading, writers, and the KPnovel app.
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl border border-zinc-200/80 bg-white/90 px-4 py-2 shadow-sm",
            "ring-1 ring-black/5 backdrop-blur-sm sm:px-6 sm:py-3"
          )}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(({ id, question, answer }) => (
              <AccordionItem key={id} value={id} className="border-zinc-200/90">
                <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline sm:text-[1.05rem]">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  <p className="leading-relaxed">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
