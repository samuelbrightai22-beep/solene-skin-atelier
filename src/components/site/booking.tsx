"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Check,
  Loader2,
} from "lucide-react";
import { treatments } from "./data";

const specialists = ["No preference", "Léa Park", "Dr. Marinë Okafor", "Jules Tanaka"];

const timeSlots = [
  "10:00",
  "11:30",
  "13:00",
  "14:30",
  "16:00",
  "17:30",
];

export function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Simulate a slow API call (this is a static preview site)
    await new Promise((r) => setTimeout(r, 1200));

    setSubmitting(false);
    setDone(true);
    toast.success("Request received", {
      description: `We'll email ${data.email} within 24 hours to confirm.`,
    });
    form.reset();
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section
      id="booking"
      className="relative bg-primary text-primary-foreground py-20 lg:py-32"
    >
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 bg-grain opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: Copy + contact details */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              <span className="inline-block h-px w-10 bg-accent" />
              <span>Reserve your seat</span>
            </div>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
              Begin a slow skincare practice.
            </h2>
            <p className="mt-6 text-primary-foreground/70 leading-relaxed text-base lg:text-lg max-w-md">
              Send a request below and our front-of-house will reply within
              24 hours to confirm a time, suggest a specialist, and share your
              pre-visit card. No deposit required to enquire.
            </p>

            {/* Contact details */}
            <div className="mt-10 pt-10 border-t border-primary-foreground/15 space-y-4">
              <ContactRow
                icon={MapPin}
                title="The Atelier"
                lines={["2427 N Mississippi Ave", "Portland, OR 97227"]}
              />
              <ContactRow
                icon={Phone}
                title="By phone"
                lines={["+1 (503) 555-0100", "Tue–Sat, 9am–7pm"]}
                href="tel:+15035550100"
              />
              <ContactRow
                icon={Mail}
                title="By email"
                lines={["care@soleneatelier.com"]}
                href="mailto:care@soleneatelier.com"
              />
              <ContactRow
                icon={Clock}
                title="Open hours"
                lines={["Tue–Fri 10–7", "Sat 9–6", "Sun-Mon closed"]}
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="bg-background text-foreground rounded-sm p-7 lg:p-10 shadow-warm-lg grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <Field label="Full name" htmlFor="name" required>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground placeholder:text-muted-foreground/60"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" htmlFor="email" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground placeholder:text-muted-foreground/60"
                  placeholder="you@email.com"
                />
              </Field>

              <Field label="Phone" htmlFor="phone" required>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground placeholder:text-muted-foreground/60"
                  placeholder="+1 (503) 555-0000"
                />
              </Field>

              <Field label="Preferred date" htmlFor="date" required>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground placeholder:text-muted-foreground/60"
                />
              </Field>

              <Field label="Treatment" htmlFor="treatment" required>
                <select
                  id="treatment"
                  name="treatment"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select a treatment
                  </option>
                  {treatments.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} — {t.price}
                    </option>
                  ))}
                  <option value="consultation">
                    Complimentary consultation
                  </option>
                  <option value="not-sure">I'm not sure — recommend one</option>
                </select>
              </Field>

              <Field label="Specialist" htmlFor="specialist">
                <select
                  id="specialist"
                  name="specialist"
                  defaultValue="No preference"
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground appearance-none cursor-pointer"
                >
                  {specialists.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Preferred time"
                htmlFor="time"
                className="sm:col-span-2"
              >
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-1">
                  {timeSlots.map((slot) => (
                    <label
                      key={slot}
                      className="cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        className="peer sr-only"
                        required
                      />
                      <span className="block text-center text-[0.7rem] uppercase tracking-[0.15em] py-2 border border-border rounded-sm peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:border-accent transition-colors">
                        {slot}
                      </span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field
                label="Notes (skin concerns, allergies, occasion)"
                htmlFor="notes"
                className="sm:col-span-2"
              >
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="w-full bg-transparent border-b border-border focus:border-accent transition-colors py-2 outline-none text-foreground placeholder:text-muted-foreground/60 resize-none"
                  placeholder="Tell us what your skin has been up to..."
                />
              </Field>

              <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                <p className="text-[0.7rem] text-muted-foreground leading-relaxed max-w-md">
                  By submitting you agree to our 48-hour cancellation policy.
                  We'll never share your details.
                </p>
                <button
                  type="submit"
                  disabled={submitting || done}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 text-[0.78rem] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all shadow-warm disabled:opacity-70 whitespace-nowrap"
                >
                  {submitting && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending request
                    </>
                  )}
                  {done && (
                    <>
                      <Check className="h-4 w-4" />
                      Request received
                    </>
                  )}
                  {!submitting && !done && (
                    <>
                      <Calendar className="h-4 w-4" />
                      Request booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-foreground/10 text-accent flex-shrink-0">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-primary-foreground/55">
          {title}
        </p>
        {lines.map((l, i) => (
          <p
            key={l}
            className={`text-sm text-primary-foreground/90 ${
              i > 0 ? "text-primary-foreground/65" : ""
            }`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
