import { Link } from 'react-router-dom'
import { useState } from 'react'

const services = [
  {
    phase: '01',
    tag: 'Start Here',
    title: 'AI Discovery Audit',
    desc: 'A comprehensive 360° technical and strategic diagnostic designed to identify high-impact AI opportunities within your existing workflow architecture.',
    deliverables: [
      'Infrastructure Readiness Report',
      'ROI Projection Matrix',
      'Implementation Roadmap',
      'Prioritized Opportunity List',
    ],
    steps: [
      {
        n: '01',
        title: 'Stakeholder Interviews',
        desc: 'Deep-dive sessions with departmental heads to understand pain points and operational friction.',
      },
      {
        n: '02',
        title: 'Data Integrity Review',
        desc: 'Quantitative analysis of available data silos and quality benchmarks for LLM ingestion.',
      },
      {
        n: '03',
        title: 'Gap Analysis',
        desc: 'Identifying the distance between current capabilities and a future AI-integrated state.',
      },
      {
        n: '04',
        title: 'Final Dossier',
        desc: 'Presentation of the strategic blueprint and prioritized execution list.',
      },
    ],
    panelIcon: 'analytics',
    panelTitle: 'Process Timeline',
    primary: false,
  },
  {
    phase: '02',
    tag: null,
    title: 'AI Implementation',
    desc: 'Transitioning from strategy to production. We build, deploy, and scale custom AI agents and workflows that drive tangible bottom-line results.',
    deliverables: null,
    metrics: [
      { label: 'Avg. Efficiency Gain', value: '30%+' },
      { label: 'Deployment', value: 'Zero Downtime' },
    ],
    steps: [
      {
        n: '01',
        title: 'Custom Model Tuning',
        desc: 'Fine-tuning open-source or proprietary models on your unique corporate dataset.',
      },
      {
        n: '02',
        title: 'API Integration',
        desc: 'Seamlessly embedding AI capabilities into your legacy software stack and ERPs.',
      },
      {
        n: '03',
        title: 'Testing & QA',
        desc: 'Rigorous stress-testing of outputs to ensure safety, alignment, and accuracy.',
      },
    ],
    panelIcon: 'memory',
    panelTitle: 'Deployment Architecture',
    primary: true,
  },
  {
    phase: '03',
    tag: null,
    title: 'Staff Training',
    desc: 'Ensuring the human element keeps pace with the digital. High-level workshops for executives and technical deep-dives for development teams.',
    deliverables: null,
    modules: [
      { num: '01', title: 'AI Literacy Foundations', desc: 'Core concepts of generative AI and its impact on business ecosystems.' },
      { num: '02', title: 'Prompt Engineering', desc: 'Practical workflows for maximizing output quality from large language models.' },
      { num: '03', title: 'Ethics & Compliance', desc: 'Navigating the regulatory landscape and internal AI governance frameworks.' },
      { num: '04', title: 'Future Roadmapping', desc: 'Continuous learning strategies for staying ahead of technological decay.' },
    ],
    panelIcon: 'school',
    panelTitle: 'Educational Framework',
    primary: false,
  },
]

