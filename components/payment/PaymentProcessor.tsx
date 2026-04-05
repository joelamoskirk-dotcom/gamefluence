'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createCustomer, createProduct, simulatePayment, formatAmountForStripe, formatAmountForDisplay } from '@/lib/stripe-mcp';
import { CreditCard, Building, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentProcessorProps {
  selectedCreators: any[];
  selectedPackage: string | null;
  acquisitionPackages: any[];
  totalCost: number;
  onPaymentComplete: (paymentResult: any) => void;
}

export default function PaymentProcessor({ 
  selectedCreators, 
  selectedPackage, 
  acquisitionPackages, 
  totalCost,
  onPaymentComplete 
}: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    companyName: '',
    email: '',
    contactName: ''
  });

  const creatorsCost = selectedCreators.reduce((sum, creator) => {
    const baseFee = creator.rate || 200;
    const platformFee = baseFee * 0.2;
    const managementFee = 200;
    return sum + baseFee + platformFee + managementFee;
  }, 0);

  const acquisitionCost = selectedPackage 
    ? acquisitionPackages.find(pkg => pkg.id === selectedPackage)?.price || 0 
    : 0;

  const handlePayment = async () => {
    if (!customerInfo.companyName || !customerInfo.email) {
      setPaymentError('Please fill in company name and email.');
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      setProcessingStep('Creating customer...');
      const customer = await createCustomer(customerInfo.companyName, customerInfo.email);

      setProcessingStep('Creating campaign product...');
      const campaignProduct = await createProduct(
        `Influencer Campaign - ${selectedCreators.length} Creators`,
        `Gaming influencer marketing campaign featuring ${selectedCreators.map((c) => c.name).join(', ')}`
      );

      let acquisitionProduct = null;
      if (selectedPackage) {
        const pkg = acquisitionPackages.find((p) => p.id === selectedPackage);
        setProcessingStep('Creating acquisition product...');
        acquisitionProduct = await createProduct(
          `User Acquisition - ${pkg?.name}`,
          `${pkg?.downloads.toLocaleString()} targeted game downloads`
        );
      }

      setProcessingStep('Processing payment...');
      const payment = await simulatePayment(customer.id, formatAmountForStripe(totalCost));

      const result = {
        customer,
        campaignProduct,
        acquisitionProduct,
        payment,
        summary: {
          totalAmount: totalCost,
          creatorsCost,
          acquisitionCost,
          creators: selectedCreators.length,
          audienceReach: selectedCreators.reduce((sum, c) => sum + c.followers, 0),
        },
      };

      setPaymentResult(result);
      onPaymentComplete(result);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.error('[PaymentProcessor]', msg);
      setPaymentError(`Payment failed: ${msg}. Please try again.`);
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  if (paymentResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Your Gamefluence campaign is now active</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Campaign Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Customer ID:</span>
                <span className="font-mono">{paymentResult.customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono">{paymentResult.payment.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Campaign Product:</span>
                <span className="font-mono">{paymentResult.campaignProduct.id}</span>
              </div>
              {paymentResult.acquisitionProduct && (
                <div className="flex justify-between">
                  <span>Acquisition Product:</span>
                  <span className="font-mono">{paymentResult.acquisitionProduct.id}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Campaign Impact</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {paymentResult.summary.audienceReach.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Reach</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {paymentResult.summary.creators}
                </div>
                <div className="text-sm text-gray-600">Creators</div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={() => window.location.href = '/dashboard'}
          >
            Create Another Campaign
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Complete Your Campaign</h2>
        
        {/* Customer Information */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Company Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name *</label>
              <input
                type="text"
                value={customerInfo.companyName}
                onChange={(e) => setCustomerInfo({...customerInfo, companyName: e.target.value})}
                className="w-full p-3 border rounded-lg"
                placeholder="Your Gaming Studio"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                className="w-full p-3 border rounded-lg"
                placeholder="campaigns@yourstudio.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <input
                type="text"
                value={customerInfo.contactName}
                onChange={(e) => setCustomerInfo({...customerInfo, contactName: e.target.value})}
                className="w-full p-3 border rounded-lg"
                placeholder="Marketing Manager"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <CreditCard className="text-blue-600" />
              <div>
                <div className="font-medium">💳 Credit Card</div>
                <div className="text-sm text-gray-500">Instant processing via Stripe</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="bank_transfer"
                checked={paymentMethod === 'bank_transfer'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Building className="text-green-600" />
              <div>
                <div className="font-medium">🏦 Bank Transfer</div>
                <div className="text-sm text-gray-500">1-3 business days</div>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input 
                type="radio" 
                name="paymentMethod" 
                value="invoice"
                checked={paymentMethod === 'invoice'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FileText className="text-purple-600" />
              <div>
                <div className="font-medium">📄 Invoice (Net 30)</div>
                <div className="text-sm text-gray-500">For enterprise customers</div>
              </div>
            </label>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="border-t pt-6 mb-6">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span>Influencer Campaigns ({selectedCreators.length} creators)</span>
              <span className="font-medium">${creatorsCost.toLocaleString()}</span>
            </div>
            {selectedPackage && (
              <div className="flex justify-between">
                <span>User Acquisition ({acquisitionPackages.find(pkg => pkg.id === selectedPackage)?.name})</span>
                <span className="font-medium">${acquisitionCost.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Error display */}
        {paymentError && (
          <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{paymentError}</span>
          </div>
        )}

        {/* Processing step indicator */}
        {isProcessing && processingStep && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-700">
            <AlertCircle className="animate-spin w-4 h-4 shrink-0" />
            <span>{processingStep}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.history.back()}
            disabled={isProcessing}
          >
            ← Back
          </Button>
          <Button
            className="flex-1"
            onClick={handlePayment}
            disabled={isProcessing || !customerInfo.companyName || !customerInfo.email}
          >
            {isProcessing ? (
              <>
                <AlertCircle className="animate-spin mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              `Complete Payment — ${formatAmountForDisplay(formatAmountForStripe(totalCost))}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}