'use client';

import React, { useState } from 'react';
import FounderGuard from '@/components/FounderGuard';
import { Send, Eye, Edit3, CheckCircle, AlertCircle, ArrowRight, Clock, User, Building2 } from 'lucide-react';

type StepStatus = 'pending' | 'ready' | 'sent' | 'done';
type Recipient = 'creator' | 'brand';

interface WorkflowStep {
  id: string;
  order: number;
  label: string;
  recipient: Recipient;
  status: StepStatus;
  description: string;
  to: string;
  subject: string;
  body: string;
  dependsOn?: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'creator-summary',
    order: 1,
    label: 'Meeting Summary',
    recipient: 'creator',
    status: 'ready',
    description: 'Send Jacob the call summary with content ideas, agreements, and next steps.',
    to: 'jacob_tabor@outlook.com',
    subject: 'Our chat — summary + next steps | Mobileyes',
    body: `Hey Jacob,

Great chat today. Here's a quick summary of what we discussed and the plan forward.

---

WHAT WE AGREED

1. Long-form frequency: 1 video every 1–2 months. Quality over quantity.
2. Affiliate-first approach: Low-risk. Links in descriptions. You earn a cut on sales. Zero extra work.
3. Non-exclusive: 20% commission. Leave anytime, 14 days notice.
4. Pilot project: One "rig rundown" video. We start there and see how it feels.

---

CONTENT IDEAS

• Custom rig rundown — showcase new flight sim gear in use during DCS gameplay
• Organic integration — brand content feels like natural gameplay, not an ad
• Military tech analogies — your RAAF background makes gear recs uniquely credible
• Flight Sim Expo content — physical presence + video = powerful

---

YOUR RULES (Noted & Respected)

✅ Must include genuine DCS gameplay
✅ Both you AND your audience benefit
❌ No "scummy" products
❌ No forced formats (no more hand-cam situations)
✅ Audience trust comes first. Always.

---

THE PILOT

• One rig rundown video featuring P1 Sim Gear equipment
• They ship you gear. You try it. You make a video with it in DCS.
• One video. See how it goes. No lock-in.
• Revenue: affiliate on sales + working on retainer for ongoing

---

NEXT STEPS

From me:
□ Send you the non-exclusive agreement (next email)
□ Brief the hardware partner + confirm gear shipping
□ Set up affiliate tracking

From you:
□ Review + sign the agreement (2 min, no lock-in)
□ Share any DCS creator Discord contacts you'd recommend
□ Let me know availability once gear arrives

---

If this pilot works: ongoing income, compounding affiliate, and a route out of corporate when you're ready. But zero pressure — one video first.

Questions? Reply here anytime.

Cheers,
Joel Kirk
Mobileyes · admin@mobileyes.live`,
  },
  {
    id: 'creator-agreement',
    order: 2,
    label: 'Talent Agreement',
    recipient: 'creator',
    status: 'pending',
    description: 'Send the agreement link + payment details form. Send after Step 1.',
    to: 'jacob_tabor@outlook.com',
    subject: 'Mobileyes Agreement — quick sign | Joel',
    dependsOn: 'creator-summary',
    body: `Hey Jacob,

Following up from the summary — here's the agreement to review and sign:

👉 https://gamefluence.com.au/talent-signup

Key points:
• Non-exclusive — work with anyone else
• 20% commission on deals we bring you
• 14 days notice to exit anytime
• You own all your content, always

Takes ~2 minutes. Once signed, I'll get Neil confirmed and gear shipping sorted.

After signing, there's a quick payment form so we can pay you fast:
👉 https://gamefluence.com.au/pay-details?email=jacob_tabor@outlook.com

The hardware partner is ready to move — the sooner we lock in, the sooner gear ships your way.

Cheers,
Joel`,
  },
  {
    id: 'brand-brief',
    order: 3,
    label: 'Pilot Brief',
    recipient: 'brand',
    status: 'pending',
    description: 'Send Neil the reverse brief for the pilot campaign. Send after Jacob signs.',
    to: '',
    subject: 'P1 × Jacob Tabor — Pilot Campaign Brief | Mobileyes',
    dependsOn: 'creator-agreement',
    body: `Hey Neil,

Good news — Jacob is keen. He's reviewing the agreement now.

Here's the pilot plan:

THE VIDEO
• One "rig rundown" — Jacob showcases P1 gear in use during DCS gameplay
• Not scripted — genuine content, his style, his audience
• His reach: 250K YouTube + 750K IG + 750K TikTok = serious flight sim buyers

WHAT I NEED FROM YOU
1. Confirm you're keen on the pilot approach
2. Confirm which products to ship (Fighter Pilot Pack recommended)
3. Set up promo code "JACOBDCS" in Shopify
4. Ship to Port Stephens, NSW (address coming once he signs)

YOUR COST (Pilot Only)
• Product supply: ~$3,099 (Jacob keeps — cost of acquisition)
• Pilot management fee: $750 (one-time)
• Total: ~$3,849

WHAT YOU GET
• Video reaching 250K+ potential viewers
• Permanent affiliate link earning forever
• Promo code attribution — see exactly which sales come from Jacob
• Proof of concept — if it works, we scale to monthly retainer

No long-term commitment. One video. Measure results. Grow from there.

Let me know if you're good to go.

Cheers,
Joel Kirk
Mobileyes · admin@mobileyes.live`,
  },
  {
    id: 'brand-confirm',
    order: 4,
    label: 'Gear Shipping Confirm',
    recipient: 'brand',
    status: 'pending',
    description: 'Confirm shipping details with Neil once Jacob is signed.',
    to: '',
    subject: 'Jacob signed — shipping details for P1 gear | Mobileyes',
    dependsOn: 'brand-brief',
    body: `Hey Neil,

Jacob has signed the agreement. Ready to ship gear.

SHIPPING DETAILS
• Name: Jacob Tabor
• Location: Port Stephens / Newcastle area, NSW
• [I'll confirm exact address with Jacob and update you]

WHAT TO SHIP
• Fighter Pilot Pack (or confirmed product)
• Include any setup instructions or quick-start guide

PROMO CODE
• Please set up "JACOBDCS" in Shopify — no discount required, tracking only
• Or if you want to offer 5% buyer incentive, that works too

Once gear arrives, Jacob will produce the rig rundown within 2–4 weeks (flexible — his schedule).

I'll keep you posted on progress.

Cheers,
Joel`,
  },
  {
    id: 'creator-pay-confirm',
    order: 5,
    label: 'Payment Confirmed',
    recipient: 'creator',
    status: 'pending',
    description: 'Confirm payment details received + gear is shipping.',
    to: 'jacob_tabor@outlook.com',
    subject: 'All set — gear on its way | Mobileyes',
    dependsOn: 'brand-confirm',
    body: `Hey Jacob,

Quick update:

✅ Agreement signed — you're officially represented
✅ Payment details received — you'll be paid within 4 business days of post verification
✅ Gear confirmed — P1 is shipping the Fighter Pilot Pack to you

Once it arrives, take your time. No deadline. When you're ready to film, let me know and I'll make sure the tracking links + promo code are live.

The brief is simple: plug it in, fly with it, film a rig rundown. Your style, your way. If you love the gear, say so. If something could be better, say that too. Authentic = converts.

Talk soon,
Joel`,
  },
];

