import Link from 'next/link';

const MARKETS = [
  { flag: '🇻🇳', name: 'Vietnam' },
  { flag: '🇹🇭', name: 'Thailand' },
  { flag: '🇮🇩', name: 'Indonesia' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇵🇭', name: 'Philippines' },
  { flag: '🇦🇺', name: 'Australia' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 pb-20 sm:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-t-hi font-bold text-lg mb-3 notranslate" spellCheck="false">Gamefluence</h3>
            <p className="text-sm text-t-mid leading-relaxed mb-4">
              The agency-first platform connecting APAC brands with gaming creators. Performance marketing with real attribution.
            </p>
            <div className="flex flex-wrap gap-2">
              {MARKETS.map(m => (
                <span key={m.name} className="text-lg" title={m.name}>{m.flag}</span>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-t-hi font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/get-started" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Launch Campaign</Link></li>
              <li><Link href="/creators" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">How It Works</Link></li>
              <li><Link href="/creator-signup" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Join as Creator</Link></li>
              <li><Link href="/pricing" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-t-hi font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">News &amp; Updates</Link></li>
              <li><Link href="/contact" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-t-hi font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-t-lo hover:text-t-hi transition-colors duration-micro ease-brand">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-t-lo">
          <div>
            © {new Date().getFullYear()} <span className="notranslate">GAMEFLUENCE PTY LTD</span>. All rights reserved. ACN: 696 199 461
          </div>
          <div className="flex items-center gap-4">
            <span>Sydney, Australia</span>
            <span>·</span>
            <a href="mailto:admin@gamefluence.com.au" className="hover:text-t-hi transition-colors duration-micro ease-brand">admin@gamefluence.com.au</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
