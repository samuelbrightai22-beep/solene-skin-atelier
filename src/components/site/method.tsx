"use client";

import { Stethoscope, MessageSquareHeart, Sparkles, Sun } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: MessageSquareHeart,
    title: "Intake",
    duration: "15 minutes",
    body: "We sit down. No mirrors, no bright lights. Your esthetician asks about sleep, stress, sun, what's on your shelf, and what your skin has been trying to say. We listen, take notes, and only then do we touch the skin.",
  },
  {
    n: "02",
    icon: Stethoscope,
    title: "Diagnosis",
    duration: "10 minutes",
    body: "Under daylight-mimicking lamps we map barrier health, dehydration lines, pigmentation, and pore activity. Dr. Okafor reviews every first-time client's intake in person — a quiet second opinion built into the cost.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Ritual",
    duration: "60-90 minutes",
    body: "The session itself. Warm steam, double-cleanse, sculpting massage, your customized serum cocktail, a weighted amber mask, and a final seal. Slow. Sensory. No screens, no interruptions, no rushed transitions.",
  },
  {
    n: "04",
    icon: Sun,
    title: "Aftercare",
    duration: "Forever",
    body: "You leave with a handwritten aftercare card and a written 4-week ritual — what to use, what to drop, when to come back. We follow up by email on day 14 to ask how the skin is settling. The practice begins, not ends, here.",
  },
];

export function Method() {
  return (
    <section
      id="method"
      className="relative bg-background py-20 lg:py-32 bg-grain"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
            <span className="inline-block h-px w-10 bg-accent" />
            <span>The Solène Method</span>
            <span className="inline-block h-px w-10 bg-accent" />
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em] max-w-3xl mx-auto">
            A slow practice, not a one-off service.
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-foreground/70 leading-relaxed">
            Every Solène session moves through the same four chapters — designed
            to make skincare feel less like an appointment and more like a
            practice you keep.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative bg-card border border-border/60 rounded-sm p-7 lg:p-8 hover:shadow-warm transition-all duration-500"
            >
              {/* Number + Icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl text-accent/40">
                  {s.n}
                </span>
                <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-secondary text-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <p className="eyebrow text-[0.65rem]">{s.duration}</p>
              <h3 className="mt-2 font-display text-2xl text-foreground tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.body}
              </p>
              {/* Decorative line */}
              {i < steps.length - 1 && (
                <span
                  className="hidden lg:block absolute top-1/2 -right-4 h-px w-8 bg-accent/30"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
