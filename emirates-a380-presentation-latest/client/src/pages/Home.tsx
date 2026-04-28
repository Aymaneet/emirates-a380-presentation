import { useEffect, useState, type ReactNode } from "react";
import Scene from "@/components/Scene";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, ShieldCheck, UserCheck, Utensils, HeartPulse } from "lucide-react";

type SlideItem = {
  key: string;
  number: string;
  label: string;
};

const slideItems: SlideItem[] = [
  { key: "intro", number: "01", label: "Intro" },
  { key: "overview", number: "02", label: "Aircraft" },
  { key: "cabin", number: "03", label: "Cabin" },
  { key: "safety", number: "04", label: "Safety" },
  { key: "medical", number: "05", label: "Medical" },
  { key: "image", number: "06", label: "Image" },
  { key: "service", number: "07", label: "Service" },
  { key: "thanks", number: "08", label: "Thank You" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState("intro");

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  useEffect(() => {
    const updateActiveSlide = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-slide-key]"));
      if (!sections.length) {
        return;
      }

      const viewportCenter = window.innerHeight * 0.5;
      let closestKey = sections[0].dataset.slideKey ?? "intro";
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestKey = section.dataset.slideKey ?? closestKey;
        }
      });

      setActiveSlide(closestKey);
    };

    updateActiveSlide();
    window.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      window.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Scene scrollProgress={progress} />
      <ProgressIndicator activeSlide={activeSlide} />

      <section
        data-slide-key="intro"
        className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center"
      >
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
          <Badge className="mb-6 border-none bg-gold px-6 py-2 text-xs uppercase tracking-[0.3em] text-white shadow-lg hover:bg-gold/90">
            Emirates Cabin Crew
          </Badge>
          <h1 className="mb-6 text-6xl font-serif leading-tight text-black drop-shadow-[0_3px_18px_rgba(255,255,255,0.9)] md:text-9xl">
            Airbus A380
            <br />
            <span className="text-gold italic drop-shadow-[0_3px_14px_rgba(255,255,255,0.75)]">Giant of the Skies</span>
          </h1>
          <p className="mb-8 text-xl font-black uppercase tracking-[0.5em] text-primary drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
            Created by Aymane
          </p>
          <p className="mx-auto max-w-2xl text-xl font-medium tracking-wide text-black/75 drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] md:text-2xl">
            The world’s largest passenger aircraft. Experience luxury and safety at 40,000 feet.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16"
          >
            <div className="mx-auto h-24 w-px bg-gradient-to-b from-gold to-transparent" />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.5em] text-gold drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
              Scroll to Begin
            </p>
          </motion.div>
        </motion.div>
      </section>

      <div className="relative z-10 space-y-[40vh] pb-[28vh]">
        <Section
          slideKey="overview"
          slideNumber="02"
          title="Aircraft Overview"
          subtitle="Aviation Masterpiece"
          icon={<Plane className="h-10 w-10 stroke-[1.5] text-gold" />}
          facts={["Length: 72.7 m", "Wingspan: 79.8 m", "Range: 15,000 km"]}
          source="Source: Airbus A380 program data"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Engineering"
                text="The Airbus A380 is the world's only twin-deck, four-engine passenger jet and a masterpiece of aviation engineering. With a wingspan of 79.8 meters and a maximum takeoff weight of 575 tonnes, it provides 40% more space than a Boeing 747."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Efficiency & Range"
                text="Despite its massive size, the aircraft is highly efficient, consuming less than 3 liters of fuel per passenger per 100 kilometers. With a range of 15,000 kilometers, it connects global hubs like Dubai to Los Angeles at Mach 0.85."
              />
            </AnimatedFrame>
          </div>
        </Section>

        <Section
          slideKey="cabin"
          slideNumber="03"
          title="Cabin & Luxury"
          subtitle="Premium Configuration"
          icon={<Utensils className="h-10 w-10 stroke-[1.5] text-gold" />}
          align="right"
          facts={["14 First Class Suites", "76 Business seats", "427 Economy seats"]}
          source="Source: Emirates A380 cabin configuration"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Upper Deck"
                text="Emirates’ A380 features a premium three-class configuration designed for ultimate comfort. The upper deck houses 14 First Class Private Suites with signature Shower Spas and 76 Business Class lie-flat seats with direct aisle access."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Main Deck"
                text="The aircraft accommodates 427 Economy Class passengers who enjoy enhanced legroom and the award-winning 'ice' entertainment system. The cabin features advanced air management systems and LED mood lighting."
              />
            </AnimatedFrame>
          </div>
        </Section>

        <Section
          slideKey="safety"
          slideNumber="04"
          title="Safety Standards"
          subtitle="Absolute Priority"
          icon={<ShieldCheck className="h-10 w-10 stroke-[1.5] text-gold" />}
          facts={["16 emergency exits", "Annual recurrent training", "Multiple backup systems"]}
          source="Source: Emirates crew safety procedures"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Rigorous Checks"
                text="Safety is the absolute priority for every Emirates flight, supported by advanced redundant systems. Before every departure, cabin crew perform rigorous checks of the 16 emergency exits, life vests, and oxygen systems."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Fire Risk Management"
                text="To combat fire risks, the A380 is equipped with Halon fire extinguishers and sophisticated smoke detectors in all zones. Crew members undergo annual recurrent training to ensure they can operate all equipment instinctively."
              />
            </AnimatedFrame>
          </div>
        </Section>

        <Section
          slideKey="medical"
          slideNumber="05"
          title="Medical Equipment"
          subtitle="Advanced Care"
          icon={<HeartPulse className="h-10 w-10 stroke-[1.5] text-gold" />}
          align="right"
          facts={["AED onboard", "Emergency Medical Kit", "Ground doctor support"]}
          source="Source: Standard long-haul onboard medical support"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Onboard Resources"
                text="The A380 is equipped with medical resources that exceed standard regulatory requirements. This includes Automated External Defibrillators (AEDs) for cardiac emergencies and physician-level Emergency Medical Kits (EMKs)."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Satellite Consultation"
                text="A key feature is its satellite communication system, which allows cabin crew to consult with medical professionals on the ground in real-time. This ensures optimal care by transmitting vital patient data during a flight."
              />
            </AnimatedFrame>
          </div>
        </Section>

        <Section
          slideKey="image"
          slideNumber="06"
          title="The Emirates Image"
          subtitle="Global Luxury Symbol"
          icon={<UserCheck className="h-10 w-10 stroke-[1.5] text-gold" />}
          facts={["Iconic red hat", "7 scarf folds", "Luxury brand identity"]}
          source="Source: Emirates brand presentation standards"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Signature Uniform"
                text="The Emirates uniform is a global symbol of luxury. The signature red pillbox hat and white silk scarf are the most recognizable elements; the scarf features seven precise folds representing the seven Emirates of the UAE."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Grooming Standards"
                text="Crew members must maintain impeccable grooming, including the signature red lipstick for women and neatly trimmed hair for men. Every garment must be perfectly pressed and shoes polished to a high shine."
              />
            </AnimatedFrame>
          </div>
        </Section>

        <Section
          slideKey="service"
          slideNumber="07"
          title="Service Excellence"
          subtitle="UAE Hospitality"
          icon={<BadgeCheck className="h-10 w-10 stroke-[1.5] text-gold" />}
          align="right"
          facts={["Fly Better philosophy", "World-class presentation", "Confidence through service"]}
          source="Source: Emirates service and hospitality messaging"
        >
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <AnimatedFrame index={0}>
              <SpecCard
                label="Fly Better Philosophy"
                text="The 'Fly Better' philosophy is the foundation of the Emirates experience, focusing on excellence in both service and presentation. Crew members act as ambassadors of UAE hospitality, building passenger confidence."
              />
            </AnimatedFrame>
            <AnimatedFrame index={1}>
              <SpecCard
                label="Premium Experience"
                text="By following strict daily grooming checklists and maintaining uniforms with care, the crew ensures every interaction is world-class. When the crew looks their best, they provide the premium experience passengers expect."
              />
            </AnimatedFrame>
          </div>
        </Section>
      </div>

      <ThankYouSection />
    </div>
  );
}

