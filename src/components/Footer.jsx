import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/roi', label: 'ROI Calculator' },
]

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B1221] border-t border-[#151b2b] w-full">
      <div className="max-w-screen-2xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-[#D4AF37] font-headline mb-3 tracking-tighter">
              ORIFLECT
            </div>
            <p className="text-on-surface-variant text-xs font-body leading-relaxed max-w-xs">
              Democratizing enterprise-grade AI for small and medium-sized businesses.
              The Intelligence Architect for the modern SMB.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface opacity-60 hover:opacity-100 hover:text-[#D4AF37] transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@oriflect.ai"
                className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface opacity-60 hover:opacity-100 hover:text-[#D4AF37] transition-all"
              >
                hello@oriflect.ai
              </a>
              <a
                href="tel:+15559028432"
                className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface opacity-60 hover:opacity-100 hover:text-[#D4AF37] transition-all"
              >
                +1 (555) 902-8432
              </a>
              <div className="flex gap-4 mt-2">
                {legalLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface opacity-40 hover:opacity-80 transition-opacity"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface opacity-40">
            © 2024 ORIFLECT. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface opacity-40 hover:opacity-80 hover:text-[#D4AF37] transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
