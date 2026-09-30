import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solène — Skin Atelier | Premium Skincare Salon",
  description:
    "Solène is a botanical skin atelier in Portland offering bespoke facials, barrier repair rituals, and derma-grade treatments. Book a complimentary consultation with our master estheticians.",
  keywords: [
    "skincare salon",
    "luxury facial",
    "botanical skincare",
    "skin atelier",
    "barrier repair",
    "esthetician Portland",
    "Solène",
    "premium facial",
  ],
  authors: [{ name: "Solène Skin Atelier" }],
  openGraph: {
    title: "Solène — Skin Atelier",
    description:
      "A botanical skin atelier. Bespoke facials, barrier rituals, and derma-grade treatments kissed by the sun.",
    url: "https://skincarebeauty.space-z.ai/",
    siteName: "Solène Skin Atelier",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solène — Skin Atelier",
    description:
      "A botanical skin atelier. Bespoke facials and derma-grade treatments kissed by the sun.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
