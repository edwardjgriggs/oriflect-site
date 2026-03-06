"use client";

import { useReveal } from "@/lib/useReveal";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a free 30-minute conversation to understand your business, pain points, and goals. No pressure, no jargon — just clarity on where AI can make a real difference.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M4 20V8a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4v-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="10" cy="13" r="1" fill="currentColor" />
        <circle cx="14" cy="13" r="1" fill="currentColor" />
        <circle cx="18" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Custom AI Plan",
    description:
      "We map your workflows, identify the highest-impact opportunities, and create a tailored action plan with clear timelines, costs, and expected outcomes.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Implementation & Results",
    description:
      "We build, deploy, and optimize your AI solutions — then measure the impact. You get working tools, trained teams, and measurable business outcomes.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M4 22l6-8 4 4 6-8 4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="5" r="3" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const revealRef = useReveal();

  return (
    <section id="process" className="py-20 md:py-28 bg-white">
      <div ref={revealRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            A simple, transparent process designed to move fast without cutting
            corners.
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-gold via-ember to-gold" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} relative text-center`}
            >
              <div className="relative z-10 w-14 h-14 mx-auto mb-6 rounded-2xl bg-sapphire-900 text-gold flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              <span className="text-gold font-bold text-sm tracking-widest mb-2 block">
                STEP {step.number}
              </span>
              <h3 className="text-xl font-bold text-sapphire-900 mb-3">
                {step.title}
              </h3>
              <p className="text-charcoal/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
