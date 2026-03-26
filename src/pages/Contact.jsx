import { useState } from 'react'

const faqs = [
  {
    q: 'How do discovery calls work?',
    a: 'Our discovery calls are technical deep-dives, not sales pitches. We analyze your existing data architecture and identify immediate bottlenecks or opportunities for LLM integration.',
  },
  {
    q: 'What is the standard audit duration?',
    a: 'A comprehensive AI Readiness Audit typically spans 3 to 5 weeks, depending on the complexity of your stack and the volume of proprietary data being analyzed.',
  },
  {
    q: 'What technical expertise do you specialize in?',
    a: 'We specialize in RAG (Retrieval-Augmented Generation) pipelines, fine-tuning open-source models (Llama, Mistral), and implementing secure, private AI infrastructure for enterprise-grade security.',
  },
  {
    q: 'What does engagement pricing look like?',
    a: 'Engagements are scoped and quoted individually based on business complexity, data volume, and desired outcomes. Discovery Audits start at a fixed project fee. Implementation is scoped after the audit.',
  },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group bg-surface-container-low hover:bg-surface-container transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-8 flex justify-between items-center cursor-pointer text-left"
      >
        <h3 className="font-headline text-lg font-bold text-on-background pr-8">{q}</h3>
        <span
          className={`material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          add
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-40 pb-8' : 'max-h-0'
        }`}
      >
        <p className="px-8 text-on-surface-variant leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-8 border-b border-outline-variant/10 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <span className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">
            Inquiry Portal
          </span>
          <h1 className="font-headline text-4xl sm:text-6xl md:text-9xl font-black text-on-background leading-none tracking-tighter mb-6">
            Contact Us
          </h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Get in touch with our team to discuss your AI strategy, request a quote,
            or book a discovery call.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="px-8 py-20 bg-surface">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 bg-surface-container-low p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">send</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-on-background mb-8">
              Send Us a Message
            </h2>

            {sent ? (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-primary text-6xl mb-6 block">
                  mark_email_read
                </span>
                <h3 className="font-headline text-3xl font-bold text-on-surface mb-4">
                  Message Transmitted
                </h3>
                <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  We've received your message and will respond within 24–48 hours.
                  Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <p className="text-error font-label text-xs uppercase tracking-widest">
                    {error}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-surface-container border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-background p-4 placeholder:opacity-30 outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.ai"
                      className="bg-surface-container border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-background p-4 placeholder:opacity-30 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                    Company
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Organization Name"
                    className="bg-surface-container border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-background p-4 placeholder:opacity-30 outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label text-[10px] text-on-tertiary-container uppercase tracking-widest">
                    Message *
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project goals..."
                    rows={5}
                    className="bg-surface-container border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-background p-4 placeholder:opacity-30 outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all flex items-center justify-center gap-3"
                >
                  Transmit Message
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Book a Call */}
            <div className="bg-surface-container-high p-8 md:p-10 relative flex flex-col justify-center border-l-4 border-primary">
              <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-background mb-4">
                Book a Discovery Call
              </h2>
              <p className="font-body text-sm text-on-surface-variant mb-8 leading-relaxed">
                Sync directly with our lead architects. Choose a slot that fits your timeline
                for a deep-dive technical alignment session.
              </p>
              <div className="w-full aspect-video bg-surface-container-lowest border border-outline-variant/20 flex flex-col items-center justify-center p-8 text-center">
                <span className="material-symbols-outlined text-primary mb-4 text-4xl">
                  calendar_today
                </span>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                  Schedule Your Session
                </p>
                <a
                  href="mailto:hello@oriflect.ai?subject=Discovery Call Request"
                  className="mt-2 px-6 py-2 border border-primary/40 text-primary text-xs font-bold uppercase tracking-tighter hover:bg-primary/10 transition-colors font-label"
                >
                  Email to Schedule
                </a>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <p className="font-label text-[10px] text-on-tertiary-container uppercase mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@oriflect.ai"
                    className="font-headline font-bold text-on-background text-sm hover:text-primary transition-colors"
                  >
                    hello@oriflect.ai
                  </a>
                </div>
              </div>
              <div className="bg-surface-container p-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">call</span>
                </div>
                <div>
                  <p className="font-label text-[10px] text-on-tertiary-container uppercase mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+15559028432"
                    className="font-headline font-bold text-on-background text-sm hover:text-primary transition-colors"
                  >
                    +1 (555) 902-8432
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto">
          <div className="mb-14 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-black text-on-background uppercase tracking-tight">
              Technical FAQ
            </h2>
            <div className="h-1 w-16 bg-primary mx-auto mt-4" />
          </div>
          <div className="space-y-1">
            {faqs.map((faq) => (
              <FAQ key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="relative h-[360px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD7hTbNYglz8Q8vYxNAf5p3ApgEJ6_QH1J_23QXBgkCkmuoUtJ-JAZ_QcbXA_tjt4DMRbpgzFzEtQR7UgBjfJ5WunlCGFFDye_bn-cgjip7kf5IWGtmEJdoibCIsLRiO8dGZMFf92s2SX4WD7YsNKWPb7Yu4RdyL1AylV2zEbLOnAfFrqhBwBBKD9ybnP4-0AvO5MYGc1b-ItC23XJmahCNO_P3ARtPCP057a1vtAGvaGSSDCBrp1BFgjKmDzRx9Ci0vgfTikZyc4c"
            alt="Abstract network"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-8">
          <h2 className="font-headline text-4xl md:text-5xl font-black text-on-background mb-8 uppercase tracking-tighter">
            Ready to Architect Your Future?
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-primary text-on-primary px-10 py-4 font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all"
          >
            Initialize Consultation
          </button>
        </div>
      </section>
    </div>
  )
}
