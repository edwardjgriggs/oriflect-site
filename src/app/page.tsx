"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated Counter Hook ─── */
function useCounter(end: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return value;
}

/* ─── SVG Icons ─── */
const SearchIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
const CogIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const HandshakeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "#D4A843" : "none"} viewBox="0 0 24 24" stroke="#D4A843" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const MapIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);
const BookIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const AcademicIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);
const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-sapphire rounded-lg flex items-center justify-center">
            <span className="text-gold font-bold text-lg leading-none">O</span>
          </div>
          <span
            className={`font-bold text-xl transition-colors ${
              scrolled ? "text-sapphire" : "text-white"
            }`}
          >
            Oriflect
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? "text-charcoal" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-light transition btn-glow"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block text-charcoal font-medium py-2 hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block text-center bg-gold text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-light transition mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function Hero() {
  const iv = useInView(0.1);
  const c1 = useCounter(40, 2000, iv.visible);
  const c2 = useCounter(8, 2000, iv.visible);
  const c3 = useCounter(60, 2000, iv.visible);
  const c4 = useCounter(10, 2000, iv.visible);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sapphire-900 via-sapphire to-sapphire-800">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-1 absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="orb-2 absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-ember/8 blur-3xl" />
        <div className="orb-3 absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div
        ref={iv.ref}
        className={`relative z-10 max-w-5xl mx-auto px-4 text-center fade-in ${iv.visible ? "visible" : ""}`}
      >
        <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
          AI Consulting &amp; Implementation
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          How Can AI Benefit{" "}
          <span className="gradient-text">Your Company</span>?
        </h1>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          We help businesses unlock AI&apos;s full potential — saving time, cutting costs,
          and driving measurable results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#contact"
            className="bg-gold text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gold-light transition btn-glow"
          >
            Book Discovery Call
          </a>
          <a
            href="#services"
            className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition"
          >
            Explore Services
          </a>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { val: c1, suffix: "%", label: "Time Saved" },
            { val: c2, prefix: "", suffix: "x", extra: "3-", label: "ROI" },
            { val: c3, suffix: "%", label: "Cost Reduction" },
            { val: c4, suffix: "x", label: "Faster" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10"
            >
              <p className="text-3xl lg:text-4xl font-bold text-gold">
                {m.extra ?? ""}
                {m.val}
                {m.suffix}
              </p>
              <p className="text-white/60 text-sm mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
const services = [
  {
    icon: <SearchIcon />,
    title: "AI Discovery Audit",
    price: "$500 – $2,000",
    desc: "We analyze your business processes, tech stack, and goals to uncover high-impact AI opportunities tailored to your needs.",
    features: [
      "Comprehensive business process review",
      "AI opportunity identification",
      "Technology stack assessment",
      "Prioritized recommendation report",
      "30-day action plan",
    ],
    featured: false,
  },
  {
    icon: <CogIcon />,
    title: "AI Implementation",
    price: "$2,000 – $10,000",
    desc: "We build, integrate, and deploy custom AI solutions — from chatbots and automations to intelligent workflows.",
    features: [
      "Custom AI solution development",
      "System integration & API setup",
      "Team training & onboarding",
      "Testing & quality assurance",
      "60-day post-launch support",
    ],
    featured: true,
  },
  {
    icon: <HandshakeIcon />,
    title: "Ongoing AI Partnership",
    price: "$500 – $3,500/mo",
    desc: "Continuous AI optimization, monitoring, and strategy updates to keep your business at the cutting edge.",
    features: [
      "Monthly strategy sessions",
      "Performance monitoring & tuning",
      "New AI feature rollouts",
      "Priority support & troubleshooting",
      "Quarterly ROI reporting",
    ],
    featured: false,
  },
];

function Services() {
  const iv = useInView();
  return (
    <section id="services" className="py-20 lg:py-28 bg-ivory">
      <div
        ref={iv.ref}
        className={`max-w-7xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            Our Services
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            AI Solutions That <span className="gradient-text">Drive Results</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                s.featured
                  ? "bg-sapphire text-white shadow-xl ring-2 ring-gold"
                  : "bg-white text-charcoal shadow-lg"
              }`}
            >
              {s.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  s.featured ? "bg-white/10 text-gold" : "bg-gold/10 text-gold"
                }`}
              >
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{s.title}</h3>
              <p className={`text-2xl font-extrabold mb-4 ${s.featured ? "text-gold" : "gradient-text"}`}>
                {s.price}
              </p>
              <p className={`text-sm mb-6 ${s.featured ? "text-white/70" : "text-charcoal/60"}`}>
                {s.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckIcon />
                    <span className={s.featured ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center font-semibold py-3 rounded-lg transition ${
                  s.featured
                    ? "bg-gold text-white hover:bg-gold-light btn-glow"
                    : "bg-sapphire text-white hover:bg-sapphire-800"
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

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */
function HowItWorks() {
  const iv = useInView();
  const steps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "We start with a free 30-minute call to understand your business, challenges, and goals. No pressure, just clarity.",
    },
    {
      num: "02",
      title: "Custom AI Plan",
      desc: "We create a tailored AI strategy with clear milestones, ROI projections, and a step-by-step implementation roadmap.",
    },
    {
      num: "03",
      title: "Implementation & Results",
      desc: "We build and deploy your AI solutions, train your team, and provide ongoing support to ensure lasting success.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div
        ref={iv.ref}
        className={`max-w-5xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            How It Works
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            Three Steps to <span className="gradient-text">AI Transformation</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-gold via-ember to-gold" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.num} className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-sapphire text-gold font-bold text-lg flex items-center justify-center mx-auto mb-5 ring-4 ring-ivory relative z-10">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {s.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   RESULTS / METRICS
   ═══════════════════════════════════════════ */
function Results() {
  const iv = useInView();
  const c1 = useCounter(20, 2000, iv.visible);
  const c2 = useCounter(350, 2000, iv.visible);
  const c3 = useCounter(85, 2000, iv.visible);
  const c4 = useCounter(3, 2000, iv.visible);

  const metrics = [
    { val: c1, suffix: "+", unit: "Hours/Week Saved", icon: "⏱" },
    { val: c2, suffix: "%", unit: "Average ROI", icon: "📈" },
    { val: c3, suffix: "%", unit: "Error Reduction", icon: "✅" },
    { val: c4, suffix: "x", unit: "Faster Decisions", icon: "⚡" },
  ];

  return (
    <section id="results" className="py-20 lg:py-28 bg-gradient-to-br from-sapphire-900 via-sapphire to-sapphire-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb-2 absolute top-1/4 right-1/6 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      </div>
      <div
        ref={iv.ref}
        className={`max-w-6xl mx-auto px-4 relative z-10 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            Proven Results
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white">
            Numbers That <span className="gradient-text">Speak for Themselves</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.unit}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-300"
            >
              <p className="text-4xl mb-2">{m.icon}</p>
              <p className="text-4xl lg:text-5xl font-extrabold text-gold">
                {m.val}
                {m.suffix}
              </p>
              <p className="text-white/60 text-sm mt-2">{m.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */
function About() {
  const iv = useInView();
  const values = [
    { name: "Illuminate", desc: "We bring clarity to complex AI landscapes" },
    { name: "Serve", desc: "Your success is our mission" },
    { name: "Amplify", desc: "We multiply your team's capabilities" },
    { name: "Guide", desc: "Expert direction at every step" },
    { name: "Integrity", desc: "Honest advice, transparent results" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-ivory">
      <div
        ref={iv.ref}
        className={`max-w-7xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            About Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            The Story Behind <span className="gradient-text">Oriflect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Story */}
          <div>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              The name <strong className="text-charcoal">Oriflect</strong> is born from two powerful
              ideas: <em>Ori</em>, from the Hebrew word meaning &ldquo;my light,&rdquo; and{" "}
              <em>Reflect</em> — to mirror, consider, and shine back. Together, they capture
              our purpose: helping businesses discover their brilliance and reflect it
              outward through the power of AI.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              We believe every business has untapped potential waiting to be illuminated.
              Our role is to serve as the guide — shining a light on opportunities,
              amplifying your strengths, and helping you rise with integrity and purpose.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-charcoal">Our Core Values</h3>
              {values.map((v) => (
                <div key={v.name} className="flex items-start gap-3">
                  <CheckIcon />
                  <div>
                    <span className="font-semibold text-charcoal">{v.name}</span>
                    <span className="text-charcoal/60"> — {v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gold/20">
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="text-xl lg:text-2xl font-semibold text-charcoal leading-relaxed mb-6">
              &ldquo;Helping businesses shine brighter through the power of AI.&rdquo;
            </blockquote>
            <p className="text-charcoal/60 mb-8">
              Our mission is to democratize AI for businesses of all sizes — making
              powerful technology accessible, practical, and transformative.
            </p>
            <div className="border-t border-charcoal/10 pt-6">
              <p className="text-sm text-charcoal/50 italic">
                &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
              </p>
              <p className="text-sm text-gold font-semibold mt-1">
                — Psalm 119:105
              </p>
            </div>
            <div className="mt-6 bg-sapphire/5 rounded-xl p-4 text-center">
              <p className="text-sapphire font-bold text-lg tracking-wide">
                Reflect. Refine. Rise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
function Testimonials() {
  const iv = useInView();
  const testimonials = [
    {
      quote:
        "Oriflect transformed how we handle customer support. Their AI chatbot reduced our response time by 80% and our customers love it.",
      name: "Future Client",
      role: "CEO, Tech Startup",
      rating: 5,
    },
    {
      quote:
        "The ROI was immediate. Within three months, we saved over $15,000 in operational costs thanks to Oriflect's automation solutions.",
      name: "Future Client",
      role: "Operations Director",
      rating: 5,
    },
    {
      quote:
        "Their AI Discovery Audit was eye-opening. We had no idea how many processes could be optimized. The roadmap they provided was incredibly actionable.",
      name: "Future Client",
      role: "Small Business Owner",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div
        ref={iv.ref}
        className={`max-w-7xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            What Our Clients <span className="gradient-text">Will Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-ivory rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p className="text-charcoal/70 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sapphire/10 rounded-full flex items-center justify-center text-sapphire font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">{t.name}</p>
                  <p className="text-charcoal/50 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   DIGITAL PRODUCTS
   ═══════════════════════════════════════════ */
function Products() {
  const iv = useInView();
  const products = [
    {
      icon: <BookIcon />,
      title: "AI Prompt Libraries",
      price: "$47 – $197",
      desc: "Curated prompt collections for marketing, sales, operations, and customer service. Ready to use out of the box.",
    },
    {
      icon: <AcademicIcon />,
      title: "AI Workshops",
      price: "$297 – $997",
      desc: "Live and recorded workshops covering AI strategy, tool selection, prompt engineering, and implementation best practices.",
    },
    {
      icon: <DocumentIcon />,
      title: "Templates & Playbooks",
      price: "$27 – $97",
      desc: "Step-by-step playbooks and templates for AI adoption, workflow automation, and team training.",
    },
    {
      icon: <UsersIcon />,
      title: "Group Coaching",
      price: "$97 – $297/mo",
      desc: "Join a community of business leaders learning to leverage AI together with live Q&A sessions and peer support.",
    },
  ];

  return (
    <section id="products" className="py-20 lg:py-28 bg-ivory">
      <div
        ref={iv.ref}
        className={`max-w-7xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            Digital Products
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            Learn &amp; Grow with <span className="gradient-text">AI Resources</span>
          </h2>
          <p className="mt-4 inline-block bg-ember/10 text-ember font-semibold text-sm px-4 py-2 rounded-full">
            Coming Soon
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-gold/30"
            >
              <div className="w-14 h-14 bg-gold/10 text-gold rounded-xl flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1">{p.title}</h3>
              <p className="text-xl font-extrabold gradient-text mb-3">
                {p.price}
              </p>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════ */
function Contact() {
  const iv = useInView();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    },
    []
  );

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div
        ref={iv.ref}
        className={`max-w-7xl mx-auto px-4 fade-in ${iv.visible ? "visible" : ""}`}
      >
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-wider uppercase text-sm mb-2">
            Get Started
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-charcoal">
            Ready to <span className="gradient-text">Shine Brighter</span>?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — benefits */}
          <div>
            <h3 className="text-2xl font-bold text-charcoal mb-6">
              Book Your Free Discovery Call
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: <PhoneIcon />,
                  title: "Free 30-Minute Call",
                  desc: "No strings attached. Let's talk about your business and explore how AI can help.",
                },
                {
                  icon: <MapIcon />,
                  title: "Custom AI Roadmap",
                  desc: "Walk away with a clear, actionable plan tailored to your specific needs and goals.",
                },
                {
                  icon: <ShieldIcon />,
                  title: "No Obligation",
                  desc: "Zero pressure. We'll give you honest advice whether you work with us or not.",
                },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{b.title}</h4>
                    <p className="text-charcoal/60 text-sm">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-ivory rounded-2xl p-8 shadow-lg">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  Thank You!
                </h3>
                <p className="text-charcoal/60">
                  We&apos;ve received your message and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition text-charcoal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your business and what you're looking to achieve with AI..."
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition resize-none text-charcoal"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ember text-white font-semibold py-3.5 rounded-lg hover:bg-ember/90 transition btn-ember-glow text-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-sapphire-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-sapphire rounded-lg flex items-center justify-center">
                <span className="text-gold font-bold text-lg leading-none">O</span>
              </div>
              <span className="font-bold text-xl">Oriflect</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Helping businesses shine brighter through the power of AI.
              Illuminate. Serve. Amplify. Guide. Integrity.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a href="#services" className="hover:text-gold transition">
                  AI Discovery Audit
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition">
                  AI Implementation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold transition">
                  Ongoing Partnership
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-gold transition">
                  Digital Products
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <a href="#about" className="hover:text-gold transition">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-gold transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-gold transition">
                  Results
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Oriflect. All rights reserved. |{" "}
            <span className="text-gold/60">Reflect. Refine. Rise.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Results />
      <About />
      <Testimonials />
      <Products />
      <Contact />
      <Footer />
    </>
  );
}
