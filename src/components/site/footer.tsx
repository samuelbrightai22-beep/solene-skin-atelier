"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Good emails. Better skin.", {
      description: "You're on the list — first letter arrives Thursday.",
    });
    setEmail("");
  };

  return (
    <footer className="relative bg-foreground text-background pt-20 lg:pt-28 pb-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        {/* Newsletter top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-background/15">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent text-[0.7rem]">
              Good emails. Better skin.
            </p>
            <h3 className="mt-3 font-display text-4xl lg:text-5xl tracking-[-0.01em] leading-[1.05]">
              One letter, every other Thursday.
            </h3>
            <p className="mt-4 text-background/70 leading-relaxed max-w-lg">
              A slow read on ingredients, rituals, and the science of skin —
              written by our master estheticians and Dr. Okafor. No filler, no
              SEO bait. Unsubscribe in one click.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:items-end">
            <form
              onSubmit={subscribe}
              className="w-full flex items-center gap-2 border-b border-background/30 focus-within:border-accent transition-colors pb-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-transparent text-background placeholder:text-background/40 outline-none py-2 text-base"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-accent hover:text-background transition-colors py-2"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 py-16">
          <div className="col-span-2 lg:col-span-4">
            <p className="font-display text-3xl text-background">Solène</p>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-background/55 mt-1">
              Skin Atelier
            </p>
            <p className="mt-6 text-sm text-background/65 leading-relaxed max-w-xs">
              A botanical skin atelier in the heart of Mississippi Avenue,
              Portland. Bespoke facials, derma-grade resurfacing, and slow
              skincare rituals — kissed by the sun.
            </p>
            <div className="mt-7 space-y-1.5 text-sm">
              <p className="text-background/70">
                2427 N Mississippi Ave, Portland OR
              </p>
              <a
                href="tel:+15035550100"
                className="block text-background/70 link-reveal"
              >
                +1 (503) 555-0100
              </a>
              <a
                href="mailto:care@soleneatelier.com"
                className="block text-background/70 link-reveal"
              >
                care@soleneatelier.com
              </a>
            </div>
          </div>

          <FooterCol
            title="Shop"
            links={[
              "All products",
              "Face",
              "Body",
              "Hair & Scalp",
              "Sun",
              "Rituals",
            ]}
          />
          <FooterCol
            title="Useful Links"
            links={[
              "New Arrivals",
              "Best Sellers",
              "Bundle & Save",
              "Online Gift Card",
              "Refill Program",
              "Find a Store",
            ]}
          />
          <FooterCol
            title="Information"
            links={[
              "About Solène",
              "Contact Us",
              "FAQ",
              "Shipping & Returns",
              "Careers",
              "Press",
            ]}
          />
          <FooterCol
            title="Atelier"
            links={[
              "Treatments",
              "The Method",
              "Specialists",
              "Journal",
              "Membership",
              "Book a Visit",
            ]}
          />
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-background/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem] uppercase tracking-[0.18em] text-background/55">
            <span>© {new Date().getFullYear()} Solène Skin Atelier</span>
            <a href="#" className="link-reveal hover:text-background">
              Privacy
            </a>
            <a href="#" className="link-reveal hover:text-background">
              Terms
            </a>
            <a href="#" className="link-reveal hover:text-background">
              Accessibility
            </a>
          </div>
          <div className="flex items-center gap-3">
            <SocialIcon href="#" label="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="#" label="Twitter">
              <Twitter className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>

        {/* Bottom credit row */}
        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.22em] text-background/40 text-center">
          Made slowly, in Portland · Cold-pressed in our own atelier
        </p>
        <p className="mt-2 text-[0.6rem] tracking-[0.1em] text-background/30 text-center">
          Photography courtesy of Pexels · Hair &amp; skin by our atelier
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="lg:col-span-2">
      <h4 className="text-[0.65rem] uppercase tracking-[0.28em] text-accent">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-background/70 hover:text-background transition-colors link-reveal"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-background/25 text-background/70 hover:text-background hover:border-accent hover:bg-accent hover:text-foreground transition-all"
    >
      {children}
    </a>
  );
}
