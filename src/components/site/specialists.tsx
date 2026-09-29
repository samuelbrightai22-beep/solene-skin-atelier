"use client";

import { specialists } from "./data";

export function Specialists() {
  return (
    <section
      id="specialists"
      className="relative bg-background py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>Meet the Atelier</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em]">
              Hands you can trust with your face.
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:items-end">
            <p className="text-foreground/70 leading-relaxed text-sm lg:text-base max-w-md">
              Our small team has 33 years of combined clinical practice. Every
              first-time intake is reviewed by Dr. Okafor — a quiet second
              opinion is built into the cost of every visit.
            </p>
          </div>
        </div>

        {/* Specialist cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialists.map((s) => (
            <article
              key={s.id}
              className="group bg-card border border-border/60 rounded-sm overflow-hidden hover:shadow-warm-lg transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/40">
                <img
                  src={s.image}
                  alt={`${s.name}, ${s.role} at Solène Skin Atelier`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                  {s.credentials.map((c) => (
                    <span
                      key={c}
                      className="text-[0.6rem] uppercase tracking-[0.2em] bg-background/85 backdrop-blur-md text-foreground rounded-full px-2.5 py-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <p className="eyebrow text-[0.65rem]">{s.role}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground tracking-[-0.01em]">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.bio}
                </p>
                <a
                  href="#booking"
                  className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors link-reveal"
                >
                  Book with {s.name.split(" ")[0]}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
