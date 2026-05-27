'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight, Mail, Building2, Gamepad2 } from 'lucide-react';

type InquiryType = 'brand' | 'agency' | 'creator';

export default function GetStartedPage() {
  const [selectedType, setSelectedType] = useState<InquiryType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    market: '',
    budget: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `[${selectedType?.toUpperCase()} INQUIRY]\nMarket: ${formData.market}\nBudget: ${formData.budget}\n\n${formData.message}`,
          type: selectedType === 'creator' ? 'creator_inquiry' : selectedType === 'agency' ? 'agency_inquiry' : 'brand_inquiry',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please email admin@gamefluence.com.au directly.');
      }
    } catch {
      alert('Network error. Please email admin@gamefluence.com.au directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
        <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">We&apos;ll be in touch!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Our team will review your inquiry and get back to you within 24 hours with next steps.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Need something urgent? Email us directly at{' '}
            <a href="mailto:admin@gamefluence.com.au" className="text-primary hover:underline">admin@gamefluence.com.au</a>
          </p>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Get Started with Gamefluence</h1>
          <p className="text-lg text-gray-600">
            Tell us about your goals and we&apos;ll set you up with the right plan.
          </p>
        </div>

        {/* Type selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { type: 'brand' as InquiryType, icon: Building2, label: 'I\'m a Brand', desc: 'Game studio or publisher' },
            { type: 'agency' as InquiryType, icon: Mail, label: 'I\'m an Agency', desc: 'Managing brand clients' },
            { type: 'creator' as InquiryType, icon: Gamepad2, label: 'I\'m a Creator', desc: 'Gaming content creator' },
          ].map(({ type, icon: Icon, label, desc }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                selectedType === type
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${selectedType === type ? 'text-primary' : 'text-gray-400'}`} />
              <div className="font-bold text-gray-900">{label}</div>
              <div className="text-sm text-gray-500">{desc}</div>
            </button>
          ))}
        </div>

        {/* Creator redirect */}
        {selectedType === 'creator' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Gamepad2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Join our Creator Network</h2>
            <p className="text-gray-600 mb-6">
              Sign up to get matched with brand campaigns, earn money from your gaming content, and join 250+ APAC creators.
            </p>
            <Link href="/creator-signup">
              <Button size="lg" className="bg-primary text-white">
                Go to Creator Signup <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Brand/Agency form */}
        {(selectedType === 'brand' || selectedType === 'agency') && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="jane@agency.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company / Agency *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Your company name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Market</label>
                <select
                  value={formData.market}
                  onChange={e => setFormData({ ...formData, market: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select market...</option>
                  <option value="indonesia">Indonesia</option>
                  <option value="philippines">Philippines</option>
                  <option value="vietnam">Vietnam</option>
                  <option value="thailand">Thailand</option>
                  <option value="malaysia">Malaysia</option>
                  <option value="singapore">Singapore</option>
                  <option value="south-korea">South Korea</option>
                  <option value="japan">Japan</option>
                  <option value="australia">Australia</option>
                  <option value="newzealand">New Zealand</option>
                  <option value="multiple">Multiple markets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget (USD)</label>
                <select
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select range...</option>
                  <option value="5k-15k">$5,000 – $15,000</option>
                  <option value="15k-50k">$15,000 – $50,000</option>
                  <option value="50k-100k">$50,000 – $100,000</option>
                  <option value="100k+">$100,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your campaign goals</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="What game/app are you promoting? What markets are you targeting? Any specific creator requirements?"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Request Campaign Setup'}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-3">
                We&apos;ll respond within 24 hours. Or email{' '}
                <a href="mailto:admin@gamefluence.com.au" className="text-primary hover:underline">admin@gamefluence.com.au</a> directly.
              </p>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
