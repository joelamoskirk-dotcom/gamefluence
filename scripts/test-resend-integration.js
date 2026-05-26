#!/usr/bin/env node

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Test script to verify Resend integration
// Run with: node scripts/test-resend-integration.js

const { Resend } = require('resend');

async function testResendIntegration() {
  console.log('🧪 Testing Resend Integration...\n');

  // Check environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey) {
    console.error('❌ RESEND_API_KEY not found in environment');
    process.exit(1);
  }

  if (!fromEmail) {
    console.error('❌ RESEND_FROM_EMAIL not found in environment');
    process.exit(1);
  }

  console.log('✅ Environment variables found');
  console.log(`📧 From email: ${fromEmail}`);
  console.log(`🔑 API key: ${apiKey.substring(0, 10)}...`);

  // Initialize Resend
  const resend = new Resend(apiKey);

  try {
    // Send test email
    console.log('\n📤 Sending test email...');
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: 'admin@gamefluence.com.au',
      subject: '🧪 Resend Integration Test',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #6d28d9;">✅ Resend Integration Working!</h2>
          <p>This is a test email to confirm your Resend integration is working properly.</p>
          <p><strong>Sent at:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
          <p><strong>From:</strong> ${fromEmail}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">Gamefluence Platform Test</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Failed to send test email:', error);
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log(`📧 Email ID: ${data.id}`);
    console.log('\n🎉 Resend integration is working correctly!');
    console.log('Check admin@gamefluence.com.au for the test email.');

  } catch (err) {
    console.error('❌ Error testing Resend:', err.message);
    process.exit(1);
  }
}

testResendIntegration();