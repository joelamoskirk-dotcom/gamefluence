'use client';

import React, { useState, useEffect } from 'react';
import FounderGuard from '@/components/FounderGuard';
import { Button } from '@/components/ui/Button';
import {
  Send, Mail, Clock, CheckCircle, AlertTriangle, Eye,
  ChevronDown, ChevronRight, RefreshCw, Search, Filter
} from 'lucide-react';
import {
  FROSTY_FEST_STUDIOS,
  type FrostyStudio
} from '@/lib/frosty-fest-au-studios';
import {
  IMMINENT_LAUNCH_SEQUENCE,
  FUNDED_STUDIO_SEQUENCE,
  VIRAL_POTENTIAL_SEQUENCE,
  type OutreachEmail,
  type OutreachSequence
} from '@/lib/au-studio-outreach-engine';

interface SentEmail {
  id: string;
  studioId: string;
  studioName: string;
  templateId: string;
  to: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'failed' | 'replied';
  messageId?: string;
}

const ALL_SEQUENCES: OutreachSequence[] = [
  IMMINENT_LAUNCH_SEQUENCE,
  FUNDED_STUDIO_SEQUENCE,
  VIRAL_POTENTIAL_SEQUENCE,
];

export default function OutreachPage() {
  const [studios, setStudios] = useState<FrostyStudio[]>(FROSTY_FEST_STUDIOS);
  const [selectedStudio, setSelectedStudio] = useState<FrostyStudio | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<OutreachSequence>(IMMINENT_LAUNCH_SEQUENCE);
  const [selectedEmail, setSelectedEmail] = useState<OutreachEmail | null>(null);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<number | null>(null);

  // Custom fields for personalization
  const [customTo, setCustomTo] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('outreachSentEmails') || '[]');
    setSentEmails(stored);
  }, []);

  // Filter studios
  const filteredStudios = studios.filter(s => {
    const matchesSearch = searchQuery === '' ||
      s.studioName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.gameTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === null || s.outreachPriority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const selectStudioAndPrepare = (studio: FrostyStudio) => {
    setSelectedStudio(studio);
    setSendResult(null);

    // Auto-select best sequence based on studio attributes
    if (studio.urgency === 'immediate') {
      setSelectedSequence(IMMINENT_LAUNCH_SEQUENCE);
    } else if (studio.estimatedBudget === 'funded' || studio.estimatedBudget === 'medium') {
      setSelectedSequence(FUNDED_STUDIO_SEQUENCE);
    } else if (studio.streamPotential === 'high') {
      setSelectedSequence(VIRAL_POTENTIAL_SEQUENCE);
    }

    const email = selectedSequence.emails[0];
    if (email) {
      setSelectedEmail(email);
      populateTemplate(email, studio);
    }
  };

  const populateTemplate = (email: OutreachEmail, studio: FrostyStudio) => {
    setCustomTo(studio.contactEmail || '');
    setCustomSubject(
      email.subject
        .replace('{{game_title}}', studio.gameTitle)
        .replace('{{studio_name}}', studio.studioName)
    );
    setCustomBody(
      email.body
        .replace(/\{\{game_title\}\}/g, studio.gameTitle)
        .replace(/\{\{studio_name\}\}/g, studio.studioName)
        .replace(/\{\{contact_name\}\}/g, studio.contactName || 'there')
        .replace(/\{\{specific_compliment\}\}/g, studio.creatorFitReason)
        .replace(/\{\{specific_insight_about_game\}\}/g, studio.creatorFitReason)
        .replace(/\{\{launch_context\}\}/g, studio.releaseDate ? `on ${studio.releaseDate}` : (studio.releaseWindow || 'soon'))
        .replace(/\{\{days_until_launch\}\}/g, studio.releaseDate
          ? String(Math.max(0, Math.ceil((new Date(studio.releaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))))
          : '??')
        .replace(/\{\{viral_reason\}\}/g, studio.creatorFitReason)
    );
  };

  const handleSend = async () => {
    if (!customTo || !customSubject || !customBody) {
      setSendResult({ success: false, message: 'Please fill in To, Subject, and Body fields.' });
      return;
    }

    setSending(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: customTo,
          subject: customSubject,
          body: customBody,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const sentRecord: SentEmail = {
          id: data.messageId || `sent-${Date.now()}`,
          studioId: selectedStudio?.id || 'manual',
          studioName: selectedStudio?.studioName || 'Manual Send',
          templateId: selectedEmail?.id || 'custom',
          to: customTo,
          subject: customSubject,
          sentAt: new Date().toISOString(),
          status: 'sent',
          messageId: data.messageId,
        };

        const updated = [sentRecord, ...sentEmails];
        setSentEmails(updated);
        localStorage.setItem('outreachSentEmails', JSON.stringify(updated));
        setSendResult({ success: true, message: `Email sent successfully! Message ID: ${data.messageId}` });

        // Update studio outreach status in local state
        if (selectedStudio) {
          setStudios(prev => prev.map(s =>
            s.id === selectedStudio.id ? { ...s, outreachStatus: 'email_sent' as const } : s
          ));
        }
      } else {
        setSendResult({ success: false, message: data.error || 'Failed to send email' });
      }
    } catch (err) {
      setSendResult({ success: false, message: `Network error: ${err instanceof Error ? err.message : 'Unknown'}` });
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: FrostyStudio['outreachStatus']) => {
    const styles: Record<string, string> = {
      not_contacted: 'bg-gray-100 text-gray-600',
      researching: 'bg-yellow-100 text-yellow-700',
      email_sent: 'bg-blue-100 text-blue-700',
      replied: 'bg-green-100 text-green-700',
      meeting_booked: 'bg-purple-100 text-purple-700',
      closed: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <FounderGuard requireFounder={true}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Outreach Email Sender
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Send templated outreach emails to Frosty Fest studios via Resend
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-xs text-gray-500">
                <div>Sent: <span className="font-bold text-gray-700">{sentEmails.filter(e => e.status === 'sent').length}</span></div>
                <div>Replied: <span className="font-bold text-green-600">{sentEmails.filter(e => e.status === 'replied').length}</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Studio List */}
            <div className="lg:col-span-4 space-y-4">
              {/* Search & Filter */}
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search studios..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <select
                    value={filterPriority ?? ''}
                    onChange={(e) => setFilterPriority(e.target.value ? Number(e.target.value) : null)}
                    className="text-sm border rounded-lg px-2 py-2"
                  >
                    <option value="">All</option>
                    <option value="1">P1</option>
                    <option value="2">P2</option>
                    <option value="3">P3</option>
                  </select>
                </div>

                <p className="text-xs text-gray-500">{filteredStudios.length} studios</p>
              </div>

              {/* Studio Cards */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredStudios.map(studio => (
                  <button
                    key={studio.id}
                    onClick={() => selectStudioAndPrepare(studio)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedStudio?.id === studio.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{studio.studioName}</p>
                        <p className="text-xs text-gray-500 truncate">{studio.gameTitle} • {studio.genre}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          studio.outreachPriority === 1 ? 'bg-red-100 text-red-700' :
                          studio.outreachPriority === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          P{studio.outreachPriority}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${getStatusBadge(studio.outreachStatus)}`}>
                          {studio.outreachStatus.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    {studio.releaseDate && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        📅 {studio.releaseDate}
                        {(() => {
                          const days = Math.ceil((new Date(studio.releaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                          return days > 0 ? ` (${days} days)` : ' (launched)';
                        })()}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Email Composer */}
            <div className="lg:col-span-8 space-y-4">
              {/* Sequence Selector */}
              <div className="bg-white rounded-xl p-4 border shadow-sm">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Sequence</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {ALL_SEQUENCES.map(seq => (
                    <button
                      key={seq.name}
                      onClick={() => {
                        setSelectedSequence(seq);
                        if (seq.emails[0] && selectedStudio) {
                          setSelectedEmail(seq.emails[0]);
                          populateTemplate(seq.emails[0], selectedStudio);
                        }
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        selectedSequence.name === seq.name
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {seq.name.replace('Frosty Fest — ', '')}
                    </button>
                  ))}
                </div>

                {/* Email step selector */}
                <div className="flex gap-2 mt-3">
                  {selectedSequence.emails.map((email, i) => (
                    <button
                      key={email.id}
                      onClick={() => {
                        setSelectedEmail(email);
                        if (selectedStudio) populateTemplate(email, selectedStudio);
                      }}
                      className={`text-xs px-3 py-1 rounded border transition-all ${
                        selectedEmail?.id === email.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      Email {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compose Area */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500">To</label>
                      <input
                        type="email"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        placeholder="recipient@email.com"
                        className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Subject</label>
                      <input
                        type="text"
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        placeholder="Email subject..."
                        className="w-full mt-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <textarea
                    value={customBody}
                    onChange={(e) => setCustomBody(e.target.value)}
                    rows={16}
                    className="w-full text-sm border rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y font-mono leading-relaxed"
                    placeholder="Email body..."
                  />
                </div>

                {/* Actions */}
                <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {sendResult && (
                      <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${
                        sendResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {sendResult.success ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {sendResult.message}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button
                      onClick={handleSend}
                      disabled={sending || !customTo || !customSubject || !customBody}
                      className="text-xs bg-primary hover:bg-primary/90"
                    >
                      {sending ? (
                        <>
                          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 mr-1" />
                          Send Email
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sent History */}
              {sentEmails.length > 0 && (
                <div className="bg-white rounded-xl p-4 border shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Sent History ({sentEmails.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sentEmails.map(email => (
                      <div key={email.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 text-xs">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-800 truncate">{email.studioName}</p>
                          <p className="text-gray-500 truncate">{email.subject}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            email.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                            email.status === 'replied' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {email.status}
                          </span>
                          <span className="text-gray-400">
                            {new Date(email.sentAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FounderGuard>
  );
}
