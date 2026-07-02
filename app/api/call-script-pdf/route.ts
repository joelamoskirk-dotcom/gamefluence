import { NextResponse } from 'next/server';

// Generate a branded call script PDF using HTML-to-PDF rendering
// This generates a printable, phone-friendly version of the call script

export async function GET() {
  const html = generateCallScriptHTML();

  // Return as downloadable HTML file styled for print/PDF
  // User can print-to-PDF from browser, or use on phone as formatted page
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': 'inline; filename="Mobileyes-Call-Script-Jacob-Tabor.html"',
    },
  });
}

function generateCallScriptHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobileyes — Jacob Tabor Call Script</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
      background: #fff;
    }
    @media print {
      body { padding: 10px; font-size: 11px; }
      .no-print { display: none; }
      .page-break { page-break-before: always; }
    }
    @media (max-width: 600px) {
      body { padding: 12px; font-size: 13px; }
    }
    .header {
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      color: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 22px; font-weight: 700; }
    .header p { opacity: 0.85; font-size: 13px; margin-top: 4px; }
    .header .meta { margin-top: 12px; font-size: 12px; opacity: 0.7; }
    .section {
      margin-bottom: 20px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
    }
    .section-header {
      background: #f9fafb;
      padding: 10px 16px;
      font-weight: 700;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
    }
    .section-body { padding: 16px; }
    .key-line {
      background: #eff6ff;
      border-left: 3px solid #3b82f6;
      padding: 10px 14px;
      margin-bottom: 10px;
      border-radius: 0 6px 6px 0;
      font-size: 13px;
    }
    .key-line strong { color: #1e40af; font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 2px; }
    .checklist { list-style: none; padding: 0; }
    .checklist li {
      padding: 6px 0;
      border-bottom: 1px solid #f3f4f6;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .checklist li:last-child { border-bottom: none; }
    .checkbox { width: 16px; height: 16px; border: 2px solid #d1d5db; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
    .objection-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .objection-table td { padding: 8px; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
    .objection-table td:first-child { font-weight: 600; color: #dc2626; width: 35%; }
    .objection-table td:last-child { color: #166534; }
    .numbers-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .numbers-table td { padding: 6px 8px; border-bottom: 1px solid #f3f4f6; }
    .numbers-table td:first-child { font-weight: 500; }
    .numbers-table td:nth-child(2) { font-weight: 700; }
    .numbers-table td:last-child { color: #6b7280; font-size: 11px; }
    .close-box {
      background: linear-gradient(135deg, #065f46, #10b981);
      color: white;
      padding: 16px;
      border-radius: 10px;
      margin-top: 16px;
    }
    .close-box h3 { font-size: 14px; margin-bottom: 8px; }
    .close-box p { font-size: 13px; opacity: 0.95; font-style: italic; }
    .print-btn {
      display: block;
      width: 100%;
      padding: 12px;
      background: #1e40af;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .print-btn:hover { background: #1e3a8a; }
    .warning {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 12px;
      color: #92400e;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">📄 Save as PDF (Print)</button>

  <div class="header">
    <h1>Jacob Tabor — Call Script</h1>
    <p>Jul 3, 2026 @ 11:00 AM · Managed by Mobileyes</p>
    <div class="meta">Prepared by Mobileyes · admin@mobileyes.live · Confidential</div>
  </div>

  <div class="warning">
    ⚠️ INTERNAL ONLY — Do not share. Numbers marked "say" vs "know" below.
  </div>

  <div class="section">
    <div class="section-header">📞 Phase 1: Rapport (3 min)</div>
    <div class="section-body">
      <div class="key-line">
        <strong>Opener</strong>
        "Hey Jacob, thanks for making time. I run Mobileyes — we find hardware brand deals for live video creators in AU. I've been watching DCS content and the flight sim space — your community is incredible."
      </div>
      <div class="key-line">
        <strong>Transition</strong>
        "I wanted to chat because I've got a specific opportunity that might fit you."
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-header">🔍 Phase 2: Discovery (8 min)</div>
    <div class="section-body">
      <ul class="checklist">
        <li><div class="checkbox"></div>What's your main channel? YouTube, Twitch, Kick — or a mix?</li>
        <li><div class="checkbox"></div>How often are you posting? What's your rhythm?</li>
        <li><div class="checkbox"></div>What does your audience engage with most?</li>
        <li><div class="checkbox"></div>What's your current setup? HOTAS/pedals/cockpit?</li>
        <li><div class="checkbox"></div>Have you ever been paid for content or approached by brands?</li>
        <li><div class="checkbox"></div>Is content creation something you're looking to grow into income?</li>
        <li><div class="checkbox"></div>What would an ideal brand partnership look like?</li>
        <li><div class="checkbox"></div>What would feel wrong or uncomfortable about a brand deal?</li>
        <li><div class="checkbox"></div>How does your DCS audience react to gear recommendations?</li>
        <li><div class="checkbox"></div><strong>Gateway:</strong> Who else in DCS creates content? Anyone you'd recommend?</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <div class="section-header">🎯 Phase 3: The Pitch (5 min)</div>
    <div class="section-body">
      <div class="key-line">
        <strong>Setup</strong>
        "I've got a relationship with an AU-based flight sim hardware retailer. They want to reach the DCS audience through someone who uses this gear every day."
      </div>
      <ul class="checklist">
        <li><div class="checkbox"></div>✅ 4 posts a month — one per week, built around content you'd make anyway</li>
        <li><div class="checkbox"></div>✅ Keep doing normal DCS content between paid posts</li>
        <li><div class="checkbox"></div>✅ Free gear shipped — yours to keep</li>
        <li><div class="checkbox"></div>✅ Paid within 4 business days of each post going live</li>
        <li><div class="checkbox"></div>✅ Affiliate code — earn a cut forever</li>
        <li><div class="checkbox"></div>✅ Non-exclusive — 14 days notice if you want out</li>
        <li><div class="checkbox"></div>✅ I handle everything — brand, brief, invoicing, reporting</li>
      </ul>
    </div>
  </div>

  <div class="section page-break">
    <div class="section-header">🛡️ Phase 4: Objection Handling</div>
    <div class="section-body">
      <table class="objection-table">
        <tr><td>"Never done brand deals"</td><td>→ "That's ideal — first integration always converts highest."</td></tr>
        <tr><td>"Don't want to sell out"</td><td>→ "1 post/week is paid. Other 3-4 are pure DCS."</td></tr>
        <tr><td>"What if gear's not good?"</td><td>→ "You try first. If not up to standard, we don't feature it."</td></tr>
        <tr><td>"How much?"</td><td>→ "Around $4,800/month for 4 posts, plus affiliate."</td></tr>
        <tr><td>"What's the catch?"</td><td>→ "Non-exclusive. 14 days notice. You own all content."</td></tr>
        <tr><td>"Need to think"</td><td>→ "Totally. Brand's ready to move — let's lock this week."</td></tr>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="section-header">🏁 Phase 5: Close (2 min)</div>
    <div class="section-body">
      <div class="close-box">
        <h3>The Close</h3>
        <p>"The worst case: you get free flight sim gear, try it, and if you don't like working with brands, give me 14 days notice and keep the gear."</p>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-header">🔢 Numbers Cheat Sheet (Your Eyes Only)</div>
    <div class="section-body">
      <table class="numbers-table">
        <tr><td>His fee</td><td>$4,800/mo</td><td>Say "around $4,800"</td></tr>
        <tr><td>Posts</td><td>4/month</td><td>Say "one a week"</td></tr>
        <tr><td>Affiliate</td><td>$500/rig sold</td><td>Say "a few hundred per sale"</td></tr>
        <tr><td>Payment</td><td>4 biz days</td><td>Say "paid within 4 days"</td></tr>
        <tr><td>Notice</td><td>14 days</td><td>Say "leave anytime"</td></tr>
        <tr><td>Your commission</td><td>20% ($1,200)</td><td>Only if asked directly</td></tr>
        <tr><td>Brand</td><td>P1 Sim Gear, Neil, QLD</td><td>"AU flight sim hardware retailer"</td></tr>
        <tr><td>Total brand spend</td><td>$8K/month</td><td>NEVER share</td></tr>
        <tr><td>Your total take</td><td>$2,700/mo + affiliate</td><td>NEVER share</td></tr>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="section-header">✅ Integration Checklist (Ask During Call)</div>
    <div class="section-body">
      <ul class="checklist">
        <li><div class="checkbox"></div>Promo code in description (JACOBDCS)</li>
        <li><div class="checkbox"></div>Promo code spoken in video</li>
        <li><div class="checkbox"></div>Pinned comment with link</li>
        <li><div class="checkbox"></div>Chat command for live streams</li>
        <li><div class="checkbox"></div>Link in bio/about</li>
        <li><div class="checkbox"></div>Video description link</li>
        <li><div class="checkbox"></div>Dedicated landing page</li>
        <li><div class="checkbox"></div>Discord server pin</li>
      </ul>
      <div class="key-line" style="margin-top: 12px;">
        <strong>Ask</strong>
        "How do you normally link stuff for your audience? Description? Pinned comment? Do you do live streams where we could set up a chat command?"
      </div>
    </div>
  </div>

</body>
</html>`;
}