function ProgressIndicator({ activeSlide }: { activeSlide: string }) {
  const activeIndex = Math.max(
    0,
    slideItems.findIndex((item) => item.key === activeSlide),
  );
  const currentSlide = slideItems[activeIndex] ?? slideItems[0];

  return (
    <div className="pointer-events-none fixed right-8 top-1/2 z-20 hidden -translate-y-1/2 lg:flex 2xl:right-10">
      <div
        className="w-[112px] rounded-[2rem] border border-gold/20 bg-white/72 px-3.5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        data-testid="status-slide-progress"
      >
        <div className="mb-3 flex items-start justify-between gap-3 border-b border-gold/15 pb-3">
          <div className="min-w-0">
            <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-gold/80">Slide</p>
            <p className="mt-1 truncate text-xs font-semibold text-foreground/80">{currentSlide.label}</p>
          </div>
          <p className="text-[28px] font-serif leading-none text-gold">{currentSlide.number}</p>
        </div>
        <div className="space-y-2.5">
          {slideItems.map((item, index) => {
            const isActive = item.key === activeSlide;

            return (
              <div key={item.key} className="flex items-center gap-2.5">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${isActive ? "w-7 bg-primary shadow-[0_0_18px_rgba(163,20,47,0.35)]" : "w-2 bg-gold/35"}`}
                />
                <span className={`text-[9px] uppercase tracking-[0.24em] transition-colors duration-300 ${isActive ? "font-semibold text-primary" : "text-foreground/40"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Section({
  slideKey,
  slideNumber,
  title,
  subtitle,
  icon,
  children,
  align = "left",
  facts,
  source,
}: {
  slideKey: string;
  slideNumber: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  facts: string[];
  source: string;
}) {
  return (
    <motion.section
      data-slide-key={slideKey}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`container mx-auto px-6 ${align === "right" ? "flex flex-col items-end text-right" : "text-left"}`}
    >
      <div className={`mb-6 flex items-center gap-6 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
        <div className="rounded-full bg-gold/10 p-5 ring-2 ring-gold/30 shadow-inner">{icon}</div>
        <div>
          <div className={`flex items-center gap-4 ${align === "right" ? "justify-end" : "justify-start"}`}>
            <span className="rounded-full border border-gold/25 bg-white/70 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-gold shadow-sm backdrop-blur-sm">
              Slide {slideNumber}
            </span>
            <h3 className="text-xl font-black uppercase tracking-[0.4em] text-gold drop-shadow-sm">{title}</h3>
          </div>
          <h2 className="mt-3 text-6xl font-serif leading-tight text-foreground md:text-9xl">{subtitle}</h2>
        </div>
      </div>
      <div className="w-full">{children}</div>
      <FactsStrip align={align} facts={facts} source={source} />
    </motion.section>
  );
}

function FactsStrip({ align, facts, source }: { align: "left" | "right"; facts: string[]; source: string }) {
  return (
    <div className={`mt-8 flex flex-col gap-4 ${align === "right" ? "items-end" : "items-start"}`}>
      <div className={`flex flex-wrap gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {facts.map((fact) => (
          <span
            key={fact}
            className="rounded-full border border-gold/20 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/70 shadow-sm backdrop-blur-md"
          >
            {fact}
          </span>
        ))}
      </div>
      <p
        className={`text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/45 ${align === "right" ? "text-right" : "text-left"}`}
        data-testid={`text-source-${source.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      >
        {source}
      </p>
    </div>
  );
}

function ThankYouSection() {
  return (
    <section
      data-slide-key="thanks"
      className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, margin: "-120px" }}
        className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-gold/20 bg-white/80 p-10 text-center shadow-[0_40px_120px_rgba(0,0,0,0.14)] backdrop-blur-2xl md:p-16"
      >
        <div className="mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="text-xs font-bold uppercase tracking-[0.55em] text-gold" data-testid="text-thankyou-overline">
          Emirates A380 Presentation
        </p>
        <h2 className="mt-8 text-6xl font-serif leading-none text-foreground md:text-[9rem]" data-testid="text-thankyou-title">
          Thank You
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-2xl" data-testid="text-thankyou-message">
          Thank you for exploring the elegance, safety, and service excellence of the Emirates A380.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.5em] text-primary" data-testid="text-thankyou-qa">
            Any Questions?
          </p>
          <p className="text-lg font-semibold uppercase tracking-[0.35em] text-gold" data-testid="text-thankyou-credit">
            Created by Aymane
          </p>
        </div>
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-gold" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="h-2.5 w-2.5 rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedFrame({ children, index }: { children: ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.2,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function SpecCard({ label, text }: { label: string; text: string }) {
  return (
    <Card className="h-full border-2 border-gold/40 bg-white/80 backdrop-blur-xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-2xl">
      <CardContent className="flex h-full flex-col px-10 pb-10 pt-10">
        <div className="mb-8 h-1.5 w-12 shrink-0 bg-gold" />
        <h4 className="mb-6 shrink-0 text-lg font-bold uppercase tracking-[0.2em] text-gold drop-shadow-sm">{label}</h4>
        <p className="grow text-xl font-medium leading-relaxed text-foreground md:text-2xl">{text}</p>
      </CardContent>
    </Card>
  );
}

function BadgeCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
