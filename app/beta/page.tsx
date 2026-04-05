import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function BetaPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gaming to-accent">
      <div className="text-center text-white max-w-lg px-6">
        <h1 className="text-4xl font-bold mb-4">Gamefluence.AI</h1>
        <p className="text-lg mb-8 text-white/80">
          APAC Gaming Creator Marketing Platform
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-white text-gaming hover:bg-gray-100 w-full sm:w-auto">
              Enter Platform
            </Button>
          </Link>
          <Link href="/agency-demo">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              Agency Demo
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
