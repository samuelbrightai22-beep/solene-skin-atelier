"use client";

import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-px bg-background overflow-hidden"
    >
      {/* Image layer */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: "url('/salon/hero.png')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 pt-32 lg:pt-44 pb-20 lg:pb-32 min-h-[92vh] flex flex-col">
        {/* Eyebrow */}
        <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-foreground/70">
            <span className="inline-block h-px w-10 bg-accent" />
            <span>Portland · est. 2018</span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2">
              <Star className="h-3 w-3 text-accent fill-accent" />
              <Star className="h-3 w-3 text-accent fill-accent" />
              <Star className="h-3 w-3 text-accent fill-accent" />
              <Star className="h-3 w-3 text-accent fill-accent" />
              <Star className="h-3 w-3 text-accent fill-accent" />
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[3.5rem] leading-[0.95] sm:text-[5rem] lg:text-[7rem] xl:text-[8.5rem] text-foreground mt-6 max-w-5xl tracking-[-0.02em] animate-rise"
          style={{ animationDelay: "0.2s" }}
        >
          Skin,{" "}
          <span className="italic font-editorial text-accent/90">considered</span>
          .
        </h1>

        <p
          className="mt-8 max-w-xl text-base lg:text-lg text-foreground/75 leading-relaxed animate-rise"
          style={{ animationDelay: "0.4s" }}
        >
          A botanical skin atelier in the heart of Mississippi Avenue. Bespoke
          facials, derma-grade resurfacing, and slow skincare rituals — written
          by master estheticians, made for the life your skin actually lives.
        </p>

        {/* CTA row */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-rise"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#booking"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all shadow-warm"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#treatments"
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-foreground/30 bg-background/40 backdrop-blur-md text-foreground px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] font-medium hover:border-foreground/60 hover:bg-background/70 transition-all"
          >
            Explore Treatments
          </a>
        </div>

        {/* Stats / proof */}
        <div
          className="mt-auto pt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-foreground/15 max-w-3xl animate-rise"
          style={{ animationDelay: "0.85s" }}
        >
          <Stat figure="2018" label="Year opened" />
          <Stat figure="50k+" label="Rituals performed" />
          <Stat figure="4.9 / 5" label="From 1,538 reviews" />
          <Stat figure="3" label="Master estheticians" />
        </div>
      </div>
    </section>
  );
}

function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="pt-6">
      <p className="font-display text-2xl lg:text-3xl text-foreground">{figure}</p>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/60">
        {label}
      </p>
    </div>
  );
}
