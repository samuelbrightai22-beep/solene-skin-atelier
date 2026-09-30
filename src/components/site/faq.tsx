"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { faqs } from "./data";

export function Faq() {
  return (
    <section className="relative bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
            <span className="inline-block h-px w-10 bg-accent" />
            <span>Before you ask</span>
            <span className="inline-block h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em]">
            The questions we get most.
          </h2>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto leading-relaxed">
            If your question isn't here, write to{" "}
            <a
              href="mailto:care@soleneatelier.com"
              className="link-reveal text-foreground hover:text-accent"
            >
              care@soleneatelier.com
            </a>
            . Léa or Jules usually replies within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3 hidden lg:block">
            <HelpCircle className="h-12 w-12 text-accent/20" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We keep this page honest — if a question is asked more than
              three times a week, it goes here.
            </p>
          </div>
          <div className="lg:col-span-9">
            <Accordion
              type="single"
              collapsible
              defaultValue="first-visit"
              className="border-t border-border"
            >
              {faqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left font-display text-xl lg:text-2xl text-foreground hover:text-accent transition-colors py-6 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-6 pr-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
