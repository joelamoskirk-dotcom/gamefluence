import { Resend } from 'resend';

// Lazy initialization — only creates client when first email is sent
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// Email configuration
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = 'admin@gamefluence.com.au';

export interface LeadNotificationData {
  creatorName: string;
  email: string;
  phone?: string;
  socialProfile: string;
  platform: string;
  gamingFocus: string[];
  earningsGoal: string;
  availability: string;
  followerCount?: number;
  engagementRate?: number;
  brandSafetyScore?: number;
  marketTier?: string;
  submittedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  type: 'brand_inquiry' | 'agency_inquiry' | 'creator_inquiry' | 'general';
}

// Send lead notification to admin when a creator signs up
export async function sendLeadNotification(data: LeadNotificationData) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎮 New Creator Lead: ${data.creatorName} (${data.platform})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6d28d9, #3b82f6); padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎮 New Creator Lead</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Gamefluence Creator Network</p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #1f2937; margin-top: 0;">Creator Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${data.creatorName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></td>
              </tr>
              ${data.phone ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Platform:</td>
                <td style="padding: 8px 0;">${data.platform}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Social Profile:</td>
                <td style="padding: 8px 0;"><a href="${data.socialProfile}" style="color: #3b82f6;">${data.socialProfile}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Gaming Focus:</td>
                <td style="padding: 8px 0;">${data.gamingFocus.join(', ')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Earnings Goal:</td>
                <td style="padding: 8px 0;">${data.earningsGoal}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Availability:</td>
                <td style="padding: 8px 0;">${data.availability}</td>
              </tr>
            </table>

            ${data.followerCount ? `
            <h3 style="color: #1f2937; margin-top: 20px;">Profile Metrics</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px;">Followers:</td>
                <td style="padding: 8px 0; font-weight: bold;">${data.followerCount.toLocaleString()}</td>
              </tr>
              ${data.engagementRate ? `<tr><td style="padding: 8px 0; color: #6b7280;">Engagement:</td><td style="padding: 8px 0;">${data.engagementRate.toFixed(1)}%</td></tr>` : ''}
              ${data.brandSafetyScore ? `<tr><td style="padding: 8px 0; color: #6b7280;">Brand Safety:</td><td style="padding: 8px 0;">${data.brandSafetyScore}/100</td></tr>` : ''}
              ${data.marketTier ? `<tr><td style="padding: 8px 0; color: #6b7280;">Market Tier:</td><td style="padding: 8px 0; text-transform: capitalize; font-weight: bold;">${data.marketTier}</td></tr>` : ''}
            </table>
            ` : ''}
          </div>
          
          <div style="background: #1f2937; padding: 15px 20px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
              Submitted: ${data.submittedAt} · Gamefluence Creator Network
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send lead notification:', error);
      return { success: false, error };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: err };
  }
}

// Send contact form submission to admin
export async function sendContactNotification(data: ContactFormData) {
  try {
    const typeLabels = {
      brand_inquiry: '🏢 Brand Inquiry',
      agency_inquiry: '🏛️ Agency Inquiry',
      creator_inquiry: '🎮 Creator Inquiry',
      general: '📧 General Inquiry',
    };

    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `${typeLabels[data.type]}: ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">${typeLabels[data.type]}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">From:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; color: #6b7280;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
            <p style="color: #1f2937; margin: 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">Gamefluence Contact Form · gamefluence.com.au</p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send contact notification:', error);
      return { success: false, error };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: err };
  }
}

// Send confirmation email to the creator who signed up
export async function sendCreatorConfirmation(creatorEmail: string, creatorName: string) {
  try {
    const { data: result, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: creatorEmail,
      subject: `Welcome to Gamefluence, ${creatorName}! 🎮`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6d28d9, #3b82f6); padding: 30px; border-radius: 12px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Gamefluence!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">You're in, ${creatorName} 🎮</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Thanks for joining the Gamefluence creator network! We've received your application and our team will review your profile shortly.
            </p>
            
            <h3 style="color: #1f2937;">What happens next:</h3>
            <ol style="color: #4b5563; line-height: 1.8;">
              <li>Our team reviews your profile (usually within 24 hours)</li>
              <li>We'll match you with relevant brand campaigns</li>
              <li>You'll receive campaign briefs directly to your email</li>
              <li>Accept campaigns, create content, get paid!</li>
            </ol>
            
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              In the meantime, make sure your gaming content is fresh and your profile is up to date.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://gamefluence.com.au" style="background: #6d28d9; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">Visit Gamefluence</a>
            </div>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px;">
              Gamefluence Pty Ltd · Sydney, Australia<br>
              <a href="mailto:admin@gamefluence.com.au" style="color: #6b7280;">admin@gamefluence.com.au</a>
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send creator confirmation:', error);
      return { success: false, error };
    }

    return { success: true, id: result?.id };
  } catch (err) {
    console.error('Email send error:', err);
    return { success: false, error: err };
  }
}
