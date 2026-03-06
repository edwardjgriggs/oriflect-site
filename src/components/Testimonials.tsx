"use client";

import { useReveal } from "@/lib/useReveal";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Future Client",
    company: "Operations Director",
    quote:
      "Oriflect didn't just give us a report — they gave us a clear path forward. Within weeks, we had AI automating processes we'd been doing manually for years. The ROI was immediate.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Future Client",
    company: "CEO, Growth-Stage Startup",
    quote:
      "What sets Oriflect apart is their honesty. They told us which AI ideas wouldn't work and focused our budget on the ones that would. That kind of integrity is rare in consulting.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "Future Client",
    company: "VP of Strategy",
    quote:
      "The ongoing partnership model has been a game-changer. Having an AI advisor on call who understands our business means we can move fast without second-guessing our decisions.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-gold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const revealRef = useReveal();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={revealRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            What Clients <span className="gradient-text">Will Say</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            We are building a track record of meaningful partnerships.
            Here is what our future clients can expect.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} bg-ivory rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
            >
              <Stars count={t.rating} />
              <p className="text-charcoal/70 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sapphire-900 flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sapphire-900 text-sm">
                    {t.name}
                  </p>
                  <p className="text-charcoal/50 text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
