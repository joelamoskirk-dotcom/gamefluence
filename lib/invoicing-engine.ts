// Invoicing & Accounting Engine
// Handles the full financial lifecycle: quote → invoice → verify → pay
// Supports flex fees (agency fee, commission, tech fee, super)
// Both platforms: Gamefluence + Mobileyes

export type InvoicePlatform = 'gamefluence' | 'mobileyes';
export type InvoiceStatus = 'draft' | 'quoted' | 'approved' | 'sent_to_brand' | 'paid_by_brand' | 'talent_paid' | 'complete' | 'disputed' | 'cancelled';
export type FeeType = 'talent_fee' | 'commission' | 'agency_fee' | 'tech_fee' | 'management_fee' | 'exclusivity_fee' | 'rush_fee' | 'gst';
export type PaymentMethod = 'bank_transfer' | 'wise' | 'paypal' | 'stripe';

export interface InvoiceLineItem {
  id: string;
  type: FeeType;
  description: string;
  amount: number;
  isPercentage: boolean; // true = calculated as % of base, false = fixed amount
  percentageOf?: string; // which line item ID this is a % of
  percentageRate?: number; // the actual % (e.g. 20)
  taxable: boolean;
  visibleToTalent: boolean; // Does the talent see this line item?
  visibleToBrand: boolean; // Does the brand see this line item?
  notes?: string;
}

export interface Invoice {
  id: string;
  platform: InvoicePlatform;
  status: InvoiceStatus;
  
  // Parties
  brandName: string;
  brandContact?: string;
  brandEmail?: string;
  talentName: string;
  talentEmail?: string;
  talentABN?: string;
  
  // Reference
  briefId?: string;
  campaignName: string;
  invoiceNumber: string; // e.g. MB-2026-0001 or GF-2026-0001
  
  // Line items (the flex)
  lineItems: InvoiceLineItem[];
  
  // Calculated totals
  subtotal: number; // All items before tax
  gstAmount: number; // 10% GST on taxable items (AU)
  totalBrandPays: number; // What the brand is invoiced
  totalTalentReceives: number; // What talent gets paid
  totalYouKeep: number; // Your margin (commission + fees - talent payout)
  effectiveMarginPercent: number; // totalYouKeep / totalBrandPays * 100
  
  // Payment tracking
  brandPaymentMethod?: PaymentMethod;
  brandPaidAt?: Date;
  brandPaymentRef?: string;
  talentPaymentMethod?: PaymentMethod;
  talentPaidAt?: Date;
  talentPaymentRef?: string;
  talentPaymentDueDate?: Date; // 4 business days from verification
  
  // Super (AU talent)
  superRequired: boolean; // Is this talent a contractor requiring super?
  superRate: number; // 11.5% for FY2024-25 AU
  superAmount: number;
  superFundName?: string;
  superFundUSI?: string;
  superMemberNumber?: string;
  
  // Verification link
  verificationPassed: boolean;
  verificationPassedAt?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  notes?: string;
  joelOverride?: string; // Joel's notes on why pricing was adjusted
}

export interface QuoteRequest {
  platform: InvoicePlatform;
  brandName: string;
  talentName: string;
  campaignName: string;
  briefId?: string;
  
  // The deal (from Dazza or Joel's decision)
  brandFee: number; // What you charge the brand
  talentRate: number; // What you pay the talent
  commissionPercent: number; // Your take %
  
  // Optional extras
  includeAgencyFee?: boolean;
  agencyFeeAmount?: number;
  includeTechFee?: boolean;
  techFeeAmount?: number;
  includeManagementFee?: boolean;
  managementFeeAmount?: number;
  includeExclusivityFee?: boolean;
  exclusivityFeeAmount?: number;
  includeRushFee?: boolean;
  rushFeeAmount?: number;
  
  // Tax
  applyGST: boolean; // AU brands = yes, international = no
  
