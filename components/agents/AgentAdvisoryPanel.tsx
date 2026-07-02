'use client';

import React, { useState } from 'react';
import { 
  TerryScoutAgent, 
  DazzaDealAgent, 
  CSuiteAdvisors,
  TerryScoutReport,
  DazzaDealAnalysis,
  CSuiteInsight,
  Platform,
} from '@/lib/platform-agents';
import { BatchContact } from '@/lib/batch-contact-upload';
import { Button } from '@/components/ui/Button';
import {
  Search,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  Zap,
  Users,
  BarChart3,
} from 'lucide-react';

interface AgentAdvisoryPanelProps {
  contacts: BatchContact[];
  platform: Platform;
}

type ActiveAgent = 'terry' | 'dazza' | 'csuite';

export default function AgentAdvisoryPanel({ contacts, platform }: AgentAdvisoryPanelProps) {
  const [activeAgent, setActiveAgent] = useState<ActiveAgent>('terry');
  const [selectedContact, setSelectedContact] = useState<BatchContact | null>(contacts[0] || null);
  const [scoutReport, setScoutReport] = useState<TerryScoutReport | null>(null);
  const [dealAnalysis, setDealAnalysis] = useState<DazzaDealAnalysis | null>(null);
  const [csuiteInsights, setCsuiteInsights] = useState<CSuiteInsight[]>([]);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const runTerryAnalysis = (contact: BatchContact) => {
    setIsAnalysing(true);
    setSelectedContact(contact);
    const report = TerryScoutAgent.scoutContact(contact, platform);
    setScoutReport(report);
    setIsAnalysing(false);
  };

  const runDazzaAnalysis = (contact: BatchContact) => {
    setIsAnalysing(true);
    setSelectedContact(contact);
    const analysis = DazzaDealAgent.analyseDeal(contact, platform);
    setDealAnalysis(analysis);
    setIsAnalysing(false);
  };

  const runCSuiteAnalysis = () => {
    setIsAnalysing(true);
    const reports = TerryScoutAgent.batchScout(contacts, platform);
    const deals = contacts.map(c => DazzaDealAgent.analyseDeal(c, platform));
    const insights = CSuiteAdvisors.generateInsights(contacts, reports, deals, platform);
    setCsuiteInsights(insights);
    setIsAnalysing(false);
  };

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'sign_now': return 'bg-red-100 text-red-800 border-red-300';
      case 'high_potential': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'worth_watching': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pass': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'red_flag': return 'bg-red-200 text-red-900 border-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-700';
      case 'this_week': return 'bg-orange-100 text-orange-700';
      case 'this_month': return 'bg-blue-100 text-blue-700';
      case 'strategic': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case 'cto': return '⚙️';
      case 'ceo': return '📈';
      case 'cmo': return '📣';
      default: return '💡';
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Selector */}
      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl">
        <button
          onClick={() => setActiveAgent('terry')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeAgent === 'terry' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🔍 Terry <span className="text-xs opacity-75">Talent Scout</span>
        </button>
        <button
          onClick={() => setActiveAgent('dazza')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeAgent === 'dazza' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          💰 Dazza <span className="text-xs opacity-75">Deal Agent</span>
        </button>
        <button
          onClick={() => { setActiveAgent('csuite'); runCSuiteAnalysis(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeAgent === 'csuite' ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🏢 C-Suite <span className="text-xs opacity-75">CTO • CEO • CMO</span>
        </button>
      </div>

      {/* TERRY VIEW */}
      {activeAgent === 'terry' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-3 bg-green-50 border-b">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <Search className="w-4 h-4" /> Terry&apos;s Queue
              </h3>
              <p className="text-xs text-green-600">{contacts.length} contacts to evaluate</p>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y">
              {contacts.map(contact => {
                const quick = TerryScoutAgent.getQuickVerdict(contact, platform);
                return (
                  <button
                    key={contact.id}
                    onClick={() => runTerryAnalysis(contact)}
                    className={`w-full p-3 text-left hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-green-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{contact.name}</div>
                        <div className="text-xs text-gray-500">@{contact.handle} • {contact.platform}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg">{quick.emoji}</span>
                        <div className={`text-xs font-medium ${quick.color}`}>{quick.score}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scout Report */}
          <div className="lg:col-span-2 bg-white rounded-lg border overflow-hidden">
            {scoutReport ? (
              <div>
                <div className={`p-4 border-b ${getVerdictStyle(scoutReport.verdict)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{scoutReport.contactName}</h3>
                      <p className="text-sm opacity-75">{scoutReport.summary}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">{scoutReport.overallScore}</div>
                      <div className="text-xs font-medium">/100</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Good/Bad Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 text-sm mb-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Good Things
                      </h4>
                      <ul className="space-y-1">
                        {scoutReport.goodThings.map((g, i) => (
                          <li key={i} className="text-xs text-green-700">✓ {g}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <h4 className="font-medium text-red-800 text-sm mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" /> Concerns
                      </h4>
                      <ul className="space-y-1">
                        {scoutReport.concerns.map((c, i) => (
                          <li key={i} className="text-xs text-red-700">⚠ {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div>
                    <h4 className="font-medium text-gray-700 text-sm mb-2">Score Breakdown</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: 'Audience', score: scoutReport.sections.audience.score },
                        { label: 'Engagement', score: scoutReport.sections.engagement.score },
                        { label: 'Content', score: scoutReport.sections.content.score },
                        { label: 'Monetise', score: scoutReport.sections.monetisability.score },
                        { label: 'Consistency', score: scoutReport.sections.consistency.score },
                        { label: 'Partners', score: scoutReport.sections.partnerships.score },
                        { label: 'Brand Safe', score: scoutReport.sections.brandSafety.score },
                      ].map(item => (
                        <div key={item.label} className="text-center p-2 bg-gray-50 rounded">
                          <div className={`text-lg font-bold ${item.score >= 70 ? 'text-green-600' : item.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {item.score}
                          </div>
                          <div className="text-[10px] text-gray-500">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tier & Recommendation */}
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-800">
                        Tier: {scoutReport.sections.tierClassification.tier.toUpperCase()}
                      </span>
                      <span className="text-xs text-indigo-600">
                        {scoutReport.sections.tierClassification.justification}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-700">{scoutReport.recommendation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>Select a contact for Terry to evaluate</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DAZZA VIEW */}
      {activeAgent === 'dazza' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact List */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="p-3 bg-yellow-50 border-b">
              <h3 className="font-semibold text-yellow-800 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Dazza&apos;s Deals
              </h3>
              <p className="text-xs text-yellow-600">Click to price a deal</p>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y">
              {contacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => runDazzaAnalysis(contact)}
                  className={`w-full p-3 text-left hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-yellow-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.followerCount?.toLocaleString() || '?'} followers</div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {contact.tier || '—'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Deal Analysis */}
          <div className="lg:col-span-2 bg-white rounded-lg border overflow-hidden">
            {dealAnalysis ? (
              <div>
                <div className="p-4 bg-yellow-50 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{dealAnalysis.contactName}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">
                        ${dealAnalysis.recommendedRate.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Recommended Rate ({dealAnalysis.currency})</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* Rate Range */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Rate Range</span>
                      <span className="text-sm text-gray-500">
                        ${dealAnalysis.rateRange.min.toLocaleString()} — ${dealAnalysis.rateRange.max.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${((dealAnalysis.recommendedRate - dealAnalysis.rateRange.min) / (dealAnalysis.rateRange.max - dealAnalysis.rateRange.min)) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{dealAnalysis.rateJustification}</p>
                  </div>

                  {/* Invoice Breakdown */}
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <h4 className="font-medium text-green-800 text-sm mb-2">Invoice Recommendation</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Gross Fee (brand pays)</span>
                        <span className="font-bold">${dealAnalysis.invoiceRecommendation.grossFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-red-600">
                        <span>Your Commission (20%)</span>
                        <span className="font-bold">${dealAnalysis.invoiceRecommendation.commission.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-700">
                        <span>Talent Receives (80%)</span>
                        <span className="font-bold">${dealAnalysis.invoiceRecommendation.talentFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 pt-1 border-t">
                        <span>Payment Terms</span>
                        <span>{dealAnalysis.invoiceRecommendation.paymentTerms}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deal Insights */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Dazza&apos;s Insights</h4>
                    <ul className="space-y-1">
                      {dealAnalysis.dealInsights.map((insight, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                          <Zap className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Negotiation Tips */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 text-sm mb-2">Negotiation Tips</h4>
                    <ul className="space-y-1">
                      {dealAnalysis.negotiationTips.map((tip, i) => (
                        <li key={i} className="text-xs text-blue-700">💡 {tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk & Fit */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-bold">{dealAnalysis.briefFit}%</div>
                      <div className="text-[10px] text-gray-500">Brief Fit</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className={`text-sm font-bold ${dealAnalysis.riskLevel === 'low' ? 'text-green-600' : dealAnalysis.riskLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {dealAnalysis.riskLevel.toUpperCase()}
                      </div>
                      <div className="text-[10px] text-gray-500">Risk</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-bold text-indigo-600">{dealAnalysis.profitMargin.toFixed(0)}%</div>
                      <div className="text-[10px] text-gray-500">Margin</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <DollarSign className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>Select a contact for Dazza to price</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* C-SUITE VIEW */}
      {activeAgent === 'csuite' && (
        <div className="space-y-4">
          {csuiteInsights.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">{csuiteInsights.filter(i => i.role === 'ceo').length}</div>
                  <div className="text-xs text-gray-500">📈 CEO Insights</div>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">{csuiteInsights.filter(i => i.role === 'cto').length}</div>
                  <div className="text-xs text-gray-500">⚙️ CTO Insights</div>
                </div>
                <div className="bg-white rounded-lg border p-4 text-center">
                  <div className="text-2xl font-bold">{csuiteInsights.filter(i => i.role === 'cmo').length}</div>
                  <div className="text-xs text-gray-500">📣 CMO Insights</div>
                </div>
              </div>

              {csuiteInsights.map((insight, i) => (
                <div key={i} className="bg-white rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getRoleEmoji(insight.role)}</span>
                      <span className="font-medium text-sm text-gray-800">{insight.role.toUpperCase()} — {insight.category}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyStyle(insight.urgency)}`}>
                      {insight.urgency.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{insight.insight}</p>
                  <p className="text-sm text-indigo-700 font-medium">→ {insight.recommendation}</p>
                  {insight.dataPoint && (
                    <p className="text-xs text-gray-500 mt-1">📊 {insight.dataPoint}</p>
                  )}
                  {insight.impactEstimate && (
                    <p className="text-xs text-green-600 mt-1">💰 {insight.impactEstimate}</p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center text-gray-400">
              <Brain className="w-10 h-10 mx-auto mb-3 opacity-50" />
              <p>Click the C-Suite tab to generate cross-platform advisory insights</p>
              <p className="text-xs mt-1">Analyses all {contacts.length} contacts and provides CEO, CTO, CMO recommendations</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
