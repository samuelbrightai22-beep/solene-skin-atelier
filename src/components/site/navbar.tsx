"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { navLinks } from "./data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2"
            aria-label="Solène Skin Atelier home"
          >
            <span className="font-display text-xl lg:text-2xl tracking-tight text-foreground">
              Solène
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground -ml-1 pt-1">
              Skin Atelier
            </span>
          </a>

          {/* Center nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-reveal text-[0.85rem] uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              className="hidden lg:inline-flex items-center justify-center h-9 w-9 rounded-full text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              className="hidden lg:inline-flex items-center justify-center h-9 w-9 rounded-full text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </button>
            <a
              href="#booking"
              className="hidden sm:inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all shadow-warm"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-foreground hover:bg-secondary/60 transition"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <nav
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background border-l border-border shadow-warm-lg p-8 flex flex-col transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display text-2xl">Solène</span>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary transition"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-foreground py-3 border-b border-border/60 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-8 flex flex-col gap-3">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center items-center rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-[0.75rem] uppercase tracking-[0.2em] font-medium"
            >
              Book a Consultation
            </a>
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-muted-foreground">
              <span>Portland, OR</span>
              <span aria-hidden>·</span>
              <a href="tel:+15035550100" className="link-reveal">
                +1 (503) 555-0100
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
