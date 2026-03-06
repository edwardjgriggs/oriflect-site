"use client";

import { useReveal } from "@/lib/useReveal";

const products = [
  {
    title: "AI Prompt Libraries",
    price: "$47–$197",
    description:
      "Curated prompt collections designed for marketing, operations, customer service, and more. Battle-tested prompts that deliver consistent results.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M4 6h20M4 12h14M4 18h18M4 24h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Workshops",
    price: "$297–$997",
    description:
      "Live and recorded training sessions that teach your team how to leverage AI tools effectively, from beginner fundamentals to advanced automation.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 23h12M14 19v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 10l5 3-5 3V10z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Templates & Playbooks",
    price: "$27–$97",
    description:
      "Ready-to-use frameworks, decision matrices, and implementation playbooks that fast-track your AI adoption journey.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="3" width="18" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M10 9h8M10 13h8M10 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Group Coaching",
    price: "$97–$297/mo",
    description:
      "Monthly group sessions where business leaders learn, share, and strategize around AI implementation in a supportive peer environment.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="22" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24c0-4 4-7 10-7s10 3 10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DigitalProducts() {
  const revealRef = useReveal();

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div ref={revealRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Digital Products
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            Learn & Grow{" "}
            <span className="gradient-text">at Your Pace</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Self-paced resources and live training to build your AI capabilities.
          </p>
          <div className="inline-block mt-4 bg-gold/10 text-gold font-semibold text-sm px-4 py-2 rounded-full">
            Coming Soon
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`reveal reveal-delay-${(i % 4) + 1} bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-sapphire-900/5 text-sapphire-900 flex items-center justify-center mb-4">
                {product.icon}
              </div>
              <h3 className="text-lg font-bold text-sapphire-900 mb-1">
                {product.title}
              </h3>
              <p className="text-gold font-bold mb-3">{product.price}</p>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
