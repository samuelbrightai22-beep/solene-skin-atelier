"use client";

import { menuCategories } from "./data";

export function Menu() {
  return (
    <section
      id="menu"
      className="relative bg-primary text-primary-foreground py-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>The Treatment Menu</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
              The full atelier menu, in plain ink.
            </h2>
          </div>
          <div className="lg:col-span-5 flex lg:items-end lg:justify-end">
            <p className="text-primary-foreground/70 max-w-md leading-relaxed text-sm lg:text-base">
              No tiered memberships required to see prices. We believe a
              treatment menu should be honest, public, and slow — read it like
              a wine list, not a checkout page.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {menuCategories.map((cat) => (
            <div
              key={cat.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6"
            >
              <div className="lg:col-span-3">
                <h3 className="font-display text-3xl lg:text-4xl tracking-[-0.01em] text-accent">
                  {cat.title}
                </h3>
                <p className="mt-3 text-sm text-primary-foreground/65 leading-relaxed max-w-xs">
                  {cat.caption}
                </p>
              </div>
              <div className="lg:col-span-9">
                <ul className="divide-y divide-primary-foreground/15">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="group grid grid-cols-12 gap-3 py-5 hover:bg-primary-foreground/[0.04] transition-colors px-2 -mx-2 rounded-sm"
                    >
                      <div className="col-span-12 sm:col-span-8">
                        <p className="font-display text-xl text-primary-foreground">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-primary-foreground/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-2 text-[0.7rem] uppercase tracking-[0.18em] text-primary-foreground/55 self-center">
                        {item.duration}
                      </div>
                      <div className="col-span-6 sm:col-span-2 font-display text-2xl text-primary-foreground text-right self-center">
                        {item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mt-16 pt-10 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-primary-foreground/65 max-w-lg leading-relaxed">
            All first-time clients receive a complimentary 15-minute phone
            consultation prior to booking. Members of the Seasonal Ritual plan
            receive 15% off all add-ons and retail.
          </p>
          <a
            href="#booking"
            className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-7 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] font-medium hover:bg-accent/90 transition-all shadow-warm whitespace-nowrap"
          >
            Reserve your seat
          </a>
        </div>
      </div>
    </section>
  );
}
