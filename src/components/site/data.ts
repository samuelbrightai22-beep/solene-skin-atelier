export type Treatment = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  tags: string[];
  ritual?: boolean;
};

export type Specialist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  credentials: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  detail: string;
  rating: number;
};

export type JournalEntry = {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type MenuItem = {
  name: string;
  description: string;
  duration: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  caption: string;
  items: MenuItem[];
};

export const treatments: Treatment[] = [
  {
    id: "signature-botanical-facial",
    name: "The Solène Ritual",
    subtitle: "90 min signature botanical facial",
    description:
      "A bespoke facial choreographed to your skin's mood on the day. Begins with a double-cleanse under warm steam, a lymphatic sculpting massage, our cold-pressed botanical serum cocktail, and finishes with a weighted amber mask.",
    duration: "90 minutes",
    price: "$220",
    image: "/salon/treatment-facial.png",
    tags: ["Signature", "All skin types"],
    ritual: true,
  },
  {
    id: "barrier-recovery",
    name: "Barrier Recovery",
    subtitle: "Omega-7 repair treatment",
    description:
      "For skin that stings, flushes, or feels tight. A 14-day protocol distilled into a single session: gentle cream cleanse, sea buckthorn barrier serum, squalane seal, and a calming LED finishing veil.",
    duration: "75 minutes",
    price: "$185",
    image: "/salon/treatment-led.png",
    tags: ["Sensitive", "Recovery"],
  },
  {
    id: "gua-sha-sculpt",
    name: "Sculpt & Define",
    subtitle: "Gua sha + buccal massage",
    description:
      "A meditative 60-minute sculpting ritual using rose quartz gua sha and intra-oral buccal release. De-puffs, defines the jaw, and lifts the cheekbones — visible after one session.",
    duration: "60 minutes",
    price: "$165",
    image: "/salon/treatment-massage.png",
    tags: ["Sculpting", "Lymphatic"],
  },
  {
    id: "vitamin-c-glow",
    name: "Vitamin C Glow Infusion",
    subtitle: "Cold-pressed 15% L-ascorbic",
    description:
      "A brightening infusion of cold-pressed 15% L-ascorbic acid, ferulic, and sea buckthorn. Layers beautifully under makeup and reverses the long-shadow of summer sun.",
    duration: "60 minutes",
    price: "$145",
    image: "/salon/botanicals.png",
    tags: ["Brightening", "Anti-oxidant"],
  },
  {
    id: "mineral-sun-treatment",
    name: "After-Sun Rescue",
    subtitle: "Aloe + niacinamide cooling veil",
    description:
      "A 45-minute cool-down for sun-stressed skin: chilled aloe compress, niacinamide mist, and a featherlight squalane seal. Pairs perfectly with a weekend at the coast.",
    duration: "45 minutes",
    price: "$95",
    image: "/salon/interior.png",
    tags: ["After-sun", "Calming"],
  },
  {
    id: "derma-grade-resurfacing",
    name: "Derma-Grade Resurfacing",
    subtitle: "Lactic + mandelic resurfacing",
    description:
      "Our gentlest resurfacing treatment. A 30% lactic + mandelic blend, layered with a hydrating hyaluronic base, for refined texture and luminous tone over the next 7 days.",
    duration: "75 minutes",
    price: "$210",
    image: "/salon/treatment-led.png",
    tags: ["Resurfacing", "Renewal"],
  },
];

export const specialists: Specialist[] = [
  {
    id: "lea-park",
    name: "Léa Park",
    role: "Founder & Master Esthetician",
    bio: "Léa trained at the Estée Lauder Institute in Paris before opening Solène in 2018. Her signature is reading the skin before touching it — a 5-minute intake that shapes the entire session.",
    image: "/salon/specialist-1.png",
    credentials: ["CIDESCO Dipl.", "15 yrs clinical", "Barrier repair specialist"],
  },
  {
    id: "marina-okafor",
    name: "Dr. Marinë Okafor",
    role: "In-house Dermatologist",
    bio: "Dr. Okafor splits her week between Solène and the dermatology faculty at OHSU. She leads our resurfacing and barrier-clinical protocols, and reviews every first-time client's intake.",
    image: "/salon/specialist-2.png",
    credentials: ["MD, Dermatology", "Board-certified", "10 yrs clinical"],
  },
  {
    id: "jules-tanaka",
    name: "Jules Tanaka",
    role: "Senior Esthetician & Gua Sha Lead",
    bio: "Jules apprenticed under a Beijing-trained gua sha master for 3 years before joining Solène. Their sculpting work is slow, intentional, and visibly lifts after a single session.",
    image: "/salon/specialist-3.png",
    credentials: ["NCEA Certified", "Gua sha apprentice", "8 yrs clinical"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "amelia-r",
    quote:
      "I walked in with skin that had been reacting to everything for six months. Léa didn't promise me a miracle — she gave me a 14-day protocol and a follow-up. By week three my barrier was back. I haven't been anywhere else since.",
    author: "Amelia R.",
    detail: "Client since 2022",
    rating: 5,
  },
  {
    id: "sofia-m",
    quote:
      "The Solène Ritual is the only 90 minutes a month I protect with my life. The room smells like calendula and warm linen. I leave with my face slightly flushed and a kind of calm I can't buy anywhere else.",
    author: "Sofia M.",
    detail: "Monthly Ritual member",
    rating: 5,
  },
  {
    id: "noor-k",
    quote:
      "I came for one facial before my wedding and ended up booking the full bridal package. Jules's gua sha work on my jawline was unreal — the photographs don't lie.",
    author: "Noor K.",
    detail: "Bridal Ritual client",
    rating: 5,
  },
  {
    id: "theodora-l",
    quote:
      "Dr. Okafor is the first derm who didn't try to sell me a $200 cream. She told me to use less, hydrate more, and come back in 6 weeks. Honest, slow, and exactly what my skin needed.",
    author: "Theodora L.",
    detail: "Clinical client",
    rating: 5,
  },
];

export const journal: JournalEntry[] = [
  {
    id: "vitamin-c-myth",
    category: "Ingredients",
    readTime: "6 min read",
    title: "The Vitamin C Serum Myth (and what actually brightens skin)",
    excerpt:
      "Most vitamin C serums oxidize before they reach your face. Here's how to spot a stable formula — and what to expect from a real one.",
    author: "Dr. Marinë Okafor",
    date: "Sep 12, 2026",
    image: "/salon/botanicals.png",
  },
  {
    id: "barrier-help",
    category: "Rituals",
    readTime: "8 min read",
    title: "Your skin barrier is asking for help. Here's how to listen.",
    excerpt:
      "Tightness, stinging, dullness — these aren't signs of aging. They're signs of a compromised barrier. Here's the 14-day protocol to fix it.",
    author: "Léa Park",
    date: "Aug 28, 2026",
    image: "/salon/treatment-led.png",
  },
  {
    id: "every-day-spf",
    category: "Sun",
    readTime: "5 min read",
    title: "Yes, you need SPF every day. Even in winter. Even indoors.",
    excerpt:
      "The single most effective anti-aging intervention isn't a $200 cream — it's daily sun protection. Here's why you can't skip it.",
    author: "Dr. Marinë Okafor",
    date: "Aug 14, 2026",
    image: "/salon/interior.png",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "first-visit",
    question: "What happens at my first visit?",
    answer:
      "Your first appointment begins with a 15-minute intake: we map your current routine, your concerns, and the life your skin has been living (sleep, stress, sun, products). Your esthetician will then design your facial in real time — there's no one-size-fits-all menu here. We'll send you home with a written aftercare card and, if helpful, a slow, low-product starter ritual.",
  },
  {
    id: "cancel-policy",
    question: "What is your cancellation policy?",
    answer:
      "We hold the room, the products, and the time, so we ask for 48 hours' notice for any reschedule. Cancellations within 24 hours are charged at 50% of the service. Same-day cancellations and no-shows are charged in full. Members of our Seasonal Ritual plan receive one complimentary grace cancellation per quarter.",
  },
  {
    id: "pregnancy-safe",
    question: "Are the treatments safe during pregnancy?",
    answer:
      "Yes — the majority of our menu is pregnancy-safe, and we have a dedicated Pregnancy Ritual pathway that excludes resurfacing acids, retinoids, and high-frequency tools. Please mention your trimester in the booking notes so we can pair you with the right esthetician (Léa and Jules are both pre-natal certified).",
  },
  {
    id: "products-used",
    question: "What products do you use?",
    answer:
      "Our in-atelier line is Solène Botanics — cold-pressed botanical actives that we developed in-house over four years. We are happy to layer in your existing skincare (bring your serum, we'll tell you honestly if it's working). We never retail products we don't use on ourselves.",
  },
  {
    id: "membership",
    question: "Do you offer memberships?",
    answer:
      "Yes. The Seasonal Ritual membership is $180/month and includes one signature facial of your choice (any value up to $220), 15% off all add-ons and retail, priority booking, and one grace cancellation per quarter. It's designed for clients who treat skincare as a practice, not a one-off.",
  },
  {
    id: "parking",
    question: "Is there parking nearby?",
    answer:
      "We share 4 dedicated spots behind the atelier (enter from Ankeny Street). Street parking on Mississippi is free after 6pm and on weekends. We're a 5-minute walk from the Mississippi / Skidmore MAX station and we have a covered spot for bicycles — bring your lock.",
  },
];

export const menuCategories: MenuCategory[] = [
  {
    id: "facials",
    title: "Facials & Rituals",
    caption: "Bespoke, intake-led. Each session is shaped to your skin on the day.",
    items: [
      {
        name: "The Solène Ritual",
        description: "Signature 90-min botanical facial with sculpting massage.",
        duration: "90 min",
        price: "$220",
      },
      {
        name: "Express Glow Facial",
        description: "Cleanse, exfoliate, mask, seal — for busy Wednesdays.",
        duration: "45 min",
        price: "$110",
      },
      {
        name: "Pregnancy Ritual",
        description: "Pre-natal safe, gentle sculpting, calm LED finish.",
        duration: "75 min",
        price: "$175",
      },
      {
        name: "Bridal Ritual (3 sessions)",
        description: "A 6-week protocol with one wedding-week session.",
        duration: "Bespoke",
        price: "$590",
      },
    ],
  },
  {
    id: "resurfacing",
    title: "Resurfacing & Clinical",
    caption: "Led by Dr. Okafor. By appointment, after intake.",
    items: [
      {
        name: "Derma-Grade Resurfacing",
        description: "Lactic + mandelic blend, hyaluronic base, 7-day glow.",
        duration: "75 min",
        price: "$210",
      },
      {
        name: "Barrier Recovery Treatment",
        description: "Omega-7 serum + calming LED veil for compromised skin.",
        duration: "75 min",
        price: "$185",
      },
      {
        name: "Microneedling Infusion",
        description: "0.5mm channeling with hyaluronic + niacinamide stack.",
        duration: "90 min",
        price: "$295",
      },
    ],
  },
  {
    id: "body",
    title: "Body & Sun",
    caption: "For the parts of you that aren't your face.",
    items: [
      {
        name: "After-Sun Rescue",
        description: "Chilled aloe compress + niacinamide veil + squalane seal.",
        duration: "45 min",
        price: "$95",
      },
      {
        name: "Back Ritual",
        description: "Deep cleanse, gentle resurfacing, calming mask.",
        duration: "60 min",
        price: "$140",
      },
      {
        name: "Shea Botanical Hand Ritual",
        description: "Whipped shea + sea buckthorn, warm mitts.",
        duration: "30 min",
        price: "$60",
      },
    ],
  },
];

export const navLinks = [
  { label: "Treatments", href: "#treatments" },
  { label: "The Method", href: "#method" },
  { label: "Menu", href: "#menu" },
  { label: "Specialists", href: "#specialists" },
  { label: "Journal", href: "#journal" },
  { label: "Visit", href: "#booking" },
];