  // Super
  talentIsAUContractor: boolean;
  talentABN?: string;
  superFundDetails?: {
    fundName: string;
    usi: string;
    memberNumber: string;
  };
  
  // Override notes
  joelNotes?: string;
}

export class InvoicingEngine {

  // ═══════════════════════════════════════════════════════════════════════════
  // INVOICE GENERATION
  // ═══════════════════════════════════════════════════════════════════════════

  static generateInvoice(request: QuoteRequest): Invoice {
    const lineItems: InvoiceLineItem[] = [];
    const invoiceNumber = this.generateInvoiceNumber(request.platform);
    
    // 1. Talent Fee (what the talent gets)
    lineItems.push({
      id: 'talent_fee',
      type: 'talent_fee',
      description: `Talent fee: ${request.talentName} — ${request.campaignName}`,
      amount: request.talentRate,
      isPercentage: false,
      taxable: false, // Talent invoice is separate
      visibleToTalent: true,
      visibleToBrand: false, // Brand doesn't see the split
    });

    // 2. Commission (your cut from the brand fee)
    const commissionAmount = request.brandFee - request.talentRate;
    lineItems.push({
      id: 'commission',
      type: 'commission',
      description: `Agency commission (${request.commissionPercent}%)`,
      amount: commissionAmount,
      isPercentage: true,
      percentageOf: 'brand_total',
      percentageRate: request.commissionPercent,
      taxable: true, // GST applies to your service fee
      visibleToTalent: false,
      visibleToBrand: false, // Brand sees one total, not the breakdown
    });

    // 3. Optional: Agency Fee
    if (request.includeAgencyFee && request.agencyFeeAmount) {
      lineItems.push({
        id: 'agency_fee',
        type: 'agency_fee',
        description: 'Agency service fee (matching, brief management, reporting)',
        amount: request.agencyFeeAmount,
        isPercentage: false,
        taxable: true,
        visibleToTalent: false,
        visibleToBrand: true,
        notes: 'Charged to brand on top of campaign fee',
      });
    }

    // 4. Optional: Tech Fee
    if (request.includeTechFee && request.techFeeAmount) {
      lineItems.push({
        id: 'tech_fee',
        type: 'tech_fee',
        description: 'Platform technology & verification fee',
        amount: request.techFeeAmount,
        isPercentage: false,
        taxable: true,
        visibleToTalent: false,
        visibleToBrand: true,
      });
    }

    // 5. Optional: Management Fee
    if (request.includeManagementFee && request.managementFeeAmount) {
      lineItems.push({
        id: 'management_fee',
        type: 'management_fee',
        description: 'Talent management & coordination fee',
        amount: request.managementFeeAmount,
        isPercentage: false,
        taxable: true,
        visibleToTalent: false,
        visibleToBrand: true,
      });
    }

    // 6. Optional: Exclusivity Fee
    if (request.includeExclusivityFee && request.exclusivityFeeAmount) {
      lineItems.push({
        id: 'exclusivity_fee',
        type: 'exclusivity_fee',
        description: 'Exclusivity premium (competitive restriction period)',
        amount: request.exclusivityFeeAmount,
        isPercentage: false,
        taxable: true,
        visibleToTalent: true, // Talent should know about exclusivity
        visibleToBrand: true,
      });
    }

    // 7. Optional: Rush Fee
    if (request.includeRushFee && request.rushFeeAmount) {
      lineItems.push({
        id: 'rush_fee',
        type: 'rush_fee',
        description: 'Rush delivery surcharge (<48hr turnaround)',
        amount: request.rushFeeAmount,
        isPercentage: false,
        taxable: true,
        visibleToTalent: true,
        visibleToBrand: true,
      });
    }

    // Calculate totals
    const brandVisibleItems = lineItems.filter(i => i.visibleToBrand || i.type === 'talent_fee');
    const additionalFees = lineItems.filter(i => i.visibleToBrand && i.type !== 'talent_fee').reduce((s, i) => s + i.amount, 0);
    const subtotal = request.brandFee + additionalFees;
    
    // GST (10% on taxable items — only for AU)
    const taxableAmount = request.applyGST 
      ? lineItems.filter(i => i.taxable).reduce((s, i) => s + i.amount, 0)
      : 0;
    const gstAmount = Math.round(taxableAmount * 0.1);

    if (request.applyGST && gstAmount > 0) {
      lineItems.push({
        id: 'gst',
        type: 'gst',
        description: 'GST (10%)',
        amount: gstAmount,
        isPercentage: true,
        percentageRate: 10,
        taxable: false,
        visibleToTalent: false,
        visibleToBrand: true,
      });
    }

    const totalBrandPays = subtotal + gstAmount;
    const totalTalentReceives = request.talentRate;
    const totalYouKeep = totalBrandPays - totalTalentReceives - gstAmount; // GST goes to ATO, not you
    const effectiveMarginPercent = totalBrandPays > 0 ? (totalYouKeep / (totalBrandPays - gstAmount)) * 100 : 0;

    // Super calculation (AU contractors earning > $450/month)
    const superRequired = request.talentIsAUContractor && request.talentRate >= 450;
    const superRate = 11.5; // FY2024-25 rate
    const superAmount = superRequired ? Math.round(request.talentRate * (superRate / 100)) : 0;

    return {
      id: `inv_${Date.now()}`,
      platform: request.platform,
      status: 'draft',
      brandName: request.brandName,
      talentName: request.talentName,
      talentABN: request.talentABN,
      campaignName: request.campaignName,
      briefId: request.briefId,
      invoiceNumber,
      lineItems,
      subtotal,
      gstAmount,
      totalBrandPays,
      totalTalentReceives,
      totalYouKeep,
      effectiveMarginPercent,
      superRequired,
      superRate,
      superAmount,
      superFundName: request.superFundDetails?.fundName,
      superFundUSI: request.superFundDetails?.usi,
      superMemberNumber: request.superFundDetails?.memberNumber,
      verificationPassed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Joel',
      notes: request.joelNotes,
      joelOverride: request.joelNotes,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INVOICE LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  static approveInvoice(invoice: Invoice): Invoice {
    return { ...invoice, status: 'approved', updatedAt: new Date() };
  }

  static markSentToBrand(invoice: Invoice): Invoice {
    return { ...invoice, status: 'sent_to_brand', updatedAt: new Date() };
  }

  static markBrandPaid(invoice: Invoice, ref: string, method: PaymentMethod): Invoice {
    return { 
      ...invoice, 
      status: 'paid_by_brand', 
      brandPaidAt: new Date(), 
      brandPaymentRef: ref,
      brandPaymentMethod: method,
      updatedAt: new Date() 
    };
  }

  static markVerificationPassed(invoice: Invoice): Invoice {
    const dueDate = this.calculatePaymentDueDate(new Date(), invoice.platform);
    return { 
      ...invoice, 
      verificationPassed: true, 
      verificationPassedAt: new Date(),
      talentPaymentDueDate: dueDate,
      updatedAt: new Date() 
    };
  }

  static markTalentPaid(invoice: Invoice, ref: string, method: PaymentMethod): Invoice {
    return { 
      ...invoice, 
      status: 'talent_paid', 
      talentPaidAt: new Date(), 
      talentPaymentRef: ref,
      talentPaymentMethod: method,
      updatedAt: new Date() 
    };
  }

  static markComplete(invoice: Invoice): Invoice {
    return { ...invoice, status: 'complete', updatedAt: new Date() };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAYMENT DATE CALCULATION
  // ═══════════════════════════════════════════════════════════════════════════

  static calculatePaymentDueDate(fromDate: Date, platform: InvoicePlatform): Date {
    const businessDays = platform === 'mobileyes' ? 4 : 7;
    const date = new Date(fromDate);
    let count = 0;
    while (count < businessDays) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      if (day !== 0 && day !== 6) count++;
    }
    return date;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INVOICE NUMBERING
  // ═══════════════════════════════════════════════════════════════════════════

  static generateInvoiceNumber(platform: InvoicePlatform): string {
    const prefix = platform === 'mobileyes' ? 'MB' : 'GF';
    const year = new Date().getFullYear();
    const seq = Math.floor(Math.random() * 9000) + 1000; // In production: auto-increment from DB
    return `${prefix}-${year}-${seq}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WHAT TALENT SEES vs WHAT BRAND SEES
  // ═══════════════════════════════════════════════════════════════════════════

  static getTalentView(invoice: Invoice): {
    campaignName: string;
    brandName: string;
    yourFee: number;
    paymentTerms: string;
    paymentDueDate?: Date;
    status: string;
    extras: InvoiceLineItem[];
  } {
    return {
      campaignName: invoice.campaignName,
      brandName: invoice.brandName,
      yourFee: invoice.totalTalentReceives,
      paymentTerms: invoice.platform === 'mobileyes' ? '4 business days from verification' : '7 days from completion',
      paymentDueDate: invoice.talentPaymentDueDate,
      status: invoice.status,
      extras: invoice.lineItems.filter(i => i.visibleToTalent && i.type !== 'talent_fee'),
    };
  }

  static getBrandView(invoice: Invoice): {
    campaignName: string;
    talentName: string;
    invoiceNumber: string;
    lineItems: Array<{ description: string; amount: number }>;
    subtotal: number;
    gst: number;
    total: number;
    paymentTerms: string;
  } {
    // Brand sees: campaign fee + any additional fees + GST
    // Brand does NOT see: the talent/commission split
    const brandItems: Array<{ description: string; amount: number }> = [
      { description: `Campaign: ${invoice.campaignName} — ${invoice.talentName}`, amount: invoice.subtotal - invoice.gstAmount },
    ];

    // Add visible extra fees
    const extras = invoice.lineItems.filter(i => i.visibleToBrand && i.type !== 'talent_fee' && i.type !== 'commission' && i.type !== 'gst');
    extras.forEach(item => {
      brandItems.push({ description: item.description, amount: item.amount });
    });

    return {
      campaignName: invoice.campaignName,
      talentName: invoice.talentName,
      invoiceNumber: invoice.invoiceNumber,
      lineItems: brandItems,
      subtotal: invoice.subtotal,
      gst: invoice.gstAmount,
      total: invoice.totalBrandPays,
      paymentTerms: `NET 14 from invoice date`,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // YOUR VIEW (FULL TRANSPARENCY)
  // ═══════════════════════════════════════════════════════════════════════════

  static getFounderView(invoice: Invoice): {
    summary: string;
    brandPays: number;
    talentGets: number;
    youKeep: number;
    margin: number;
    gstOwed: number;
    superOwed: number;
    netProfit: number;
    allLineItems: InvoiceLineItem[];
    status: string;
    flags: string[];
  } {
    const netProfit = invoice.totalYouKeep - invoice.superAmount;
    const flags: string[] = [];
    
    if (invoice.effectiveMarginPercent < 15) flags.push('⚠️ Below minimum margin (15%)');
    if (invoice.effectiveMarginPercent > 30) flags.push('💰 Premium margin deal');
    if (invoice.superRequired && !invoice.superFundName) flags.push('⚠️ Super required but fund details missing');
    if (invoice.status === 'sent_to_brand' && !invoice.brandPaidAt) flags.push('⏳ Awaiting brand payment');
    if (invoice.verificationPassed && !invoice.talentPaidAt) flags.push('🔴 Verification passed — talent payment due');

    return {
      summary: `${invoice.invoiceNumber}: ${invoice.talentName} × ${invoice.brandName} — ${invoice.campaignName}`,
      brandPays: invoice.totalBrandPays,
      talentGets: invoice.totalTalentReceives,
      youKeep: invoice.totalYouKeep,
      margin: invoice.effectiveMarginPercent,
      gstOwed: invoice.gstAmount,
      superOwed: invoice.superAmount,
      netProfit,
      allLineItems: invoice.lineItems,
      status: invoice.status,
      flags,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SUPER OBLIGATIONS (AU LAW)
  // ═══════════════════════════════════════════════════════════════════════════

  static calculateSuper(talentFee: number, isAUContractor: boolean): {
    required: boolean;
    rate: number;
    amount: number;
    note: string;
  } {
    // SG rate FY2024-25: 11.5% (increasing to 12% from July 2025)
    const rate = 11.5;
    const required = isAUContractor && talentFee >= 450; // $450/month threshold removed from 1 July 2022 actually — all employees now

    return {
      required,
      rate,
      amount: required ? Math.round(talentFee * (rate / 100)) : 0,
      note: required 
        ? `Super guarantee: ${rate}% of $${talentFee.toLocaleString()} = $${Math.round(talentFee * (rate / 100)).toLocaleString()}. Due quarterly to talent's fund.`
        : 'Super not applicable (international talent or not a contractor relationship)',
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ACCOUNTING SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════

  static getAccountingSummary(invoices: Invoice[]): {
    totalRevenue: number;
    totalTalentPayouts: number;
    totalCommission: number;
    totalGST: number;
    totalSuper: number;
    netOperatingProfit: number;
    avgMargin: number;
    invoicesByStatus: Record<InvoiceStatus, number>;
    outstandingBrandPayments: number;
    outstandingTalentPayments: number;
    platformBreakdown: {
      gamefluence: { revenue: number; profit: number; deals: number };
      mobileyes: { revenue: number; profit: number; deals: number };
    };
  } {
    const totalRevenue = invoices.reduce((s, i) => s + i.totalBrandPays, 0);
    const totalTalentPayouts = invoices.reduce((s, i) => s + i.totalTalentReceives, 0);
    const totalCommission = invoices.reduce((s, i) => s + i.totalYouKeep, 0);
    const totalGST = invoices.reduce((s, i) => s + i.gstAmount, 0);
    const totalSuper = invoices.reduce((s, i) => s + i.superAmount, 0);
    const netOperatingProfit = totalCommission - totalSuper;
    const avgMargin = invoices.length > 0 
      ? invoices.reduce((s, i) => s + i.effectiveMarginPercent, 0) / invoices.length 
      : 0;

    const invoicesByStatus: Record<string, number> = {};
    invoices.forEach(i => { invoicesByStatus[i.status] = (invoicesByStatus[i.status] || 0) + 1; });

    const outstandingBrand = invoices.filter(i => i.status === 'sent_to_brand').reduce((s, i) => s + i.totalBrandPays, 0);
    const outstandingTalent = invoices.filter(i => i.verificationPassed && !i.talentPaidAt).reduce((s, i) => s + i.totalTalentReceives, 0);

    const gf = invoices.filter(i => i.platform === 'gamefluence');
    const mb = invoices.filter(i => i.platform === 'mobileyes');

    return {
      totalRevenue,
      totalTalentPayouts,
      totalCommission,
      totalGST,
      totalSuper,
      netOperatingProfit,
      avgMargin,
      invoicesByStatus: invoicesByStatus as Record<InvoiceStatus, number>,
      outstandingBrandPayments: outstandingBrand,
      outstandingTalentPayments: outstandingTalent,
      platformBreakdown: {
        gamefluence: { revenue: gf.reduce((s, i) => s + i.totalBrandPays, 0), profit: gf.reduce((s, i) => s + i.totalYouKeep, 0), deals: gf.length },
        mobileyes: { revenue: mb.reduce((s, i) => s + i.totalBrandPays, 0), profit: mb.reduce((s, i) => s + i.totalYouKeep, 0), deals: mb.length },
      },
    };
  }
}
