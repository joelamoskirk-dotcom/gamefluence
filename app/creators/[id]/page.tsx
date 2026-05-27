import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

// Keep static params to avoid build errors for any existing links
export function generateStaticParams() {
  return [
    { id: 'alex-gamemaster' },
    { id: 'sarah-plays' },
    { id: 'gaming-with-mike' },
  ];
}

export default function CreatorProfile({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/creators" className="flex items-center text-primary mb-8 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>

      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🔒</span>
        </div>
        <h1 className="text-2xl font-bold mb-4">Creator Profiles Are Private</h1>
        <p className="text-gray-600 mb-8">
          We don&apos;t share our creator roster publicly. Our AI matches you with the
          right creators based on your campaign goals, target audience, and budget.
          This protects our creators and ensures better campaign outcomes.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/get-started">
            <Button>Get Matched With Creators</Button>
          </Link>
          <Link href="/creators">
            <Button variant="outline">Learn How It Works</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
