import { Announcement, TrustBar } from "@/components/site/announcement";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Philosophy } from "@/components/site/philosophy";
import { Treatments } from "@/components/site/treatments";
import { Method } from "@/components/site/method";
import { Menu } from "@/components/site/menu";
import { Specialists } from "@/components/site/specialists";
import { Testimonials } from "@/components/site/testimonials";
import { Journal } from "@/components/site/journal";
import { Booking } from "@/components/site/booking";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Announcement />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Philosophy />
        <Treatments />
        <Method />
        <Menu />
        <Specialists />
        <Testimonials />
        <Journal />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
