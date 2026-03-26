import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'ORI-2024-001',
    name: 'AI Discovery Audit — Meridian Logistics',
    status: 'In Progress',
    statusColor: 'text-primary bg-primary/10 border-primary/20',
    phase: 'Phase 2 of 4',
    progress: 52,
    updated: '2 hours ago',
  },
  {
    id: 'ORI-2024-002',
    name: 'LLM Implementation — Harbor Financial',
    status: 'Completed',
    statusColor: 'text-tertiary bg-tertiary-container border-tertiary/20',
    phase: 'Phase 4 of 4',
    progress: 100,
    updated: '3 days ago',
  },
  {
    id: 'ORI-2024-003',
    name: 'Staff Training Program — Nexus Retail',
    status: 'Scheduled',
    statusColor: 'text-on-surface-variant bg-surface-container-high border-outline-variant/20',
    phase: 'Not started',
    progress: 0,
    updated: '1 week ago',
  },
]

const deliverables = [
  { name: 'Infrastructure Readiness Report', project: 'ORI-2024-001', status: 'Ready', icon: 'description' },
  { name: 'Data Quality Assessment v2', project: 'ORI-2024-001', status: 'Ready', icon: 'analytics' },
  { name: 'Stakeholder Interview Summary', project: 'ORI-2024-001', status: 'In Review', icon: 'groups' },
  { name: 'ROI Projection Matrix', project: 'ORI-2024-001', status: 'Pending', icon: 'trending_up' },
  { name: 'LLM Deployment Architecture', project: 'ORI-2024-002', status: 'Ready', icon: 'memory' },
  { name: 'Staff Training Curriculum', project: 'ORI-2024-003', status: 'Pending', icon: 'school' },
]

const messages = [
  {
    from: 'Edward Griggs',
    role: 'Chief Architect',
    time: '2 hrs ago',
    msg: 'Data quality review complete. Moving to Gap Analysis phase on schedule. No blockers.',
  },
  {
    from: 'You',
    role: 'Client',
    time: 'Yesterday',
    msg: 'Sounds good. Can we loop in our CTO for the Gap Analysis presentation?',
  },
  {
    from: 'Edward Griggs',
    role: 'Chief Architect',
    time: 'Yesterday',
    msg: 'Absolutely. I\'ll send a calendar invite for Friday at 2pm. Agenda will cover findings and the opportunity prioritization framework.',
  },
]

function StatusBadge({ status, colorClass }) {
  return (
    <span className={`font-label text-[10px] uppercase tracking-widest px-3 py-1 border ${colorClass}`}>
      {status}
    </span>
  )
}

function ProgressBar({ pct }) {
  return (
    <div className="h-[2px] bg-surface-container-high w-full">
      <div
        className="h-full bg-primary transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function ClientPortal() {
  return (
    <div className="pt-[72px] min-h-screen bg-surface-container-lowest">
      {/* Portal Header */}
      <section className="px-8 py-10 bg-surface border-b border-outline-variant/10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
                Client Portal
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container px-2 py-0.5 border border-outline-variant/20">
                Concept Preview
              </span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter text-on-surface">
              Project Dashboard
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Welcome back. Here's the current state of your engagements.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 bg-primary text-on-primary px-6 py-3 font-label font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all"
          >
            Request Support
          </Link>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-8 py-12 space-y-10">
        {/* Active Engagements */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">
              Active Engagements
            </h2>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              {projects.length} Projects
            </span>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-surface-container p-6 md:p-8 hover:bg-surface-container-high transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {p.id}
                      </span>
                      <StatusBadge status={p.status} colorClass={p.statusColor} />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {p.phase}
                    </p>
                    <p className="font-label text-[10px] text-outline-variant/60 uppercase mt-1">
                      Updated {p.updated}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    <span>Progress</span>
                    <span className="text-primary">{p.progress}%</span>
                  </div>
                  <ProgressBar pct={p.progress} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deliverables */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">
                Deliverables
              </h2>
            </div>
            <div className="bg-surface-container space-y-0">
              {deliverables.map((d, i) => (
                <div
                  key={d.name}
                  className={`flex items-center gap-4 p-5 hover:bg-surface-container-high transition-colors ${
                    i < deliverables.length - 1 ? 'border-b border-outline-variant/10' : ''
                  }`}
                >
                  <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">{d.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label text-xs font-bold text-on-surface uppercase truncate">
                      {d.name}
                    </p>
                    <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">
                      {d.project}
                    </p>
                  </div>
                  <span
                    className={`font-label text-[10px] uppercase tracking-widest flex-shrink-0 ${
                      d.status === 'Ready'
                        ? 'text-primary'
                        : d.status === 'In Review'
                        ? 'text-tertiary'
                        : 'text-on-surface-variant/50'
                    }`}
                  >
                    {d.status}
                  </span>
                  {d.status === 'Ready' && (
                    <button className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors ml-2 flex-shrink-0">
                      <span className="material-symbols-outlined text-sm">download</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Communication Log */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-on-surface uppercase tracking-tight">
                Communication Log
              </h2>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                ORI-2024-001
              </span>
            </div>
            <div className="bg-surface-container flex flex-col">
              <div className="flex-1 divide-y divide-outline-variant/10">
                {messages.map((m, i) => (
                  <div key={i} className={`p-6 ${m.from === 'You' ? 'bg-surface-container-high' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-primary/20 flex items-center justify-center">
                        <span className="font-headline text-[10px] font-bold text-primary">
                          {m.from[0]}
                        </span>
                      </div>
                      <div>
                        <span className="font-label text-xs font-bold text-on-surface uppercase">
                          {m.from}
                        </span>
                        <span className="font-label text-[10px] text-on-surface-variant uppercase ml-2">
                          · {m.role}
                        </span>
                      </div>
                      <span className="font-label text-[10px] text-outline-variant/60 uppercase ml-auto">
                        {m.time}
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{m.msg}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-outline-variant/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 bg-surface-container-lowest border-0 border-b border-outline-variant/30 py-2 px-3 text-on-background focus:ring-0 focus:border-primary outline-none text-sm placeholder:text-outline-variant/40"
                  />
                  <button className="bg-primary text-on-primary px-4 py-2 font-label text-xs uppercase tracking-wider hover:brightness-110 transition-all">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Portal disclaimer */}
        <div className="border border-outline-variant/20 p-6 bg-surface-container text-center">
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
            This is a concept preview of the Oriflect Client Portal. Full portal access
            is available to active clients.{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contact us to get started →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
