import MMPFraudIntegrationDashboard from '@/components/admin/MMPFraudIntegrationDashboard';

export default function MMPIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MMP Fraud Integration</h1>
          <p className="mt-2 text-gray-600">
            Level Set™ fraud prevention integrated with industry-leading Mobile Measurement Partners
          </p>
        </div>
        
        <MMPFraudIntegrationDashboard />
      </div>
    </div>
  );
}