export default function SendEmailPage() {
  const [steps, setSteps] = useState<WorkflowStep[]>(WORKFLOW_STEPS);
  const [activeStep, setActiveStep] = useState<WorkflowStep>(WORKFLOW_STEPS[0]);
  const [to, setTo] = useState(WORKFLOW_STEPS[0].to);
  const [subject, setSubject] = useState(WORKFLOW_STEPS[0].subject);
  const [body, setBody] = useState(WORKFLOW_STEPS[0].body);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const loadStep = (step: WorkflowStep) => {
    setActiveStep(step);
    setTo(step.to);
    setSubject(step.subject);
    setBody(step.body);
    setSent(false);
    setError('');
  };

  const handleSend = async () => {
    if (!to || !subject || !body) { setError('All fields required'); return; }
    setSending(true); setError('');
    try {
      const res = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to, subject, body }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setSent(true);
      setSteps(prev => prev.map(s => s.id === activeStep.id ? { ...s, status: 'sent' as StepStatus } : s));
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
    finally { setSending(false); }
  };

  return (
    <FounderGuard requireFounder>
      <div className="min-h-screen bg-[#0D0D0D] text-white p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Email Workflow</h1>
          <p className="text-gray-400 text-sm mb-6">Process-driven emails. Each step unlocks the next. Edit before sending.</p>

          {/* Pipeline */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Deal Pipeline — Jacob × P1</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {steps.map((step) => (
                <button key={step.id} onClick={() => loadStep(step)}
                  className={`p-3 rounded-lg text-left transition border ${
                    activeStep.id === step.id ? 'border-purple-500/50 bg-purple-500/10' :
                    step.status === 'sent' ? 'border-green-500/30 bg-green-500/5' :
                    'border-white/5 bg-white/5 hover:bg-white/10'
                  }`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    {step.recipient === 'creator' ? <User className="w-3 h-3 text-blue-400" /> : <Building2 className="w-3 h-3 text-amber-400" />}
                    <span className="text-[10px] font-mono text-gray-500">{step.order}</span>
                  </div>
                  <p className="text-xs font-medium text-white/90 leading-tight">{step.label}</p>
                  <p className="text-[10px] mt-1 text-gray-500">
                    {step.status === 'sent' ? '✓ Sent' : step.status === 'ready' ? '● Ready' : '○ Pending'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep.recipient === 'creator' ? 'bg-blue-500/20' : 'bg-amber-500/20'}`}>
              {activeStep.recipient === 'creator' ? <User className="w-4 h-4 text-blue-400" /> : <Building2 className="w-4 h-4 text-amber-400" />}
            </div>
            <div>
              <p className="text-sm font-medium">Step {activeStep.order}: {activeStep.label}</p>
              <p className="text-xs text-gray-400">{activeStep.description}</p>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-4">
            <button onClick={() => setMode('edit')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium ${mode === 'edit' ? 'bg-white/10 text-white' : 'text-white/40'}`}><Edit3 className="w-3 h-3" /> Edit</button>
            <button onClick={() => setMode('preview')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium ${mode === 'preview' ? 'bg-white/10 text-white' : 'text-white/40'}`}><Eye className="w-3 h-3" /> Preview</button>
          </div>

          {mode === 'edit' ? (
            <div className="space-y-4">
              <div><label className="block text-xs text-gray-400 mb-1">To</label><input value={to} onChange={e => setTo(e.target.value)} className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Subject</label><input value={subject} onChange={e => setSubject(e.target.value)} className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Body</label><textarea value={body} onChange={e => setBody(e.target.value)} rows={18} className="w-full bg-[#161616] border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-purple-500 resize-y" /></div>
            </div>
          ) : (
            <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-1">To: <span className="text-white">{to}</span></p>
              <p className="text-xs text-gray-400 mb-4">Subject: <span className="text-white font-medium">{subject}</span></p>
              <div className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{body}</div>
            </div>
          )}

          {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /><span className="text-red-400 text-sm">{error}</span></div>}
          {sent && <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /><span className="text-green-400 text-sm">Sent to {to} ✓</span></div>}

          <button onClick={handleSend} disabled={sending || sent}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> {sending ? 'Sending...' : sent ? 'Sent ✓' : `Send to ${activeStep.recipient === 'creator' ? 'Jacob' : 'Neil'}`}
          </button>
        </div>
      </div>
    </FounderGuard>
  );
}
