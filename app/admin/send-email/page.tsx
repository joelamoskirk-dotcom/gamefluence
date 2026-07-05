'use client';

import React, { useState } from 'react';
import FounderGuard from '@/components/FounderGuard';
import { Send, Eye, Edit3, CheckCircle, AlertCircle } from 'lucide-react';

interface EmailDraft {
  id: string;
  label: string;
  to: string;
  subject: string;
  body: string;
}

const DRAFTS: EmailDraft[] = [
  {
    id: 'jacob-summary',
    label: 'Jacob — Meeting Summary + Next Steps',
    to: 'jacob_tabor@outlook.com',
    subject: 'Our chat — summary + next steps | Mobileyes',
    body: `Hey Jacob,

Great chat today. Here's a summary of what we discussed, the content ideas, and next steps for you to review.

---

WHAT WE AGREED

1. Long-form frequency: 1 video every 1–2 months. No pressure beyond that — quality over quantity.
2. Affiliate-first approach: Low-risk monetization. Links in descriptions, pinned comments. You earn a cut on any sales your audience drives. Zero extra work.
3. Non-exclusive partnership: 20% commission on revenue. Leave anytime with 14 days notice. No lock-in.
4. Pilot project: One "rig rundown" video featuring new flight sim equipment. We start there and see how it feels.

---

CONTENT IDEAS (From Our Discussion)

• Custom rig rundown — showcase a new flight sim rig, your setup, how each piece integrates with DCS gameplay
• Organic integration — any brand content must feel like natural gameplay. Use analogies between real military tech and the gear
• Face reveal timing — when you're ready, it's a powerful content moment. No rush.
• Flight Sim Expo appearances — physical presence + content = powerful brand partnership angle
• Facebook expansion — you mentioned considering it for additional reach

---

CONTENT ETHICS (What I Heard)

✅ Ads must be organically integrated into DCS gameplay
✅ Both you AND your audience should benefit from any deal
❌ No "scummy" products or pure cash grabs
❌ No burdensome production requirements (no more hand-cam situations)
✅ Your trust with your audience comes first. Always.

---

THE PILOT

• What: A rig rundown video featuring flight sim equipment from an AU-based hardware retailer
• How: They ship you gear. You try it. You make a video showing it in use during real DCS gameplay.
• Your commitment: One video. See how it goes. No multi-month lock-in.
• Revenue: Affiliate on any sales + we're working on a retainer structure for ongoing

---

NEXT STEPS

For me (Joel):
□ Send you the non-exclusive representation agreement (coming today)
□ Brief the hardware partner and get gear shipping confirmed
□ Set up affiliate tracking / promo code

For you (Jacob):
□ Review the agreement when it arrives (quick read, no lock-in)
□ Share Discord contacts for any DCS creators you'd recommend
□ Let me know your availability window for the pilot video once gear arrives

---

The bigger picture: if this works, you've got ongoing retainer income, compounding affiliate revenue, and a route out of corporate if/when you decide content is the full-time move. But zero pressure — start with one video and see how it feels.

Questions? Just reply here or message me anytime.

Cheers,
Joel Kirk
Mobileyes · admin@mobileyes.live`,
  },
  {
    id: 'jacob-agreement',
    label: 'Jacob — Talent Agreement Link',
    to: 'jacob_tabor@outlook.com',
    subject: 'Mobileyes Talent Agreement — quick sign | Joel',
    body: `Hey Jacob,

As discussed — here's the talent representation agreement for you to review and sign:

https://gamefluence.com.au/talent-signup

Key points:
• Non-exclusive — you can work with anyone else
• 20% commission on deals we bring you
• 14 days notice to exit anytime
• You own all your content, always

Takes about 2 minutes to fill in. Once signed, I'll get the gear partner confirmed and shipping sorted.

After signing, there's a quick payment details form so we can pay you fast:
https://gamefluence.com.au/pay-details?email=jacob_tabor@outlook.com

No rush — but the hardware partner is ready to move, so the sooner we lock in, the sooner gear ships.

Cheers,
Joel`,
  },
  {
    id: 'neil-brief',
    label: 'Neil — Pilot Campaign Reverse Brief',
    to: '',
    subject: 'P1 × Jacob Tabor — Pilot Campaign Brief | Mobileyes',
    body: `Hey Neil,

Following our conversations — I've spoken with Jacob and he's keen to do a pilot video.

Here's the plan:

THE PILOT
• One "rig rundown" video — Jacob showcases a P1 flight sim setup in use during DCS gameplay
• Not a scripted ad — genuine content showing the gear integrated with flying
• His audience (250K YT, 750K IG, 750K TT) = serious flight sim hardware buyers

WHAT WE NEED FROM YOU
• Confirm you're keen on the pilot approach
• Confirm which P1 products to ship (Fighter Pilot Pack recommended)
• Set up promo code "JACOBDCS" in your Shopify
• Ship to Jacob in Port Stephens, NSW (I'll provide address once he signs)

YOUR INVESTMENT
• Product supply: ~$3,099 (Fighter Pilot Pack — Jacob keeps it)
• Pilot management fee: $750 (one-time)
• Total: ~$3,849

WHAT YOU GET
• One video reaching 250K+ potential viewers
• Permanent affiliate link in the video description
• Promo code attribution — see exactly which sales come from Jacob
• Proof of concept — if it drives $5K+ in sales within 30 days, we scale to monthly retainer

No long-term commitment. Ship gear, one video, measure results. If it works, we grow it.

Let me know if you're good to go and I'll get Jacob signed this week.

Cheers,
Joel Kirk
Mobileyes · admin@mobileyes.live`,
  },
];

