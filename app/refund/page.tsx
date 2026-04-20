import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund &amp; Cancellation Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: April 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              Gamefluence Pty Ltd (ACN: [ACN_PLACEHOLDER]) is committed to fair and transparent refund practices. This policy outlines the terms for campaign cancellations, refunds, and payment disputes on the Gamefluence platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Campaign Cancellation Before Launch</h2>
            <p className="text-gray-700 leading-relaxed">
              If you cancel a campaign before it has been launched (i.e., before creators have begun producing content or deliverables):
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>You are entitled to a <strong>full refund</strong> of all campaign fees paid.</li>
              <li>Refunds will be processed to the original payment method within 5–10 business days.</li>
              <li>Platform service fees may be retained if significant platform resources were used during campaign setup (e.g., creator outreach, brief development). This will be communicated prior to cancellation confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Campaign Cancellation After Launch</h2>
            <p className="text-gray-700 leading-relaxed">
              If you cancel a campaign after it has launched (i.e., creators have begun work or content has been delivered):
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>A <strong>pro-rata refund</strong> will be calculated based on the proportion of campaign deliverables not yet completed.</li>
              <li>Payments already disbursed to creators for completed work are non-refundable.</li>
              <li>The pro-rata calculation will account for: content already produced, creator time invested, and any third-party costs incurred.</li>
              <li>Gamefluence will provide a detailed breakdown of the refund calculation within 5 business days of the cancellation request.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. Payment Disputes</h2>
            <p className="text-gray-700 leading-relaxed">
              If you believe a payment has been processed incorrectly or you have a dispute regarding campaign charges:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Contact us at hello@gamefluenceai.com within 30 days of the transaction.</li>
              <li>Provide your campaign ID, transaction reference, and a description of the dispute.</li>
              <li>We will investigate and respond within 10 business days.</li>
              <li>During the investigation, disputed amounts may be held in escrow.</li>
              <li>If the dispute is resolved in your favour, a full or partial refund will be issued promptly.</li>
              <li>If you are unsatisfied with the resolution, you may escalate through your payment provider or relevant consumer protection authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. How to Request a Refund</h2>
            <p className="text-gray-700 leading-relaxed">
              To request a refund or cancellation, follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-3">
              <li>Email hello@gamefluenceai.com with the subject line &quot;Refund Request — [Campaign Name]&quot;.</li>
              <li>Include your account email, campaign ID, and reason for the refund request.</li>
              <li>Our team will acknowledge your request within 2 business days.</li>
              <li>A refund decision will be communicated within 5 business days of acknowledgement.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Processing Timeframes</h2>
            <p className="text-gray-700 leading-relaxed">
              Once a refund is approved:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>Credit/debit card refunds:</strong> 5–10 business days to appear on your statement.</li>
              <li><strong>Bank transfers:</strong> 3–7 business days depending on your financial institution.</li>
              <li><strong>Multi-currency refunds:</strong> Refunds are processed in the original transaction currency. Exchange rate differences between the payment date and refund date are borne by the recipient.</li>
              <li><strong>Partial refunds:</strong> Processed within the same timeframes as full refunds once the pro-rata amount is confirmed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Exceptions</h2>
            <p className="text-gray-700 leading-relaxed">
              Refunds may not be available in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Breach of our Terms of Service by the requesting party.</li>
              <li>Fraudulent or abusive use of the platform.</li>
              <li>Campaigns completed in full with all deliverables accepted.</li>
              <li>Requests made more than 60 days after the transaction date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For refund inquiries or assistance:
            </p>
            <ul className="list-none pl-0 text-gray-700 space-y-1 mt-3">
              <li><strong>Email:</strong> hello@gamefluenceai.com</li>
              <li><strong>Company:</strong> Gamefluence Pty Ltd (ACN: [ACN_PLACEHOLDER])</li>
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
