import { Link } from 'react-router-dom'

const stats = [
  { value: '20%+', label: 'Avg. Hours Saved' },
  { value: '< 90d', label: 'Time to First ROI' },
  { value: '100%', label: 'SMB-Focused' },
]

const services = [
  {
    icon: 'analytics',
    title: 'AI Discovery Audit',
    desc: 'A comprehensive 360° diagnostic identifying high-impact AI opportunities within your existing workflow architecture.',
    link: '/services',
    span: 'md:col-span-8',
    bg: 'bg-surface-container',
  },
  {
    icon: 'memory',
    title: 'AI Implementation',
    desc: 'Bespoke automation and tool integration built for your specific operations. Real workflows, real results.',
    link: '/services',
    span: 'md:col-span-4',
    bg: 'bg-surface-container-low',
  },
  {
    icon: 'school',
    title: 'Staff Training',
    desc: 'Ensuring the "Reflected" light stays on by empowering your team to own and extend every solution.',
    link: '/services',
    span: 'md:col-span-4',
    bg: 'bg-surface-container-low',
  },
  {
    icon: 'trending_up',
    title: 'Strategic Roadmapping',
    desc: 'A prioritized AI roadmap aligned with your growth goals—so you know exactly what to build, and when.',
    link: '/services',
    span: 'md:col-span-8',
    bg: 'bg-surface-container',
  },
]

const reasons = [
  {
    num: '01.',
    title: 'ROI-First',
    desc: 'We don\'t implement technology for novelty. If it doesn\'t impact the bottom line, it doesn\'t belong in your stack.',
  },
  {
    num: '02.',
    title: 'Transparent',
    desc: 'No black boxes. We explain the "why" behind every algorithm and the "how" of every implementation.',
  },
  {
    num: '03.',
    title: 'SMB-Native',
    desc: 'Strategies built for the agility and constraints of mid-market businesses, not bloated corporate structures.',
  },
]

export default function Home() {
  return (
    <div className="pt-[72px]">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-start px-8 md:px-24 overflow-hidden grid-bg">
        {/* Left gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10" />

        {/* Background image */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-40 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGV5WZ2N2-FNsxzgI8IU_UGexpa5W-I4Fbx3BD3VsKedcv6iYZKLkPZ0BbTiEtGn18XZcRo2_A1Dpl46lXxvW_TTSYor6DjFcgT98kuIQ3KLFkqf2NrjIeqG5n0R3qb7HaLi7hsHSvPpyInctszSGX97WP2JxjmhcxQ851xX1C09O8sbPUB5O-vOpM7JrUECWcnVHqnZ0A5Fn_faLRpw2bQRBfuomxkxmZPyuggmI_4-pTCt9dnW2jGunO12EXyvlbuErCFeD-M6FW"
            alt="Abstract digital neural network"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-primary" />
            <span className="font-label text-primary uppercase tracking-[0.3em] text-xs">
              AI Consulting for SMBs
            </span>
          </div>

          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-on-surface leading-[0.9] mb-8">
            Intelligence <br /> Architected <br />
            <span className="text-primary">for Your Business.</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant font-light max-w-2xl mb-12 leading-relaxed">
            Oriflect empowers small and medium-sized businesses with enterprise-grade AI—
            custom automations, strategic roadmaps, and hands-on training that drive real ROI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="bg-primary text-on-primary px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all text-center"
            >
              Book a Discovery Call
            </Link>
            <Link
              to="/services"
              className="border border-outline-variant text-on-surface px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:bg-surface-container transition-all text-center"
            >
              View Our Services
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-label text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[1px] h-10 bg-outline-variant" />
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-surface-container-lowest border-y border-outline-variant/10 py-10 px-8 md:px-24">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-around gap-8 md:gap-0">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center md:items-start">
              <span className="font-headline text-4xl font-bold text-primary tracking-tighter">
                {value}
              </span>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services Bento ── */}
      <section className="py-32 px-8 md:px-24 bg-surface-container-lowest">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20">
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs">
              Core Services
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mt-4 text-on-surface">
              Precision-Engineered <br /> AI Solutions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-1 bg-outline-variant/20">
            {services.map(({ icon, title, desc, link, span, bg }) => (
              <div
                key={title}
                className={`${span} ${bg} p-10 md:p-12 group hover:bg-surface-container-high transition-colors`}
              >
                <div className="flex flex-col h-full justify-between min-h-[240px]">
                  <span className="material-symbols-outlined text-primary text-4xl mb-10">
                    {icon}
                  </span>
                  <div>
                    <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4 text-on-surface">
                      {title}
                    </h3>
                    <p className="text-on-surface-variant max-w-md mb-8 text-sm leading-relaxed">
                      {desc}
                    </p>
                    <Link
                      to={link}
                      className="font-label text-primary uppercase tracking-widest text-xs flex items-center gap-2 group-hover:gap-4 transition-all"
                    >
                      Learn More{' '}
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Oriflect ── */}
      <section className="py-32 px-8 md:px-24 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs">
              The Oriflect Standard
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mt-4 leading-tight text-on-surface">
              Built on Trust. Delivered with Precision.
            </h2>
            <p className="mt-6 text-on-surface-variant leading-relaxed text-sm">
              We don't just build models; we build the infrastructure of consequence.
              Our systems are designed to keep working long after we hand them over.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 font-label text-primary uppercase tracking-widest text-xs group"
            >
              Our Story{' '}
              <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-12">
            {reasons.map(({ num, title, desc }) => (
              <div key={num} className="space-y-4">
                <div className="text-primary text-4xl font-headline font-light tracking-tighter">
                  {num}
                </div>
                <h4 className="font-headline text-lg font-bold uppercase tracking-widest text-on-surface">
                  {title}
                </h4>
                <p className="text-on-surface-variant text-sm leading-loose">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CTA ── */}
      <section className="py-20 px-8 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs block mb-2">
              New Tool
            </span>
            <h3 className="font-headline text-3xl font-bold text-on-surface">
              Calculate Your AI ROI
            </h3>
            <p className="text-on-surface-variant text-sm mt-2 max-w-md">
              See exactly how much time and money AI automation could save your business.
            </p>
          </div>
          <Link
            to="/roi"
            className="flex-shrink-0 bg-primary text-on-primary px-10 py-4 font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all"
          >
            Try the Calculator →
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 px-8 text-center bg-surface relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-on-surface">
            Ready to close the <br />
            <span className="text-primary">AI Gap?</span>
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Partner with the Intelligence Architect for your SMB. Schedule a discovery call
            with our team today.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-on-primary px-12 py-5 font-label font-bold uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-95 transition-all"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
