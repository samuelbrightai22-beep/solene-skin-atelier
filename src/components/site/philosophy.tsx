"use client";

import { ArrowUpRight } from "lucide-react";

export function Philosophy() {
  return (
    <section className="relative bg-background py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-warm-lg">
              <img
                src="/salon/botanicals.png"
                alt="Botanical skincare ingredients: calendula, sea buckthorn, and rosehip on white marble"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10" />
              {/* Caption chip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-background/90 bg-foreground/40 backdrop-blur-md rounded-full px-3 py-1.5">
                  Cold-pressed in-house
                </p>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>The Atelier</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05] tracking-[-0.01em] max-w-2xl">
              We read the skin before we touch it.
            </h2>
            <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed max-w-2xl">
              <p>
                Solène is not a conveyor belt of facials. Your first visit
                opens with a 15-minute intake — sleep, stress, sun, the
                products already on your shelf — and only then does your
                esthetician begin to design the session. The result is a
                treatment that fits the life your skin is living this week,
                not the one the brochure was written for.
              </p>
              <p>
                Our products are pressed cold, in our own small-batch lab in
                the back of the atelier, from botanicals grown by farmers we
                know by name. We do not stock anything we would not put on
                our own faces on a Tuesday. We do not promise miracles — we
                promise a slow, honest practice and a brighter, calmer
                complexion over weeks, not minutes.
              </p>
            </div>

            {/* Values row */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 max-w-2xl">
              <Value
                title="Botanical, not synthetic"
                copy="Cold-pressed, small-batch, traceable to the farm."
              />
              <Value
                title="Slow, not aggressive"
                copy="Skin heals on a 28-day cycle — we honor that rhythm."
              />
              <Value
                title="Honest, not aspirational"
                copy="If your $30 moisturizer is working, we'll tell you."
              />
              <Value
                title="Local, not outsourced"
                copy="Everything we use is pressed in our own atelier."
              />
            </div>

            <a
              href="#method"
              className="group mt-10 inline-flex items-center gap-2 text-[0.85rem] uppercase tracking-[0.18em] text-foreground hover:text-accent transition-colors"
            >
              Read the Solène Method
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Value({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="border-l border-accent/40 pl-4">
      <p className="font-display text-base text-foreground">{title}</p>
      <p className="mt-1 text-[0.78rem] text-muted-foreground leading-relaxed">
        {copy}
      </p>
    </div>
  );
}
