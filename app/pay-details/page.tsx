'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Upload, CheckCircle, Info } from 'lucide-react';

interface PaymentFormData {
  fullName: string;
  email: string;
  abn: string;
  tfn: string;
  bsb: string;
  accountNumber: string;
  accountName: string;
  superFundName: string;
  superFundUSI: string;
  superMemberNumber: string;
  screenshot: string;
}

export default function PayDetailsPage() {
  const [form, setForm] = useState<PaymentFormData>({
    fullName: '',
    email: '',
    abn: '',
    tfn: '',
    bsb: '',
    accountNumber: '',
    accountName: '',
    superFundName: '',
    superFundUSI: '',
    superMemberNumber: '',
    screenshot: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, []);

  const formatBSB = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 6);
    if (digits.length > 3) {
      return digits.slice(0, 3) + '-' + digits.slice(3);
    }
    return digits;
  };

  const handleBSBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatBSB(e.target.value);
    setForm((prev) => ({ ...prev, bsb: formatted }));
  };

  const handleABNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    setForm((prev) => ({ ...prev, abn: digits }));
  };

  const handleTFNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
    setForm((prev) => ({ ...prev, tfn: digits }));
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
    setForm((prev) => ({ ...prev, accountNumber: digits }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, screenshot: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/pay-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              ✅ Payment details received
            </h1>
            <p className="text-gray-400">
              You&apos;ll be paid within 4 business days of your next verified post.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Details</h1>
          <p className="text-gray-400">
            Complete your payment setup to start receiving earnings from Mobileyes.
          </p>
        </div>

        {/* Privacy Note */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-8 flex gap-3">
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-purple-200">
            Your details are encrypted and only accessible by Mobileyes management. We never share your TFN or bank details with brands.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info Section */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Personal Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Legal Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="As it appears on your bank account"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  ABN <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.abn}
                  onChange={handleABNChange}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="11 digits"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  TFN <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.tfn}
                  onChange={handleTFNChange}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="9 digits"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Required for tax withholding. Without a TFN, we must withhold at the highest marginal rate.
                </p>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Bank Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  BSB <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.bsb}
                  onChange={handleBSBChange}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="XXX-XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Account Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.accountNumber}
                  onChange={handleAccountNumberChange}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Up to 9 digits"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Account Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.accountName}
                onChange={(e) => setForm((prev) => ({ ...prev, accountName: e.target.value }))}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="Name on the bank account"
              />
            </div>
          </div>

          {/* Super Section */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">
              Superannuation <span className="text-gray-500 text-sm font-normal">(optional but encouraged)</span>
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Super Fund Name</label>
              <input
                type="text"
                value={form.superFundName}
                onChange={(e) => setForm((prev) => ({ ...prev, superFundName: e.target.value }))}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="e.g. AustralianSuper"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Super Fund USI</label>
                <input
                  type="text"
                  value={form.superFundUSI}
                  onChange={(e) => setForm((prev) => ({ ...prev, superFundUSI: e.target.value }))}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Unique Superannuation Identifier"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Member Number</label>
                <input
                  type="text"
                  value={form.superMemberNumber}
                  onChange={(e) => setForm((prev) => ({ ...prev, superMemberNumber: e.target.value }))}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Your member number"
                />
              </div>
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Supporting Document <span className="text-gray-500 text-sm font-normal">(optional)</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload a screenshot of your bank details or super statement for verification.
            </p>
            <label className="flex items-center justify-center gap-2 w-full bg-[#0D0D0D] border border-dashed border-white/20 rounded-lg px-4 py-6 text-gray-400 hover:border-purple-500/50 hover:text-purple-300 cursor-pointer transition">
              <Upload className="w-5 h-5" />
              <span>{form.screenshot ? 'File attached ✓' : 'Click to upload'}</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition"
          >
            {submitting ? 'Submitting...' : 'Submit Payment Details'}
          </button>
        </form>
      </div>
    </div>
  );
}
