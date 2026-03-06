"use client";

import { useReveal } from "@/lib/useReveal";
import { useCounter } from "@/lib/useCounter";

function HeroCounter({
  end,
  suffix,
  prefix,
  label,
}: {
  end: number;
  suffix: string;
  prefix?: string;
  label: string;
}) {
  const { ref, count } = useCounter(end, 2000);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-3xl md:text-4xl font-bold text-white">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-white/60 text-sm mt-1 block">{label}</span>
    </div>
  );
}

export default function Hero() {
  const revealRef = useReveal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sapphire-900">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sapphire-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-sapphire-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sapphire-950/50 to-transparent" />
      </div>

      <div ref={revealRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="reveal">
          <p className="text-gold font-medium text-sm md:text-base tracking-widest uppercase mb-6">
            AI Consulting for Modern Businesses
          </p>
        </div>
        <h1 className="reveal reveal-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          How Can AI Benefit{" "}
          <span className="gradient-text">Your Company?</span>
        </h1>
        <p className="reveal reveal-delay-2 text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          We help businesses discover practical AI opportunities, implement
          proven solutions, and achieve measurable results. Illuminate what is
          possible. Amplify what works.
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="bg-ember hover:bg-ember-dark text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-ember/30 hover:-translate-y-0.5"
          >
            Book Discovery Call
          </a>
          <a
            href="#services"
            className="border-2 border-white/20 hover:border-gold/50 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:bg-white/5"
          >
            Explore Services
          </a>
        </div>

        <div className="reveal reveal-delay-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-3xl mx-auto">
          <HeroCounter end={40} suffix="%" label="Time Saved" />
          <HeroCounter end={8} suffix="x" prefix="3–" label="ROI" />
          <HeroCounter end={60} suffix="%" label="Cost Reduction" />
          <HeroCounter end={10} suffix="x" label="Faster" />
        </div>
      </div>
    </section>
  );
}
