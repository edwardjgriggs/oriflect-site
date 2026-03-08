"use client";

import { useReveal } from "@/lib/useReveal";
import { useCounter } from "@/lib/useCounter";

function ResultCounter({
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
  const { ref, count } = useCounter(end, 2500);
  return (
    <div className="text-center reveal">
      <span
        ref={ref}
        className="block text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
      >
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="text-white/60 text-sm md:text-base">{label}</span>
    </div>
  );
}

export default function Results() {
  const revealRef = useReveal();

  return (
    <section id="results" className="relative overflow-hidden">
      {/* Top gradient bridge from white to sapphire */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-white via-white/40 to-sapphire-900" />

      <div className="relative bg-sapphire-900 py-16 md:py-24">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-sapphire-700/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div ref={revealRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
              Proven Impact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Results That <span className="gradient-text">Speak</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              These are the kinds of outcomes our clients can expect when AI is
              implemented thoughtfully.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <ResultCounter end={20} suffix="+" label="Hours/Week Saved" />
            <ResultCounter end={350} suffix="%" label="Avg ROI" />
            <ResultCounter end={85} suffix="%" label="Error Reduction" />
            <ResultCounter end={3} suffix="x" label="Faster Decisions" />
          </div>
        </div>
      </div>

      {/* Bottom gradient bridge from sapphire to ivory */}
      <div className="h-20 md:h-28 bg-gradient-to-b from-sapphire-900 via-sapphire-900/40 to-ivory" />
    </section>
  );
}
