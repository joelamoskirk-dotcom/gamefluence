import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the Gamefluence platform (gamefluenceai.com), you agree to be bound by these Terms of Service. Gamefluence Pty Ltd (ACN: [ACN_PLACEHOLDER]) operates this platform. If you do not agree to these terms, you must not use our services.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              These terms constitute a legally binding agreement between you and Gamefluence Pty Ltd. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any modifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Gamefluence is a gaming influencer marketing platform that connects brands and agencies with gaming content creators for paid campaigns across the Asia-Pacific (APAC) region. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Creator discovery and matching for gaming campaigns</li>
              <li>Campaign creation, management, and execution tools</li>
              <li>Performance analytics and attribution tracking</li>
              <li>Payment processing for creator compensation</li>
              <li>Multi-market campaign coordination across APAC</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              All payments on the Gamefluence platform are processed securely through Stripe. By using our payment services, you agree to the following:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Campaign payments are processed in Australian Dollars (AUD) or United States Dollars (USD) as selected at the time of campaign creation.</li>
              <li>Platform fees are charged as a percentage of total campaign spend and are disclosed prior to payment confirmation.</li>
              <li>Creator payments are disbursed upon verified completion of campaign deliverables.</li>
              <li>All prices are exclusive of GST unless otherwise stated.</li>
              <li>You are responsible for any currency conversion fees charged by your financial institution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. Campaign Delivery</h2>
            <p className="text-gray-700 leading-relaxed">
              Campaigns are subject to the following delivery terms:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Campaign timelines are agreed upon between brands and creators prior to launch.</li>
              <li>Gamefluence facilitates but does not guarantee specific campaign outcomes or performance metrics.</li>
              <li>Creators are required to deliver content in accordance with the approved campaign brief.</li>
              <li>Brands must provide timely feedback and approvals to avoid delays.</li>
              <li>Gamefluence reserves the right to mediate disputes between brands and creators regarding deliverables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              Unless otherwise agreed in writing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Content created by creators for campaigns remains the intellectual property of the creator unless a licence or assignment is agreed in the campaign brief.</li>
              <li>Brands receive a licence to use campaign content as specified in the campaign agreement.</li>
              <li>The Gamefluence platform, including its software, branding, and proprietary algorithms, remains the exclusive property of Gamefluence Pty Ltd.</li>
              <li>Users may not reproduce, modify, or distribute any part of the platform without prior written consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by Australian law:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Gamefluence Pty Ltd is not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.</li>
              <li>Our total liability for any claim arising from these terms shall not exceed the fees paid by you in the twelve (12) months preceding the claim.</li>
              <li>We do not guarantee uninterrupted or error-free operation of the platform.</li>
              <li>We are not responsible for the actions, content, or conduct of third-party creators or brands on the platform.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Nothing in these terms excludes or limits liability that cannot be excluded or limited under Australian Consumer Law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of the State of Victoria, Australia. You irrevocably submit to the exclusive jurisdiction of the courts of Victoria and any courts of appeal from them for any proceedings arising out of or in connection with these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-3">
              <li><strong>Company:</strong> Gamefluence Pty Ltd (ACN: [ACN_PLACEHOLDER])</li>
              <li><strong>Email:</strong> hello@gamefluenceai.com</li>
              <li><strong>Website:</strong> gamefluenceai.com</li>
            </ul>
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
