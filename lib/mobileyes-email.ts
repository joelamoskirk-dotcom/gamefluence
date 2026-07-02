// Mobileyes Email Templates & Sending
// Uses Resend via shared infrastructure with Gamefluence
// From: admin@mobileyes.live (configured in Resend)

import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY not set');
    _resend = new Resend(apiKey);
  }
  return _resend;
}

const FROM_EMAIL = 'admin@mobileyes.live';
const ADMIN_EMAIL = 'admin@mobileyes.live';

// ─── TALENT ONBOARDING ─────────────────────────────────────────────────────────

export async function sendTalentWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Welcome to Mobileyes, ${name} 🎬`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px;">Welcome to Mobileyes</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">You're on the roster, ${name} 🎬</p>
          </div>
          <div style="padding: 30px; background: #fafafa; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Your talent profile and agreement have been received. Here's what happens next:
            </p>
            <ol style="color: #374151; line-height: 2;">
              <li><strong>Profile Review</strong> — We verify your platforms (24-48 hours)</li>
              <li><strong>Rate Card Confirmation</strong> — We'll advise on market positioning</li>
              <li><strong>Brief Matching</strong> — You start receiving brand briefs via email</li>
            </ol>
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Remember: you choose which briefs to accept. Non-exclusive, 4 business day payments, 80% to you.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://mobileyes.live" style="background: #4f46e5; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Visit Mobileyes</a>
            </div>
          </div>
          <div style="padding: 15px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Mobileyes · Sydney, Australia · admin@mobileyes.live</p>
          </div>
        </div>
      `,
    });
    if (error) { console.error('[mobileyes-email] Welcome failed:', error); return { success: false, error }; }
    return { success: true, id: data?.id };
  } catch (err) {
    console.error('[mobileyes-email] Welcome error:', err);
    return { success: false, error: err };
  }
}

export async function sendTalentSignupAdminNotification(data: {
  name: string;
  email: string;
  platforms: string;
  primaryPlatform: string;
  rateCard: string;
}) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎬 New Talent Signup: ${data.name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">New Talent: ${data.name}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #6b7280;">Email:</td><td>${data.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Primary:</td><td>${data.primaryPlatform}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Platforms:</td><td>${data.platforms}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Rate Card:</td><td>${data.rateCard}</td></tr>
          </table>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Action: Review profile → Confirm rates → Activate for brief matching</p>
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}

// ─── BRIEF NOTIFICATIONS ────────────────────────────────────────────────────────

export async function sendBriefDeliveryEmail(data: {
  talentEmail: string;
  talentName: string;
  brandName: string;
  campaignName: string;
  talentFee: number;
  currency: string;
  deadline: string;
  acceptUrl: string;
}) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.talentEmail,
      subject: `📋 New Brief: ${data.campaignName} from ${data.brandName} ($${data.talentFee.toLocaleString()})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 25px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Brief Available</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">${data.brandName} · ${data.campaignName}</p>
          </div>
          <div style="padding: 25px; background: #fafafa; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #1f2937; font-size: 16px;">Hey ${data.talentName},</p>
            <p style="color: #374151; line-height: 1.6;">
              We have a new brief that matches your profile. Here's the quick summary:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Brand:</td><td style="font-weight: bold;">${data.brandName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Campaign:</td><td>${data.campaignName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Your Fee:</td><td style="font-weight: bold; color: #059669;">$${data.talentFee.toLocaleString()} ${data.currency}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Deadline:</td><td>${data.deadline}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Payment:</td><td>4 business days after verification</td></tr>
            </table>
            <div style="text-align: center; margin: 25px 0;">
              <a href="${data.acceptUrl}" style="background: #059669; color: white; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Review & Accept Brief →</a>
            </div>
            <p style="color: #6b7280; font-size: 13px; text-align: center;">
              You have 48 hours to respond. Non-response = auto-decline.
            </p>
          </div>
          <div style="padding: 15px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Mobileyes · admin@mobileyes.live</p>
          </div>
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function sendBriefReminderEmail(data: {
  talentEmail: string;
  talentName: string;
  brandName: string;
  campaignName: string;
  acceptUrl: string;
  hoursRemaining: number;
}) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.talentEmail,
      subject: `⏰ Reminder: ${data.brandName} brief expires in ${data.hoursRemaining}h`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <p style="color: #92400e; margin: 0; font-weight: 600;">⏰ ${data.hoursRemaining} hours remaining to respond</p>
          </div>
          <p style="color: #1f2937; font-size: 16px;">Hey ${data.talentName},</p>
          <p style="color: #374151; line-height: 1.6;">
            Quick reminder — the <strong>${data.campaignName}</strong> brief from <strong>${data.brandName}</strong> 
            will auto-decline if you don't respond within ${data.hoursRemaining} hours.
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${data.acceptUrl}" style="background: #4f46e5; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">Review Brief →</a>
          </div>
          <p style="color: #6b7280; font-size: 13px;">No pressure — if it's not right for you, just let it expire or hit decline.</p>
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}

export async function sendBriefAutoDeclinedEmail(data: {
  talentEmail: string;
  talentName: string;
  brandName: string;
  campaignName: string;
}) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.talentEmail,
      subject: `Brief expired: ${data.campaignName}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="color: #1f2937; font-size: 16px;">Hey ${data.talentName},</p>
          <p style="color: #374151; line-height: 1.6;">
            The <strong>${data.campaignName}</strong> brief from <strong>${data.brandName}</strong> 
            has been auto-declined as 48 hours passed without a response.
          </p>
          <p style="color: #374151; line-height: 1.6;">
            No worries at all — we'll keep matching you with new opportunities. If you'd like to adjust 
            your notification preferences or availability, just reply to this email.
          </p>
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">Mobileyes · admin@mobileyes.live</p>
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}

