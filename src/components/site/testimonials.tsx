"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "./data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="relative bg-secondary/40 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left column - static text */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>Loved by 50,000+</span>
            </div>
            <h2 className="mt-5 font-display text-4xl lg:text-5xl text-foreground leading-[1.05] tracking-[-0.01em]">
              Slow skincare, real reviews.
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed text-sm lg:text-base">
              We don't pay for endorsements. We don't run a referral program.
              Every review below is unsolicited — and each one is the result of
              months of consistent practice, not a single one-off service.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-accent fill-accent"
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/70">
                4.9 · 1,538 verified reviews
              </span>
            </div>
          </div>

          {/* Right column - rotating testimonial */}
          <div className="lg:col-span-8">
            <div className="relative bg-card border border-border/60 rounded-sm p-8 lg:p-12 shadow-warm">
              {/* Decorative quote mark */}
              <span
                aria-hidden
                className="absolute top-6 right-8 font-display text-7xl text-accent/20 leading-none select-none"
              >
                &rdquo;
              </span>

              <div className="relative">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
                <blockquote
                  key={t.id}
                  className="font-display text-2xl lg:text-3xl text-foreground leading-[1.3] tracking-[-0.01em] animate-rise"
                >
                  {t.quote}
                </blockquote>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-foreground">
                      {t.author}
                    </p>
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                      {t.detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                    <button
                      onClick={next}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
