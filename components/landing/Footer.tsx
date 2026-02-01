"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black px-6 py-20 md:px-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[80%] bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-[var(--container-max)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white mb-6"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[#a78bfa] flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
              </div>
              Tutor AI
            </Link>
            <p className="max-w-xs text-lg text-[var(--muted)] leading-relaxed">
              The next generation of interactive AI interfaces. 
              Built for teams who demand excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="flex flex-col gap-4">
              {["Features", "Integrations", "Pricing", "Changelog"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-[var(--muted)] hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="flex flex-col gap-4">
              {["About", "Blog", "Careers", "Contact"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-[var(--muted)] hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 text-sm text-[var(--muted)]">
          <div>
            © {new Date().getFullYear()} Thesys. All rights reserved.
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <a
              href="https://docs.thesys.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
