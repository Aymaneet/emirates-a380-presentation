import { useEffect, useState } from "react";
import Scene from "@/components/Scene";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, ShieldCheck, UserCheck, Utensils, HeartPulse, Wind } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* 3D Background */}
      <Scene scrollProgress={progress} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
          <Badge className="mb-6 bg-gold text-white hover:bg-gold/90 border-none px-6 py-2 text-xs tracking-[0.3em] uppercase shadow-lg">
            Emirates Cabin Crew
          </Badge>
          <h1 className="text-6xl md:text-9xl font-serif mb-6 leading-tight text-black drop-shadow-[0_3px_18px_rgba(255,255,255,0.9)]">
            Airbus A380<br />
            <span className="text-gold italic drop-shadow-[0_3px_14px_rgba(255,255,255,0.75)]">Giant of the Skies</span>
          </h1>
          <p className="text-xl tracking-[0.5em] uppercase text-primary font-black mb-8 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">Created by Aymane</p>
          <p className="text-xl md:text-2xl text-black/75 max-w-2xl mx-auto font-sans font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]">
            The world’s largest passenger aircraft. Experience luxury and safety at 40,000 feet.
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16"
          >
            <div className="w-px h-24 bg-gradient-to-b from-gold to-transparent mx-auto" />
            <p className="text-[10px] tracking-[0.5em] uppercase text-gold mt-4 font-bold drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">Scroll to Begin</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 space-y-[40vh] pb-[40vh]">
        
        {/* Slide 1: Aircraft Overview */}
        <Section 
          title="Aircraft Overview" 
          subtitle="Aviation Masterpiece"
          icon={<Plane className="w-10 h-10 text-gold stroke-[1.5]" />}
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

        {/* Slide 2: Cabin & Luxury */}
        <Section 
          title="Cabin & Luxury" 
          subtitle="Premium Configuration"
          icon={<Utensils className="w-10 h-10 text-gold stroke-[1.5]" />}
          align="right"
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

        {/* Slide 3: Safety Standards */}
        <Section 
          title="Safety Standards" 
          subtitle="Absolute Priority"
          icon={<ShieldCheck className="w-10 h-10 text-gold stroke-[1.5]" />}
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

        {/* Slide 4: Medical Equipment */}
        <Section 
          title="Medical Equipment" 
          subtitle="Advanced Care"
          icon={<HeartPulse className="w-10 h-10 text-gold stroke-[1.5]" />}
          align="right"
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

        {/* Slide 5: The Emirates Image */}
        <Section 
          title="The Emirates Image" 
          subtitle="Global Luxury Symbol"
          icon={<UserCheck className="w-10 h-10 text-gold stroke-[1.5]" />}
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

        {/* Slide 6: Service Excellence */}
        <Section 
          title="Service Excellence" 
          subtitle="UAE Hospitality"
          icon={<BadgeCheck className="w-10 h-10 text-gold stroke-[1.5]" />}
          align="right"
        >
          <div className="grid md:grid-cols-2 gap-8 mt-16">
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

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-gold/10 text-center bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-gold" />
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-[0.4em] font-bold">
            Emirates Cabin Crew Training — <span className="text-gold">Class 2026</span>
          </p>
          <p className="mt-2 text-[10px] text-gold tracking-[0.3em] font-bold uppercase">Created by Aymane</p>
          <p className="mt-4 text-[10px] text-muted-foreground/60 font-medium">FLY BETTER</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, subtitle, icon, children, align = "left" }: any) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`container mx-auto px-6 ${align === "right" ? "text-right flex flex-col items-end" : "text-left"}`}
    >
      <div className={`flex items-center gap-6 mb-6 ${align === "right" ? "flex-row-reverse" : "flex-row"}`}>
        <div className="p-5 bg-gold/10 rounded-full ring-2 ring-gold/30 shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="text-gold uppercase tracking-[0.4em] text-xl font-black drop-shadow-sm">{title}</h3>
          <h2 className="text-6xl md:text-9xl font-serif mt-2 text-foreground leading-tight">{subtitle}</h2>
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </motion.section>
  );
}

function AnimatedFrame({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut", 
        delay: index * 0.2 // 200ms stagger
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function SpecCard({ label, text }: { label: string; text: string }) {
  return (
    <Card className="bg-white/80 backdrop-blur-xl border-gold/40 hover:border-gold/60 transition-all duration-500 hover:-translate-y-2 shadow-md hover:shadow-2xl h-full border-2">
      <CardContent className="pt-10 pb-10 px-10 flex flex-col h-full">
        <div className="w-12 h-1.5 bg-gold mb-8 shrink-0" />
        <h4 className="text-gold font-bold mb-6 uppercase tracking-[0.2em] text-lg shrink-0 drop-shadow-sm">{label}</h4>
        <p className="text-xl md:text-2xl leading-relaxed text-foreground font-medium grow">{text}</p>
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