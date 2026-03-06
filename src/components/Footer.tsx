export default function Footer() {
  return (
    <footer className="bg-sapphire-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-sapphire-900 flex items-center justify-center">
                <span className="text-gold font-bold text-lg">O</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Oriflect
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-4">
              Helping businesses shine brighter through the power of AI. We
              illuminate opportunities, serve with integrity, and guide your
              path to meaningful results.
            </p>
            <p className="text-gold text-sm font-medium">
              Reflect. Refine. Rise.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "AI Discovery Audit",
                "AI Implementation",
                "Ongoing Partnership",
                "Digital Products",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Process", href: "#process" },
                { label: "Results", href: "#results" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Oriflect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
