"use client";

import { ArrowUpRight } from "lucide-react";
import { journal } from "./data";

export function Journal() {
  return (
    <section
      id="journal"
      className="relative bg-background py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>Read, ritual, repeat</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em]">
              The Solène Journal.
            </h2>
          </div>
          <p className="text-foreground/70 max-w-md leading-relaxed text-sm lg:text-base">
            Slow essays on ingredients, rituals, and the science of skin —
            written by our master estheticians and Dr. Okafor. No filler, no
            SEO bait. One post every two weeks.
          </p>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {journal.map((entry, i) => (
            <article
              key={entry.id}
              className={`group bg-card border border-border/60 rounded-sm overflow-hidden hover:shadow-warm-lg transition-all duration-500 ${
                i === 0 ? "lg:row-span-2 flex flex-col" : ""
              }`}
            >
              <a href="#journal" className="block flex-1 flex flex-col">
                <div
                  className={`relative overflow-hidden ${
                    i === 0 ? "aspect-[4/3]" : "aspect-[16/10]"
                  }`}
                >
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] bg-background/85 backdrop-blur-md text-foreground rounded-full px-2.5 py-1">
                      {entry.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{entry.readTime}</span>
                    <span aria-hidden>·</span>
                    <span>{entry.date}</span>
                  </div>
                  <h3
                    className={`mt-3 font-display text-foreground leading-[1.15] tracking-[-0.01em] group-hover:text-accent transition-colors ${
                      i === 0 ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
                    }`}
                  >
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {entry.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between pt-5 border-t border-border/60">
                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-foreground">
                      {entry.author}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="#journal"
            className="group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.18em] text-foreground hover:text-accent transition-colors"
          >
            Read the full journal
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
