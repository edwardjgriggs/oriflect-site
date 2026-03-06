"use client";

import { useReveal } from "@/lib/useReveal";

const values = [
  {
    name: "Illuminate",
    description: "Shining light on possibilities others overlook",
  },
  {
    name: "Serve",
    description: "Your success is our measure of impact",
  },
  {
    name: "Amplify",
    description: "Making what already works, work even better",
  },
  {
    name: "Guide",
    description: "Walking alongside you through every step",
  },
  {
    name: "Integrity",
    description: "Honest counsel, always",
  },
];

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="about" className="py-20 md:py-28 bg-ivory">
      <div ref={revealRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            About <span className="gradient-text">Oriflect</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left side — story */}
          <div className="reveal reveal-delay-1">
            <h3 className="text-2xl font-bold text-sapphire-900 mb-4">
              A Name Rooted in Purpose
            </h3>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              <strong className="text-sapphire-900">Oriflect</strong> is born
              from two ideas: <em>Ori</em>, a Hebrew word meaning &ldquo;my light,&rdquo; and{" "}
              <em>Reflect</em> — the practice of looking inward to move forward.
              Together, they capture what we believe AI consulting should be: a
              light that helps businesses see clearly, reflect on what matters,
              and rise to their full potential.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              We are not here to sell hype or chase trends. We are here to guide
              businesses — practically, honestly, and with deep care — toward AI
              solutions that genuinely work. Every engagement begins with
              listening, proceeds with clarity, and ends with measurable
              outcomes.
            </p>

            <h4 className="text-lg font-bold text-sapphire-900 mb-4">
              Our Values
            </h4>
            <div className="space-y-3">
              {values.map((value) => (
                <div key={value.name} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                  <div>
                    <span className="font-semibold text-sapphire-900">
                      {value.name}
                    </span>
                    <span className="text-charcoal/60"> — {value.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — mission card */}
          <div className="reveal reveal-delay-2">
            <div className="bg-sapphire-900 rounded-2xl p-8 md:p-10 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                    opacity="0.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Our Mission</h4>
              <p className="text-white/80 text-lg leading-relaxed mb-6 italic">
                &ldquo;Helping businesses shine brighter through the power of AI.&rdquo;
              </p>
              <div className="border-t border-white/10 pt-6 mb-6">
                <p className="text-gold font-semibold text-lg mb-2">
                  Reflect. Refine. Rise.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Every business has untapped potential. We help you see it,
                  sharpen it, and scale it — with AI as the catalyst.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-5">
                <p className="text-white/70 text-sm italic leading-relaxed">
                  &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
                </p>
                <p className="text-gold/80 text-xs mt-2 font-medium">
                  — Psalm 119:105
                </p>
                <p className="text-white/40 text-xs mt-1">
                  The inspiration behind our name and our commitment to guiding
                  businesses with clarity and purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
