"use client";

import { useReveal } from "@/lib/useReveal";

const services = [
  {
    title: "AI Discovery Audit",
    price: "$500\u2013$2K",
    description:
      "A comprehensive assessment of your current operations to identify high-impact AI opportunities tailored to your business goals.",
    features: [
      "Business process analysis",
      "AI opportunity mapping",
      "ROI projection report",
      "Technology stack review",
      "Executive summary & roadmap",
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.3" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    featured: false,
  },
  {
    title: "AI Implementation",
    price: "$2K\u2013$10K",
    description:
      "End-to-end design, development, and deployment of AI solutions built around your specific workflows and team.",
    features: [
      "Custom AI solution design",
      "Workflow automation setup",
      "Team training & onboarding",
      "Integration with existing tools",
      "Performance benchmarking",
      "30-day post-launch support",
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 15l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    featured: true,
  },
  {
    title: "Ongoing AI Partnership",
    price: "$500\u2013$3.5K/mo",
    description:
      "A retained advisory partnership with continuous optimization, monitoring, and strategic AI guidance for your growing business.",
    features: [
      "Monthly strategy sessions",
      "Continuous optimization",
      "Priority support access",
      "New use case identification",
      "Performance reporting",
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 16c0-2-1-4-3-4s-3 2-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 10v6l4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    featured: false,
  },
];

export default function Services() {
  const revealRef = useReveal();

  return (
    <section id="services" className="py-20 md:py-28 bg-ivory">
      <div ref={revealRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            Services Built for{" "}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Whether you are exploring AI for the first time or ready to scale,
            we meet you where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${i + 1} flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                service.featured
                  ? "bg-sapphire-900 text-white shadow-xl ring-2 ring-gold/30 md:scale-[1.02]"
                  : "bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              {service.featured && (
                <div className="inline-block self-start bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
                  Most Popular
                </div>
              )}
              <div
                className={`mb-4 ${
                  service.featured ? "text-gold" : "text-sapphire-900"
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p
                className={`text-2xl font-bold mb-4 ${
                  service.featured ? "text-gold" : "gradient-text"
                }`}
              >
                {service.price}
              </p>
              <p
                className={`mb-6 leading-relaxed ${
                  service.featured ? "text-white/70" : "text-charcoal/60"
                }`}
              >
                {service.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 mt-0.5 shrink-0 text-gold"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        service.featured ? "text-white/80" : "text-charcoal/70"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-auto block text-center font-semibold py-3.5 rounded-xl transition-all ${
                  service.featured
                    ? "bg-gold hover:bg-gold-dark text-white hover:shadow-lg hover:shadow-gold/25"
                    : "bg-sapphire-900 hover:bg-sapphire-800 text-white hover:shadow-lg"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
