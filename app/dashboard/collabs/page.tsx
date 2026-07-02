'use client';

import React from 'react';
import Link from 'next/link';

export default function CollabsPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 -mx-8 px-8 py-3 mb-8 flex items-center justify-between">
        <span className="font-bold text-lg">Mobileyes Collabs — Rebuilding v4</span>
        <div className="flex gap-3 text-sm">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/dashboard/agents" className="text-gray-600 hover:text-gray-900">Agents</Link>
          <Link href="/dashboard/talent" className="text-gray-600 hover:text-gray-900">Talent</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Collabs v4 — Building</h1>
        <p className="text-gray-600 mb-8">Enhanced version deploying next session. For now, use the call script and proposal docs.</p>
        <div className="space-y-3 text-left max-w-md mx-auto bg-gray-50 rounded-lg p-6">
          <p className="font-semibold text-gray-900">Quick Reference:</p>
          <p className="text-sm text-gray-700">• Call script: <code className="bg-gray-200 px-1 rounded">proposals/jacob-tabor-call-script.md</code></p>
          <p className="text-sm text-gray-700">• P1 proposal: <code className="bg-gray-200 px-1 rounded">proposals/p1-simgear-jacob-tabor-proposal.md</code></p>
          <p className="text-sm text-gray-700">• Login: founder / GamefluenceAI2026!</p>
          <p className="text-sm text-gray-700">• Jacob: jacob_tabor@outlook.com</p>
          <p className="text-sm text-gray-700">• Meeting: Jul 3 @ 11am</p>
          <p className="text-sm text-gray-700">• His fee: ~$4,800/month for 4 posts</p>
          <p className="text-sm text-gray-700">• Your margin: $2,700/month (34%)</p>
          <p className="text-sm text-gray-700">• Affiliate: $1K/rig, 50/50 split</p>
        </div>
      </div>
    </div>
  );
}
