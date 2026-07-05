'use client';

import React, { useState, useEffect } from 'react';
import FounderGuard from '@/components/FounderGuard';
import { DollarSign, ChevronDown, ChevronUp, Users, RefreshCw } from 'lucide-react';

interface PaymentRecord {
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
  hasScreenshot: boolean;
  submittedAt: string;
}

function maskBSB(bsb: string): string {
  const digits = bsb.replace(/\D/g, '');
  if (digits.length >= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}*`;
  }
  return bsb;
}

export default function AdminPayDetailsPage() {
  const [records, setRecords] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/pay-details', { method: 'GET' });
      if (!res.ok) {
        throw new Error('Failed to fetch records');
      }
      const data = await res.json();
      setRecords(data.submissions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <FounderGuard requireFounder={true}>
      <div className="min-h-screen bg-[#0D0D0D] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Payment Details</h1>
                <p className="text-gray-400 text-sm">Creator payment submissions</p>
              </div>
            </div>
            <button
              onClick={fetchRecords}
              className="flex items-center gap-2 bg-[#161616] border border-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Submissions</p>
                  <p className="text-2xl font-bold text-white">{records.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">With ABN</p>
                  <p className="text-2xl font-bold text-white">
                    {records.filter((r) => r.abn).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#161616] border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">With Super</p>
                  <p className="text-2xl font-bold text-white">
                    {records.filter((r) => r.superFundName).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Loading / Error */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading submissions...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && (
            <>
              {records.length === 0 ? (
                <div className="bg-[#161616] border border-white/10 rounded-xl p-12 text-center">
                  <p className="text-gray-400">No payment details submitted yet.</p>
                </div>
              ) : (
                <div className="bg-[#161616] border border-white/10 rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 bg-[#1a1a1a] border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div>Name</div>
                    <div>Email</div>
                    <div>BSB</div>
                    <div>Account Name</div>
                    <div>ABN</div>
                    <div>TFN</div>
                    <div>Submitted</div>
                  </div>

                  {/* Rows */}
                  {records.map((record, idx) => (
                    <div key={idx} className="border-b border-white/5 last:border-b-0">
                      <div
                        onClick={() => toggleExpand(idx)}
                        className="grid grid-cols-1 md:grid-cols-7 gap-2 md:gap-4 px-6 py-4 hover:bg-white/5 cursor-pointer transition items-center"
                      >
                        <div className="text-white font-medium flex items-center gap-2">
                          {expandedIndex === idx ? (
                            <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          )}
                          {record.fullName}
                        </div>
                        <div className="text-gray-400 text-sm truncate">{record.email}</div>
                        <div className="text-gray-300 font-mono text-sm">{maskBSB(record.bsb)}</div>
                        <div className="text-gray-300 text-sm">{record.accountName}</div>
                        <div>
                          {record.abn ? (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              Provided
                            </span>
                          ) : (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                              Missing
                            </span>
                          )}
                        </div>
                        <div>
                          {record.tfn ? (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                              Provided
                            </span>
                          ) : (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                              Missing
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {new Date(record.submittedAt).toLocaleDateString('en-AU', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedIndex === idx && (
                        <div className="px-6 pb-4">
                          <div className="bg-[#0D0D0D] border border-white/10 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Full BSB</p>
                              <p className="text-white font-mono">{record.bsb}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Account Number</p>
                              <p className="text-white font-mono">{record.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">ABN</p>
                              <p className="text-white font-mono">{record.abn || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">TFN</p>
                              <p className="text-white font-mono">{record.tfn || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Super Fund</p>
                              <p className="text-white">{record.superFundName || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Super USI</p>
                              <p className="text-white font-mono">{record.superFundUSI || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Super Member #</p>
                              <p className="text-white font-mono">{record.superMemberNumber || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Screenshot</p>
                              <p className="text-white">
                                {record.hasScreenshot ? (
                                  <span className="text-green-400">✓ Attached</span>
                                ) : (
                                  <span className="text-gray-500">Not provided</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </FounderGuard>
  );
}
