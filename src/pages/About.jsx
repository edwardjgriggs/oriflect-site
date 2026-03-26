import { Link } from 'react-router-dom'
import headshot from '../assets/headshot.png'

const values = [
  {
    icon: 'payments',
    title: 'ROI-First',
    desc: "Every recommendation is backed by projected returns. We do not suggest AI for the sake of AI.",
  },
  {
    icon: 'visibility',
    title: 'Transparency',
    desc: 'Clear pricing, honest timelines, no hidden fees. You always know where you stand.',
  },
  {
    icon: 'hub',
    title: 'SMB-Native',
    desc: 'Our solutions are sized and priced for businesses with 5-200 employees, not enterprise leftovers.',
  },
  {
    icon: 'handshake',
    title: 'Partnership',
    desc: "We walk alongside you from audit through implementation to training. One team, the whole journey.",
  },
]

const milestones = [
  { year: '2020', event: 'Founded after 5+ years in enterprise AI consulting' },
  { year: '2021', event: 'First SMB client achieves 28% operational cost reduction' },
  { year: '2022', event: 'Expanded to serve 20+ businesses across 8 industries' },
  { year: '2023', event: 'Launched AI Discovery Audit methodology' },
  { year: '2024', event: 'Oriflect AI Implementation practice formally established' },
]

export default function About() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-center px-8 py-24"
        style={{
          background: 'radial-gradient(circle at top right, rgba(233, 193, 118, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(233, 193, 118, 0.05), transparent 40%)',
        }}
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <span className="font-label text-primary uppercase tracking-[0.3em] text-xs mb-6 block">
                The Intelligence Architect
              </span>
              <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-on-surface mb-8">
                About <span className="text-primary italic">Oriflect</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
                AI consulting built for businesses like yours.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#dce2f8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </section>

      {/* Founder Section */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-container">
                <img
                  src={headshot}
                  alt="Edward Griggs, Founder & Chief Architect"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 p-8 bg-surface/90 backdrop-blur-md w-full border-t border-outline-variant/20">
                  <h3 className="font-headline text-2xl font-bold text-primary">Edward Griggs</h3>
                  <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-1">
                    Founder & AI Consultant
                  </p>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="flex flex-col justify-center">
              <div className="w-12 h-[2px] bg-primary mb-8" />
              <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-6">
                Minding the Gap
              </h2>
              <div className="space-y-6 text-on-surface-variant font-body text-lg leading-relaxed">
                <p>
                  After years working in technology and artificial intelligence, one pattern
                  became impossible to ignore: while large enterprises were racing ahead with
                  dedicated AI teams and seven-figure budgets, small and medium businesses
                  were left watching from the sidelines.
                </p>
                <p>
                  The tools existed. The potential was there. But without a guide who
                  understood both the technology and the reality of running a lean operation,
                  most business owners had no clear path forward. That gap between what AI
                  could do and what SMBs could actually access felt wrong.
                </p>
                <p>
                  That realization became the spark behind Oriflect. The goal was simple:
                  bring the same caliber of AI strategy and implementation that Fortune 500
                  companies enjoy to businesses with 5 to 200 employees — at a price that
                  makes sense and with results you can measure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-8 py-32 bg-surface">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-4 border-l-2 border-primary pl-8 pb-4">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Our North Star</h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-headline text-4xl md:text-5xl font-light leading-tight text-on-surface">
              To make artificial intelligence{' '}
              <span className="text-primary font-bold">accessible, practical, and profitable</span>{' '}
              for small and medium businesses — delivering real ROI without the enterprise price tag or the industry jargon.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-16">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-outline-variant/30 hidden md:block" />
            <div className="space-y-0">
              {milestones.map(({ year, event }, i) => (
                <div key={year} className="flex flex-col md:flex-row gap-8 group">
                  <div className="md:w-32 flex-shrink-0 relative">
                    <div className="hidden md:block absolute -right-2 top-6 w-4 h-4 border border-primary bg-surface group-hover:bg-primary transition-colors" />
                    <span className="font-headline text-2xl font-bold text-primary">{year}</span>
                  </div>
                  <div className={`pb-12 md:pl-12 ${i < milestones.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                    <p className="text-on-surface-variant leading-relaxed pt-1 group-hover:text-on-surface transition-colors">
                      {event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-8 py-24 bg-surface-container-lowest">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-14">
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs block mb-2">
              What We Stand For
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface">
              Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface-container p-10 hover:bg-surface-container-high transition-colors duration-300 flex flex-col justify-between min-h-[300px] ghost-border"
              >
                <span className="material-symbols-outlined text-primary text-4xl">{icon}</span>
                <div>
                  <h4 className="font-headline text-xl font-bold text-on-surface mb-3">{title}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-32 bg-surface">
        <div className="max-w-5xl mx-auto text-center border border-outline-variant/30 py-24 px-8 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-on-surface mb-8">
            Let's Talk About Your AI Journey
          </h2>
          <p className="font-body text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Every great transformation starts with a conversation. Let us learn about
            your business and show you what is possible.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-10 py-5 font-label font-bold text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all group"
          >
            Book a Discovery Call
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
