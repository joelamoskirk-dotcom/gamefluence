import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gaming via-secondary to-primary">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 shadow-2xl">
          <p className="text-7xl font-bold text-white mb-2">404</p>
          <h1 className="text-2xl font-semibold text-white mb-3">Page Not Found</h1>
          <p className="text-white/70 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="default" size="lg" className="w-full sm:w-auto bg-white text-gaming hover:bg-white/90">
                Back to Home
              </Button>
            </Link>
            <Link href="/campaigns">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 hover:border-white">
                Campaign Builder
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-white/40 text-xs mt-8">
          Last updated: April 2026
        </p>
      </div>
    </div>
  );
}
