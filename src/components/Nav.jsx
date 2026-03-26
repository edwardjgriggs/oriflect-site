import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header shadow-lg' : 'bg-[#0B1221]'
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-[#D4AF37] font-headline hover:opacity-90 transition-opacity"
        >
          ORIFLECT
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-label tracking-tight font-medium transition-colors duration-300 text-sm ${
                  isActive
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-0.5'
                    : 'text-on-surface opacity-80 hover:text-[#D4AF37] hover:opacity-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-block bg-primary text-on-primary px-6 py-2 font-label font-bold uppercase tracking-wider text-xs hover:brightness-110 active:scale-95 transition-all"
          >
            Book Consultation
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden glass-header border-t border-outline-variant/20 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen py-6' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-label tracking-tight font-medium text-base transition-colors duration-300 ${
                  isActive ? 'text-[#D4AF37]' : 'text-on-surface opacity-80'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-primary text-on-primary px-6 py-3 font-label font-bold uppercase tracking-wider text-xs text-center hover:brightness-110 transition-all mt-2"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  )
}
