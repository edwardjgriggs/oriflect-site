import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const presets = [
  { label: 'Ops-heavy SMB', employees: 15, hoursPerWeek: 8, hourlyRate: 45, automationRate: 70 },
  { label: 'Service business', employees: 25, hoursPerWeek: 12, hourlyRate: 65, automationRate: 60 },
  { label: 'Mid-market', employees: 80, hoursPerWeek: 20, hourlyRate: 80, automationRate: 55 },
]

function Slider({ label, min, max, step, value, onChange, format }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
          {label}
        </label>
        <span className="font-headline text-xl font-bold text-primary">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[2px] bg-outline-variant/40 appearance-none cursor-pointer accent-primary"
        style={{ accentColor: '#e9c176' }}
      />
      <div className="flex justify-between">
        <span className="font-label text-[10px] text-outline-variant/60">{format(min)}</span>
        <span className="font-label text-[10px] text-outline-variant/60">{format(max)}</span>
      </div>
    </div>
  )
}

function Metric({ label, value, sub, highlight }) {
  return (
    <div className={`p-8 border border-outline-variant/10 ${highlight ? 'bg-primary/10 border-primary/30' : 'bg-surface-container'}`}>
      <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">{label}</p>
      <p className={`font-headline text-3xl md:text-4xl font-bold tracking-tighter ${highlight ? 'text-primary' : 'text-on-surface'}`}>
        {value}
      </p>
      {sub && <p className="font-label text-[10px] text-on-surface-variant/60 mt-1 uppercase tracking-wider">{sub}</p>}
    </div>
  )
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(20)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(55)
  const [automationRate, setAutomationRate] = useState(65)
  const [showCTA, setShowCTA] = useState(false)

  const results = useMemo(() => {
    const weeklyHoursSaved = employees * hoursPerWeek * (automationRate / 100)
    const annualHoursSaved = weeklyHoursSaved * 52
    const annualSavings = annualHoursSaved * hourlyRate
    const implementationCost = Math.max(5000, employees * 400)
    const paybackMonths = implementationCost / (annualSavings / 12)
    const threeYearROI = ((annualSavings * 3 - implementationCost) / implementationCost) * 100

    return {
      weeklyHoursSaved: Math.round(weeklyHoursSaved),
      annualHoursSaved: Math.round(annualHoursSaved),
      annualSavings,
      implementationCost,
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      threeYearROI: Math.round(threeYearROI),
    }
  }, [employees, hoursPerWeek, hourlyRate, automationRate])

  const fmt = {
    num: (n) => n.toLocaleString(),
    usd: (n) => `$${Math.round(n).toLocaleString()}`,
    pct: (n) => `${n}%`,
    hrs: (n) => `${n} hrs`,
    mo: (n) => `${n} mo`,
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-8 bg-surface border-b border-outline-variant/10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-10 bg-primary" />
            <span className="font-label text-primary uppercase tracking-[0.3em] text-xs">
              Phase 4 Tool
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6 leading-[0.95]">
            ROI <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            See the real numbers behind AI automation for your business. Adjust the inputs
            to match your team — we'll show you the projected savings, payback period, and
            3-year return.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 px-8 bg-surface-container-lowest">
        <div className="max-w-screen-xl mx-auto">
          {/* Presets */}
          <div className="mb-12">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4">
              Quick Presets
            </p>
            <div className="flex flex-wrap gap-3">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setEmployees(p.employees)
                    setHoursPerWeek(p.hoursPerWeek)
                    setHourlyRate(p.hourlyRate)
                    setAutomationRate(p.automationRate)
                  }}
                  className="font-label text-xs uppercase tracking-wider px-5 py-2 border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-outline-variant/10">
            {/* Inputs */}
            <div className="bg-surface-container-low p-10 md:p-14 space-y-12">
              <div>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
                  Your Business Parameters
                </h2>
                <p className="text-on-surface-variant text-sm">
                  Drag the sliders to match your team.
                </p>
              </div>

              <Slider
                label="Number of Employees"
                min={2}
                max={200}
                step={1}
                value={employees}
                onChange={setEmployees}
                format={fmt.num}
              />
              <Slider
                label="Manual Hours per Employee / Week"
                min={1}
                max={40}
                step={1}
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                format={fmt.hrs}
              />
              <Slider
                label="Avg. Hourly Labour Cost"
                min={15}
                max={200}
                step={5}
                value={hourlyRate}
                onChange={setHourlyRate}
                format={(n) => `$${n}`}
              />
              <Slider
                label="Estimated Automation Rate"
                min={20}
                max={90}
                step={5}
                value={automationRate}
                onChange={setAutomationRate}
                format={fmt.pct}
              />

              <p className="text-[10px] font-label text-outline-variant/60 uppercase tracking-wider leading-relaxed">
                * Estimates based on industry averages. Implementation costs vary by project
                scope. Contact us for a precise proposal.
              </p>
            </div>

            {/* Results */}
            <div className="bg-surface-container p-10 md:p-14 space-y-6">
              <div>
                <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">
                  Projected Impact
                </h2>
                <p className="text-on-surface-variant text-sm">
                  Based on your parameters.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric
                  label="Annual Hours Saved"
                  value={fmt.num(results.annualHoursSaved)}
                  sub={`${fmt.num(results.weeklyHoursSaved)} hrs / week`}
                />
                <Metric
                  label="Annual Cost Savings"
                  value={fmt.usd(results.annualSavings)}
                  highlight
                />
                <Metric
                  label="Est. Payback Period"
                  value={`${results.paybackMonths} mo`}
                  sub="from go-live"
                />
                <Metric
                  label="3-Year ROI"
                  value={`${results.threeYearROI}%`}
                  sub="return on investment"
                  highlight
                />
              </div>

              {/* Visual bar */}
              <div className="mt-4 space-y-3">
                <div className="flex justify-between font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  <span>Current cost burden</span>
                  <span>After AI automation</span>
                </div>
                <div className="h-3 bg-surface-container-lowest overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${100 - automationRate}%` }}
                  />
                </div>
                <p className="font-label text-[10px] text-on-surface-variant/60 uppercase tracking-wider">
                  {automationRate}% of manual work automated
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/10 space-y-4">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Ready to see these numbers for your actual workflows?
                  Our Discovery Audit produces a precise, validated ROI projection.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 font-label font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all group"
                >
                  Get My Precise Estimate
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-14">
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs block mb-2">
              Methodology
            </span>
            <h2 className="font-headline text-4xl font-bold text-on-surface">
              How We Calculate This
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-outline-variant/10">
            {[
              {
                n: '01',
                title: 'Time Audit',
                desc: 'We map every manual, repetitive task across your team. Not estimates—actual workflow analysis.',
              },
              {
                n: '02',
                title: 'Automation Fit Score',
                desc: 'Each task is scored for AI automability based on structure, volume, and decision complexity.',
              },
              {
                n: '03',
                title: 'Cost & Revenue Model',
                desc: 'Time saved translates to cost reduction and capacity freed for revenue-generating activity.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="bg-surface-container p-10 space-y-4">
                <span className="font-headline text-4xl text-primary/40 font-light">{n}.</span>
                <h3 className="font-headline text-xl font-bold text-on-surface">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
