import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              Gamefluence Pty Ltd (ACN: 696 199 461) is committed to protecting your privacy in accordance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This policy describes how we collect, use, disclose, and store your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect the following types of personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>Account information:</strong> Name, email address, company name, role, and contact details.</li>
              <li><strong>Profile data:</strong> For creators — social media handles, audience demographics, content categories, and gaming platform profiles.</li>
              <li><strong>Payment information:</strong> Billing address, payment method details (processed securely via Stripe — we do not store full card numbers).</li>
              <li><strong>Campaign data:</strong> Campaign briefs, performance metrics, content submissions, and communication history.</li>
              <li><strong>Usage data:</strong> Pages visited, features used, session duration, device information, IP address, and browser type.</li>
              <li><strong>Communications:</strong> Messages sent through the platform, support requests, and feedback.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Providing and improving our platform services</li>
              <li>Matching creators with relevant brand campaigns</li>
              <li>Processing payments and managing billing</li>
              <li>Sending campaign notifications and platform updates</li>
              <li>Generating analytics and performance reports</li>
              <li>Ensuring platform security and preventing fraud</li>
              <li>Complying with legal obligations</li>
              <li>Communicating about new features, services, or promotions (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Third-Party Sharing</h2>
            <p className="text-gray-700 leading-relaxed">
              We may share your personal information with the following third parties:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>Stripe:</strong> For secure payment processing and financial transactions.</li>
              <li><strong>AppsFlyer:</strong> For campaign attribution, performance measurement, and fraud prevention across APAC markets.</li>
              <li><strong>Analytics providers:</strong> For platform usage analytics and performance optimisation (data is aggregated where possible).</li>
              <li><strong>Cloud infrastructure providers:</strong> For hosting and data storage services.</li>
              <li><strong>Campaign counterparties:</strong> Limited profile information shared between brands and creators as necessary for campaign execution.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We do not sell your personal information to third parties. All third-party providers are contractually required to handle your data in accordance with applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Maintain your session and authentication state</li>
              <li>Remember your preferences and settings</li>
              <li>Analyse platform usage and performance</li>
              <li>Provide attribution tracking for campaign measurement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. APAC Data Handling</h2>
            <p className="text-gray-700 leading-relaxed">
              As a platform operating across the Asia-Pacific region, we handle data from multiple jurisdictions including Australia, Vietnam, Thailand, Indonesia, and other APAC markets. We ensure:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Cross-border data transfers comply with the Australian Privacy Act and relevant local regulations.</li>
              <li>Data is stored on servers located in Australia or in jurisdictions with equivalent privacy protections.</li>
              <li>We take reasonable steps to ensure overseas recipients handle your information consistently with the APPs.</li>
              <li>Where required by local law, we obtain additional consent for data processing in specific APAC markets.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              Under the Australian Privacy Act, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or outdated information</li>
              <li>Request deletion of your personal information (subject to legal retention requirements)</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner (OAIC) if you believe your privacy has been breached</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise any of these rights, contact us at hello@gamefluenceai.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and fulfil the purposes outlined in this policy. Specifically:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Active account data is retained for the duration of your account.</li>
              <li>Campaign data is retained for 3 years after campaign completion for reporting and dispute resolution.</li>
              <li>Payment records are retained for 7 years as required by Australian tax law.</li>
              <li>Upon account deletion, personal data is removed within 30 days, except where retention is required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Contact for Privacy Inquiries</h2>
            <p className="text-gray-700 leading-relaxed">
              For any privacy-related questions, concerns, or requests, please contact:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-3">
              <li><strong>Privacy Officer</strong></li>
              <li><strong>Company:</strong> Gamefluence Pty Ltd (ACN: 696 199 461)</li>
              <li><strong>Email:</strong> hello@gamefluenceai.com</li>
              <li><strong>Website:</strong> gamefluenceai.com</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We will respond to privacy inquiries within 30 days. If you are unsatisfied with our response, you may lodge a complaint with the OAIC at <span className="text-primary">www.oaic.gov.au</span>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
