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
    <footer className="bg-gray-900 text-gray-400 pb-20 sm:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3 notranslate">Gamefluence.AI</h3>
            <p className="text-sm leading-relaxed mb-4">
              The agency-first platform connecting APAC brands with gaming creators. AI-powered matching. Real attribution.
            </p>
            <div className="flex flex-wrap gap-2">
              {MARKETS.map(m => (
                <span key={m.name} className="text-lg" title={m.name}>{m.flag}</span>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/batch-campaign" className="hover:text-white transition-colors">Launch Campaign</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-colors">Browse Creators</Link></li>
              <li><Link href="/creator-signup" className="hover:text-white transition-colors">Join as Creator</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/agency-demo" className="hover:text-white transition-colors">Agency Demo</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard/market-intelligence" className="hover:text-white transition-colors">Market Intelligence</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">News & Updates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div>
            © {new Date().getFullYear()} <span className="notranslate">Gamefluence Pty Ltd</span>. All rights reserved. ABN/ACN: [ACN_PLACEHOLDER]
          </div>
          <div className="flex items-center gap-4">
            <span>Melbourne, Australia</span>
            <span>·</span>
            <a href="mailto:hello@gamefluenceai.com" className="hover:text-white transition-colors">hello@gamefluenceai.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