function ServiceSection({ svc, idx }) {
  const isEven = idx % 2 === 1
  return (
    <section
      className={`py-24 px-8 ${
        isEven
          ? 'bg-surface-container-lowest border-y border-outline-variant/5'
          : 'bg-surface'
      }`}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left col — text */}
        <div
          className={`space-y-8 lg:col-span-5 ${
            isEven ? 'order-2 lg:order-2' : 'order-1'
          }`}
        >
          <div className="flex items-center gap-4">
            {svc.tag && (
              <span className="bg-primary text-on-primary font-label font-bold px-3 py-1 text-[10px] uppercase tracking-widest">
                {svc.tag}
              </span>
            )}
            <span className="text-outline-variant font-label text-xs tracking-widest uppercase">
              Phase {svc.phase}
            </span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background uppercase tracking-tight">
            {svc.title}
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">{svc.desc}</p>

          {/* Deliverables */}
          {svc.deliverables && (
            <div className="space-y-4 pt-2">
              <h4 className="font-label text-xs text-primary uppercase tracking-[0.2em]">
                Core Deliverables
              </h4>
              <ul className="space-y-3 font-body text-sm text-on-surface">
                {svc.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics */}
          {svc.metrics && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              {svc.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-6 bg-surface-container border border-outline-variant/10"
                >
                  <h6 className="font-label text-[10px] text-primary uppercase tracking-widest mb-2">
                    {m.label}
                  </h6>
                  <p className="text-on-surface text-xl font-bold tracking-tight">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          <Link
            to="/contact"
            className={`inline-block px-8 py-4 font-label font-bold uppercase tracking-wider text-xs transition-all duration-300 ${
              svc.primary
                ? 'bg-primary text-on-primary hover:brightness-110'
                : 'bg-transparent border border-outline-variant/30 text-on-background hover:border-primary hover:text-primary'
            }`}
          >
            Get a Quote
          </Link>
        </div>

        {/* Right col — detail panel */}
        <div
          className={`lg:col-span-7 bg-surface-container-low p-10 md:p-12 border-primary/20 relative ${
            isEven
              ? 'order-1 lg:order-1 border-r'
              : 'order-2 border-l'
          }`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-5xl md:text-9xl">{svc.panelIcon}</span>
          </div>
          <h3 className="font-label text-xs text-on-surface-variant uppercase tracking-[0.2em] mb-10">
            {svc.panelTitle}
          </h3>

          {/* Steps */}
          {svc.steps && (
            <div className={`space-y-10 ${isEven ? 'text-right' : ''}`}>
              {svc.steps.map((s) => (
                <div
                  key={s.n}
                  className={`flex gap-6 group ${isEven ? 'flex-row-reverse' : ''}`}
                >
                  <span className="font-headline text-4xl font-bold text-outline-variant/30 group-hover:text-primary transition-colors flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <h5 className="font-label text-sm font-bold text-on-surface uppercase mb-1">
                      {s.title}
                    </h5>
                    <p className="text-on-surface-variant text-sm max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modules grid */}
          {svc.modules && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {svc.modules.map((m) => (
                <div
                  key={m.num}
                  className="p-6 bg-surface-container border-b-2 border-primary/10"
                >
                  <span className="font-label text-[10px] text-outline-variant uppercase">
                    Module {m.num}
                  </span>
                  <h5 className="font-label text-sm font-bold text-on-surface uppercase mt-2 mb-2">
                    {m.title}
                  </h5>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', service: 'AI Discovery Audit', description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <header className="relative pt-20 pb-28 px-8 bg-surface border-b border-outline-variant/10 overflow-hidden">
        <div className="absolute inset-0 ghost-grid pointer-events-none" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs mb-4 block">
            Architecting Intelligence
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl md:text-9xl font-bold tracking-tighter leading-none text-on-background uppercase">
            Our <span className="text-primary italic">Services</span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl mt-8 leading-relaxed">
            Precision-engineered AI solutions for businesses ready to move beyond the hype.
            We bridge the gap between speculative technology and operational excellence.
          </p>
        </div>
      </header>

      {/* Service sections */}
      {services.map((svc, idx) => (
        <ServiceSection key={svc.phase} svc={svc} idx={idx} />
      ))}

      {/* Quote Form */}
      <section className="py-32 px-8 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto border border-outline-variant/10 bg-surface-container-low p-8 md:p-16 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-primary text-on-primary font-label font-bold px-6 py-2 text-xs uppercase tracking-[0.2em] shadow-xl">
              Custom Pricing
            </span>
          </div>
          <div className="text-center mb-14">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background uppercase tracking-tighter mb-4">
              Initialize Project
            </h2>
            <p className="font-body text-on-surface-variant">
              Provide your operational parameters to receive a custom tailored proposal.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-primary text-6xl mb-6 block">check_circle</span>
              <h3 className="font-headline text-3xl font-bold text-on-surface mb-4">Request Received</h3>
              <p className="text-on-surface-variant max-w-md mx-auto">
                We'll review your parameters and reach out within 48 hours with a tailored proposal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 text-on-background focus:ring-0 focus:border-primary transition-colors placeholder:text-outline-variant/50 outline-none"
                  />
                </div>
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                    Company
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 text-on-background focus:ring-0 focus:border-primary transition-colors placeholder:text-outline-variant/50 outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 text-on-background focus:ring-0 focus:border-primary transition-colors placeholder:text-outline-variant/50 outline-none"
                  />
                </div>
                <div className="group">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                    Service Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 text-on-background focus:ring-0 focus:border-primary transition-colors appearance-none outline-none"
                  >
                    <option>AI Discovery Audit</option>
                    <option>AI Implementation</option>
                    <option>Staff Training</option>
                    <option>Full Transformation Bundle</option>
                  </select>
                </div>
              </div>
              <div className="group">
                <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Briefly describe your objectives..."
                  rows={4}
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-3 px-0 text-on-background focus:ring-0 focus:border-primary transition-colors placeholder:text-outline-variant/50 resize-none outline-none"
                />
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-5 font-label font-bold uppercase tracking-[0.3em] text-sm hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Request Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-8 text-center border-t border-outline-variant/10 bg-surface">
        <h3 className="font-headline text-2xl md:text-3xl font-medium text-on-background uppercase mb-8">
          Not Sure Where to Start?
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Link
            to="/roi"
            className="group flex items-center gap-2 font-label text-primary uppercase tracking-widest text-xs"
          >
            Calculate Your ROI
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
          <span className="hidden md:block text-outline-variant/30">|</span>
          <Link
            to="/contact"
            className="group flex items-center gap-2 font-label text-primary uppercase tracking-widest text-xs"
          >
            Book Discovery Call
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
