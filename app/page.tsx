import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16 sm:pb-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gaming to-accent section-padding">
        <div className="container-mobile">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="heading-responsive font-bold mb-4 sm:mb-6 no-select">
              Connect APAC Agencies & Brands with Gaming Creators
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 px-2 sm:px-0">
              The premier platform for APAC marketing agencies and brands to launch authentic gaming creator campaigns across Vietnam, Thailand, and Indonesia markets
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/agency-demo">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg touch-target">Agency Demo</Button>
              </Link>
              <Link href="/beta">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-white text-gaming touch-target">Brand Access</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container-mobile">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 no-select">How Agencies & Brands Use Gamefluence</h2>
          
          <div className="grid-responsive">
            <div className="card">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Multi-Client Dashboard</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage multiple brand campaigns from one agency dashboard with white-label options for client reporting
              </p>
            </div>
            
            <div className="card">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">APAC Creator Network</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Access verified gaming creators across Vietnam, Thailand, and Indonesia with local market expertise
              </p>
            </div>
            
            <div className="card">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <span className="text-xl sm:text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Cross-Market Attribution</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Track performance with AppsFlyer-style attribution across multiple APAC markets and gaming audiences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gaming text-white">
        <div className="container-mobile text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 no-select">Ready to scale your APAC campaigns?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            Join leading APAC agencies and brands who have successfully launched gaming creator campaigns with Gamefluence
          </p>
          <Link href="/agency-demo">
            <Button size="lg" className="bg-white text-gaming hover:bg-gray-100 touch-target">
              Start Agency Demo
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}