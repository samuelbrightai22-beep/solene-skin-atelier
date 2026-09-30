"use client";

import { ArrowRight, Clock, Plus } from "lucide-react";
import { treatments } from "./data";

export function Treatments() {
  return (
    <section
      id="treatments"
      className="relative bg-secondary/40 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>Signature Treatments</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em]">
              Rituals, written for your skin.
            </h2>
          </div>
          <p className="text-foreground/70 max-w-md leading-relaxed">
            Each treatment begins with an intake and is shaped to the life
            your skin is living that day. Prices are starting points — your
            esthetician may layer in actives based on what they see.
          </p>
        </div>

        {/* Featured (first ritual, large) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <FeaturedTreatment treatment={treatments[0]} />
        </div>

        {/* Remaining treatments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.slice(1).map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all shadow-warm"
          >
            View Full Treatment Menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#booking"
            className="link-reveal text-[0.78rem] uppercase tracking-[0.2em] text-foreground/80 hover:text-foreground"
          >
            or book directly →
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedTreatment({ treatment }: { treatment: (typeof treatments)[0] }) {
  return (
    <article className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 bg-card rounded-sm overflow-hidden shadow-warm border border-border/50">
      <div className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {treatment.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] uppercase tracking-[0.2em] bg-background/85 backdrop-blur-md text-foreground rounded-full px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
        {treatment.ritual && (
          <div className="absolute bottom-5 right-5">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] bg-accent text-accent-foreground rounded-full px-3 py-1.5">
              House Ritual
            </span>
          </div>
        )}
      </div>
      <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
        <p className="eyebrow">{treatment.subtitle}</p>
        <h3 className="mt-3 font-display text-3xl lg:text-4xl text-foreground tracking-[-0.01em]">
          {treatment.name}
        </h3>
        <p className="mt-4 text-foreground/70 leading-relaxed">
          {treatment.description}
        </p>
        <div className="mt-7 flex items-center gap-5">
          <div className="flex items-center gap-2 text-foreground/70 text-sm">
            <Clock className="h-4 w-4 text-accent" />
            <span>{treatment.duration}</span>
          </div>
          <span className="h-4 w-px bg-border" aria-hidden />
          <span className="font-display text-2xl text-foreground">
            {treatment.price}
          </span>
        </div>
        <a
          href="#booking"
          className="group mt-8 inline-flex items-center gap-3 self-start rounded-full bg-primary text-primary-foreground px-6 py-3 text-[0.75rem] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all"
        >
          Reserve this ritual
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

function TreatmentCard({ treatment }: { treatment: (typeof treatments)[0] }) {
  return (
    <article className="group bg-card rounded-sm overflow-hidden border border-border/50 hover:shadow-warm-lg transition-all duration-500 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {treatment.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="text-[0.6rem] uppercase tracking-[0.2em] bg-background/85 backdrop-blur-md text-foreground rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#booking"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-label={`Book ${treatment.name}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-md text-foreground px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em]">
            Book this treatment
            <Plus className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow text-[0.65rem]">{treatment.subtitle}</p>
        <h3 className="mt-2 font-display text-2xl text-foreground tracking-[-0.01em]">
          {treatment.name}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {treatment.description}
        </p>
        <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>{treatment.duration}</span>
          </div>
          <span className="font-display text-xl text-foreground">
            {treatment.price}
          </span>
        </div>
      </div>
    </article>
  );
}
