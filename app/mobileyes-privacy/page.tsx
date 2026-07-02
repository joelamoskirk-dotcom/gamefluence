export default function MobileyesPrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Mobileyes Pty Ltd — Last updated June 2026</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">1. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              Mobileyes Pty Ltd (&quot;Mobileyes&quot;, &quot;we&quot;, &quot;us&quot;) operates mobileyes.live as a talent representation 
              agency for live video creators. We are based in Sydney, NSW, Australia.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Contact: <a href="mailto:admin@mobileyes.live" className="text-indigo-600">admin@mobileyes.live</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">2. What We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-3">When you sign up as talent or interact with our platform, we may collect:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Full name, email address, phone number</li>
              <li>Location and timezone</li>
              <li>Social media profile URLs, handles, and follower counts</li>
              <li>Rate card information (your service rates)</li>
              <li>ABN (Australian Business Number) if provided</li>
              <li>IP address and browser information (for audit/security)</li>
              <li>Brief acceptance/decline records</li>
              <li>Campaign performance data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">3. Why We Collect It</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>To match you with relevant brand briefs</li>
              <li>To process your payments within 4 business days</li>
              <li>To verify content delivery (platform verification)</li>
              <li>To communicate with you about briefs and opportunities</li>
              <li>To maintain audit records of agreement signatures (legal requirement)</li>
              <li>To improve our matching algorithms over time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">4. How We Store It</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data is stored securely using Google Cloud infrastructure (Google Sheets API with service account access). 
              Access is restricted to authorised Mobileyes team members only. We use HTTPS for all data transmission.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              We do not store bank account details or payment card information. Payments are processed through 
              secure third-party payment providers (bank transfer, Wise, or PayPal).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">5. Who We Share It With</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We share limited information with:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Brands/Agencies</strong>: Your public profile info (handle, follower count, platform) when presenting you for briefs. Never your email, phone, or rates without your consent.</li>
              <li><strong>Payment providers</strong>: Payment details required to process your earnings.</li>
              <li><strong>Email service</strong> (Resend): Your email address for sending brief notifications and confirmations.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3 font-medium">
              We never sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Under the Australian Privacy Act 1988, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Access</strong>: Request a copy of all personal data we hold about you</li>
              <li><strong>Correction</strong>: Request correction of inaccurate information</li>
              <li><strong>Deletion</strong>: Request deletion of your data (subject to legal retention requirements)</li>
              <li><strong>Complaint</strong>: Lodge a complaint with the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, email <a href="mailto:admin@mobileyes.live" className="text-indigo-600">admin@mobileyes.live</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">7. Data Retention</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Active talent profiles: Retained while the representation agreement is active</li>
              <li>Agreement signature records (audit log): Retained for 7 years (legal requirement)</li>
              <li>Campaign performance data: Retained for 2 years after campaign completion</li>
              <li>After termination: Profile data deleted within 30 days, audit records retained as required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">8. Cookies & Analytics</h2>
            <p className="text-gray-700 leading-relaxed">
              We use essential cookies only (session management). We do not use third-party tracking cookies 
              or advertising pixels on mobileyes.live. We may use privacy-respecting analytics (PostHog, self-hosted) 
              to understand site usage without identifying individuals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">9. International Talent</h2>
            <p className="text-gray-700 leading-relaxed">
              For talent located outside Australia (APAC markets), we comply with the Australian Privacy Act 
              as the primary framework. Where your local jurisdiction requires additional protections, those apply 
              in addition to (not instead of) our standard practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-3">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this policy from time to time. Material changes will be communicated via email 
              to all active talent. The &quot;last updated&quot; date at the top indicates when changes were made.
            </p>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-gray-500 text-sm">
              Mobileyes Pty Ltd • Sydney, NSW, Australia<br />
              admin@mobileyes.live • mobileyes.live
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
