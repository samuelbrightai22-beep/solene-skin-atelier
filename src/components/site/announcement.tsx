"use client";

import { Sparkles, Truck, RefreshCw, Headphones } from "lucide-react";

const messages = [
  "Complimentary 15-min skin consultation for new guests",
  "Members of the Seasonal Ritual plan receive priority booking",
  "New: After-Sun Rescue treatment for sun-stressed summer skin",
  "Free shipping on retail orders over $75",
  "30-day returns on unopened skincare, no questions asked",
];

export function Announcement() {
  const items = [...messages, ...messages];
  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="flex items-center gap-12 py-2.5 whitespace-nowrap animate-marquee">
        {items.map((msg, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em]"
          >
            <Sparkles className="h-3 w-3 text-accent" />
            <span>{msg}</span>
            <span className="text-accent ml-12" aria-hidden>
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  const items = [
    { icon: Truck, title: "Free shipping", caption: "On retail orders over $75" },
    { icon: RefreshCw, title: "30-day returns", caption: "Unopened products only" },
    { icon: Headphones, title: "Online support", caption: "Reply within 24 hrs" },
    { icon: Sparkles, title: "Flexible payment", caption: "Members pay over time" },
  ];
  return (
    <div className="border-b border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 lg:py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
          {items.map((it) => (
            <div key={it.title} className="flex items-center gap-3">
              <it.icon className="h-5 w-5 text-accent flex-shrink-0" />
              <div>
                <p className="text-[0.8rem] font-medium text-foreground">
                  {it.title}
                </p>
                <p className="text-[0.7rem] text-muted-foreground hidden sm:block">
                  {it.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
