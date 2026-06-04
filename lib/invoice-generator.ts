// Invoice Generator — Gamefluence
// Generates invoice data for campaigns (rendered as HTML for PDF export)

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  // From
  from: {
    company: string;
    abn: string;
    address: string;
    email: string;
  };
  // To
  to: {
    company: string;
    contactName: string;
    email: string;
    address?: string;
  };
  // Line items
  items: InvoiceLineItem[];
  // Totals
  subtotal: number;
  gst: number; // 10% for AU
  total: number;
  currency: string;
  // Campaign details
  campaignId?: string;
  campaignName?: string;
  creators?: string[];
  // Payment
  paymentTerms: string;
  bankDetails: {
    accountName: string;
    bsb: string;
    accountNumber: string;
  };
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// ── INVOICE NUMBER GENERATOR ──────────────────────────────────────────────────

let invoiceCounter = 1;

export function generateInvoiceNumber(): string {
  const prefix = 'GF';
  const year = new Date().getFullYear();
  const num = String(invoiceCounter++).padStart(4, '0');
  return `${prefix}-${year}-${num}`;
}

// ── CREATE INVOICE ────────────────────────────────────────────────────────────

export function createCampaignInvoice(params: {
  clientCompany: string;
  clientName: string;
  clientEmail: string;
  campaignName: string;
  campaignId: string;
  creators: { name: string; rate: number }[];
  platformFeePercent?: number;
  setupFee?: number;
}): InvoiceData {
  const platformFeePercent = params.platformFeePercent || 0.3;
  const setupFee = params.setupFee || 299;

  const items: InvoiceLineItem[] = [];

  // Setup fee
  items.push({
    description: `Campaign Setup — ${params.campaignName}`,
    quantity: 1,
    unitPrice: setupFee,
    total: setupFee,
  });

  // Creator fees
  params.creators.forEach(creator => {
    items.push({
      description: `Creator Campaign — ${creator.name}`,
      quantity: 1,
      unitPrice: creator.rate,
      total: creator.rate,
    });
  });

  // Platform fee
  const creatorTotal = params.creators.reduce((s, c) => s + c.rate, 0);
  const platformFee = Math.round(creatorTotal * platformFeePercent);
  items.push({
    description: `Platform Fee (${Math.round(platformFeePercent * 100)}%)`,
    quantity: 1,
    unitPrice: platformFee,
    total: platformFee,
  });

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const gst = Math.round(subtotal * 0.1); // 10% GST (Australia)
  const total = subtotal + gst;

  const now = new Date();
  const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // Net 14

  return {
    invoiceNumber: generateInvoiceNumber(),
    issueDate: now.toISOString().split('T')[0],
    dueDate: due.toISOString().split('T')[0],
    from: {
      company: 'Gamefluence Pty Ltd',
      abn: 'ACN 696 199 461',
      address: 'Sydney, NSW, Australia',
      email: 'admin@gamefluence.com.au',
    },
    to: {
      company: params.clientCompany,
      contactName: params.clientName,
      email: params.clientEmail,
    },
    items,
    subtotal,
    gst,
    total,
    currency: 'AUD',
    campaignId: params.campaignId,
    campaignName: params.campaignName,
    creators: params.creators.map(c => c.name),
    paymentTerms: 'Net 14 days',
    bankDetails: {
      accountName: 'Gamefluence Pty Ltd',
      bsb: '', // Fill when bank account set up
      accountNumber: '', // Fill when bank account set up
    },
    status: 'draft',
  };
}

// ── RENDER INVOICE AS HTML (for PDF export) ───────────────────────────────────

export function renderInvoiceHTML(invoice: InvoiceData): string {
  return `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Space Grotesk', -apple-system, sans-serif; margin: 0; padding: 40px; color: #1a1a1a; }
  .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
  .logo { font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #9333EA, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .invoice-title { font-size: 32px; font-weight: 300; color: #666; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
  .meta-block h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 8px; }
  .meta-block p { margin: 2px 0; font-size: 14px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; padding: 12px 0; border-bottom: 2px solid #eee; }
  td { padding: 12px 0; border-bottom: 1px solid #f5f5f5; font-size: 14px; }
  td.amount { text-align: right; font-weight: 600; }
  .totals { margin-left: auto; width: 280px; }
  .totals .row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
  .totals .total { border-top: 2px solid #1a1a1a; font-size: 18px; font-weight: 700; padding-top: 12px; }
  .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
  .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
  .status-draft { background: #f3f4f6; color: #6b7280; }
  .status-sent { background: #dbeafe; color: #2563eb; }
  .status-paid { background: #dcfce7; color: #16a34a; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Gamefluence</div>
      <p style="font-size: 12px; color: #999; margin-top: 4px;">The gaming influencer layer for APAC</p>
    </div>
    <div style="text-align: right;">
      <div class="invoice-title">INVOICE</div>
      <p style="font-size: 14px; margin-top: 8px;">${invoice.invoiceNumber}</p>
      <span class="status status-${invoice.status}">${invoice.status}</span>
    </div>
  </div>

  <div class="meta">
    <div class="meta-block">
      <h3>From</h3>
      <p><strong>${invoice.from.company}</strong></p>
      <p>${invoice.from.abn}</p>
      <p>${invoice.from.address}</p>
      <p>${invoice.from.email}</p>
    </div>
    <div class="meta-block">
      <h3>Bill To</h3>
      <p><strong>${invoice.to.company}</strong></p>
      <p>${invoice.to.contactName}</p>
      <p>${invoice.to.email}</p>
    </div>
    <div class="meta-block">
      <h3>Issue Date</h3>
      <p>${invoice.issueDate}</p>
    </div>
    <div class="meta-block">
      <h3>Due Date</h3>
      <p>${invoice.dueDate}</p>
      <p style="font-size: 12px; color: #999;">${invoice.paymentTerms}</p>
    </div>
  </div>

  ${invoice.campaignName ? `<p style="font-size: 14px; color: #666; margin-bottom: 20px;">Campaign: <strong>${invoice.campaignName}</strong> (${invoice.campaignId})</p>` : ''}

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Qty</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      ${invoice.items.map(item => `
      <tr>
        <td>${item.description}</td>
        <td style="text-align: center;">${item.quantity}</td>
        <td class="amount">$${item.unitPrice.toLocaleString()}</td>
        <td class="amount">$${item.total.toLocaleString()}</td>
      </tr>`).join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="row"><span>Subtotal</span><span>$${invoice.subtotal.toLocaleString()}</span></div>
    <div class="row"><span>GST (10%)</span><span>$${invoice.gst.toLocaleString()}</span></div>
    <div class="row total"><span>Total (${invoice.currency})</span><span>$${invoice.total.toLocaleString()}</span></div>
  </div>

  <div class="footer">
    <p><strong>Payment:</strong> ${invoice.paymentTerms} • Bank transfer or Stripe</p>
    ${invoice.bankDetails.bsb ? `<p>BSB: ${invoice.bankDetails.bsb} • Account: ${invoice.bankDetails.accountNumber} • Name: ${invoice.bankDetails.accountName}</p>` : '<p>Bank details provided on request. Stripe checkout link available.</p>'}
    <p style="margin-top: 20px;">Gamefluence Pty Ltd • ${invoice.from.abn} • ${invoice.from.address}</p>
  </div>
</body>
</html>`;
}