export default function SendEmailPage() {
  const [selectedDraft, setSelectedDraft] = useState<EmailDraft>(DRAFTS[0]);
  const [to, setTo] = useState(DRAFTS[0].to);
  const [subject, setSubject] = useState(DRAFTS[0].subject);
  const [body, setBody] = useState(DRAFTS[0].body);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const loadDraft = (draft: EmailDraft) => {
    setSelectedDraft(draft);
    setTo(draft.to);
    setSubject(draft.subject);
    setBody(draft.body);
    setSent(false);
    setError('');
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      setError('All fields are required');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed');
    } finally {
      setSending(false);
    }
  };

  return (
    <FounderGuard requireFounder>
      <div className="min-h-screen bg-[#0D0D0D] text-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Send Email</h1>

          {/* Draft Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {DRAFTS.map(d => (
              <button key={d.id} onClick={() => loadDraft(d)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedDraft.id === d.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-[#161616] border border-white/10 text-white/60 hover:text-white'
                }`}>{d.label}</button>
            ))}
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => setMode('edit')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium ${mode === 'edit' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
              <Edit3 className="w-3 h-3" /> Edit
            </button>
            <button onClick={() => setMode('preview')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium ${mode === 'preview' ? 'bg-white/10 text-white' : 'text-white/40'}`}>
              <Eye className="w-3 h-3" /> Preview
            </button>
          </div>

          {mode === 'edit' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">To</label>
                <input value={to} onChange={e => setTo(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Subject</label>
                <input value={subject} onChange={e => setSubject(e.target.value)}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Body</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={20}
                  className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-purple-500 resize-y" />
              </div>
            </div>
          ) : (
            <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-1">To: <span className="text-white">{to}</span></p>
              <p className="text-xs text-gray-400 mb-4">Subject: <span className="text-white font-medium">{subject}</span></p>
              <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{body}</div>
            </div>
          )}

          {/* Status */}
          {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /><span className="text-red-400 text-sm">{error}</span></div>}
          {sent && <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-green-400 text-sm">Email sent successfully to {to}</span></div>}

          {/* Send Button */}
          <button onClick={handleSend} disabled={sending || sent}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            {sending ? 'Sending...' : sent ? 'Sent ✓' : 'Send Email'}
          </button>
        </div>
      </div>
    </FounderGuard>
  );
}