// ─── ACCEPTANCE/DECLINE ADMIN NOTIFICATIONS ─────────────────────────────────────

export async function sendBriefResponseAdminNotification(data: {
  talentName: string;
  brandName: string;
  campaignName: string;
  accepted: boolean;
  talentFee?: number;
  declineReason?: string;
}) {
  const emoji = data.accepted ? '✅' : '❌';
  const action = data.accepted ? 'ACCEPTED' : 'DECLINED';
  
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `${emoji} Brief ${action}: ${data.talentName} → ${data.brandName}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">${emoji} Brief ${action}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #6b7280;">Talent:</td><td style="font-weight: bold;">${data.talentName}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Brand:</td><td>${data.brandName}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Campaign:</td><td>${data.campaignName}</td></tr>
            ${data.talentFee ? `<tr><td style="padding: 6px 0; color: #6b7280;">Fee:</td><td>$${data.talentFee.toLocaleString()}</td></tr>` : ''}
            ${data.declineReason ? `<tr><td style="padding: 6px 0; color: #6b7280;">Reason:</td><td>${data.declineReason}</td></tr>` : ''}
          </table>
          ${data.accepted ? '<p style="color: #059669; font-weight: bold;">Action: Brief is now in progress. Await content submission.</p>' : '<p style="color: #6b7280;">Action: Re-queue brief for alternative talent matching.</p>'}
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}

// ─── VERIFICATION & PAYMENT ─────────────────────────────────────────────────────

export async function sendVerificationPassedEmail(data: {
  talentEmail: string;
  talentName: string;
  brandName: string;
  campaignName: string;
  talentFee: number;
  currency: string;
  paymentDueDate: string;
}) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: data.talentEmail,
      subject: `✅ Verified & Payment Incoming: ${data.campaignName} ($${data.talentFee.toLocaleString()})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #059669; padding: 25px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Content Verified ✅</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0;">Payment incoming</p>
          </div>
          <div style="padding: 25px; background: #fafafa; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #1f2937; font-size: 16px;">Nice work, ${data.talentName}! 🎉</p>
            <p style="color: #374151; line-height: 1.6;">
              Your content for <strong>${data.campaignName}</strong> (${data.brandName}) has passed all verification checks.
            </p>
            <div style="background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 8px; padding: 15px; margin: 15px 0; text-align: center;">
              <p style="color: #065f46; margin: 0; font-size: 14px;">Payment amount</p>
              <p style="color: #059669; margin: 5px 0; font-size: 28px; font-weight: bold;">$${data.talentFee.toLocaleString()} ${data.currency}</p>
              <p style="color: #065f46; margin: 0; font-size: 14px;">Due by: ${data.paymentDueDate}</p>
            </div>
            <p style="color: #6b7280; font-size: 13px; text-align: center;">Payment hits your account within 4 business days.</p>
          </div>
        </div>
      `,
    });
    if (error) return { success: false, error };
    return { success: true, id: result?.id };
  } catch (err) {
    return { success: false, error: err };
  }
}
