'use client';

import React from 'react';
import { Campaign3MassiveAPAC } from '@/lib/campaign-3-massive-apac';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Lightbulb,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import CountUp from 'react-countup';

export default function Campaign3AIInsights() {
  const analytics = Campaign3MassiveAPAC.getCampaignAnalytics();
  const strategy = Campaign3MassiveAPAC.generateCampaign3Strategy();

  const IncrementalGainCard = ({ title, value, suffix, description, color }: any) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            <CountUp end={value} decimals={value < 10 ? 1 : 0} suffix={suffix} duration={2} />
          </div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  const RecommendationCard = ({ recommendation, index }: any) => (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium">{recommendation}</p>
        </div>
      </div>
    </div>
  );

  const RiskFactorCard = ({ risk, index }: any) => (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-gray-800">{risk}</p>
        </div>
      </div>
    </div>
  );

  const SuccessFactorCard = ({ factor, index }: any) => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-gray-800">{factor}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* AI Performance Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Advanced AI Insights</h2>
              <p className="text-white/90">Campaign 3 Intelligence & Predictions</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              <CountUp end={analytics.aiAccuracy} decimals={1} suffix="%" duration={2} />
            </div>
            <div className="text-white/90">AI Accuracy</div>
          </div>
        </div>
      </div>

      {/* Incremental Gains Analysis */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-green-600" />
          Incremental Gains from Multi-Campaign Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IncrementalGainCard
            title="Download Increase"
            value={analytics.incrementalGains.downloadIncrease}
            suffix="x"
            description="5.1x more downloads than Campaign 2 through improved targeting"
            color="bg-blue-500"
          />
          <IncrementalGainCard
            title="Revenue Increase"
            value={analytics.incrementalGains.revenueIncrease}
            suffix="x"
            description="3.6x revenue growth through better creator matching"
            color="bg-green-500"
          />
          <IncrementalGainCard
            title="Efficiency Gain"
            value={analytics.incrementalGains.efficiencyGain * 100}
            suffix="%"
            description="23% reduction in cost per download through AI optimization"
            color="bg-purple-500"
          />
          <IncrementalGainCard
            title="Accuracy Improvement"
            value={analytics.incrementalGains.accuracyImprovement * 100}
            suffix="%"
            description="2.9% improvement in AI prediction accuracy"
            color="bg-orange-500"
          />
        </div>
      </div>

      {/* Campaign Evolution Comparison */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Campaign Evolution & Learning Curve
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Metric</th>
                <th className="text-center py-3 px-4">Campaign 1</th>
                <th className="text-center py-3 px-4">Campaign 2</th>
                <th className="text-center py-3 px-4 bg-blue-50">Campaign 3</th>
                <th className="text-center py-3 px-4">Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Budget</td>
                <td className="text-center py-3 px-4">$100K</td>
                <td className="text-center py-3 px-4">$2.5M</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">$8.5M</td>
                <td className="text-center py-3 px-4 text-green-600">3.4x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Markets</td>
                <td className="text-center py-3 px-4">1</td>
                <td className="text-center py-3 px-4">4</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">11</td>
                <td className="text-center py-3 px-4 text-green-600">2.75x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Creators</td>
                <td className="text-center py-3 px-4">10</td>
                <td className="text-center py-3 px-4">100</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">250</td>
                <td className="text-center py-3 px-4 text-green-600">2.5x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Downloads</td>
                <td className="text-center py-3 px-4">500K</td>
                <td className="text-center py-3 px-4">2.5M</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">12.8M</td>
                <td className="text-center py-3 px-4 text-green-600">5.1x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Revenue</td>
                <td className="text-center py-3 px-4">$1.6M</td>
                <td className="text-center py-3 px-4">$9M</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">$32.4M</td>
                <td className="text-center py-3 px-4 text-green-600">3.6x</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">ROI</td>
                <td className="text-center py-3 px-4">16x</td>
                <td className="text-center py-3 px-4">3.6x</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">3.8x</td>
                <td className="text-center py-3 px-4 text-green-600">+0.2x</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">AI Accuracy</td>
                <td className="text-center py-3 px-4">89.2%</td>
                <td className="text-center py-3 px-4">91.8%</td>
                <td className="text-center py-3 px-4 bg-blue-50 font-bold">94.7%</td>
                <td className="text-center py-3 px-4 text-green-600">+2.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          Top AI Recommendations
        </h3>
        <div className="space-y-4">
          {strategy.aiInsights.topRecommendations.map((recommendation: string, index: number) => (
            <RecommendationCard key={index} recommendation={recommendation} index={index} />
          ))}
        </div>
      </div>

      {/* Risk Factors */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          Risk Factors & Mitigation
        </h3>
        <div className="space-y-4">
          {strategy.aiInsights.riskFactors.map((risk: string, index: number) => (
            <RiskFactorCard key={index} risk={risk} index={index} />
          ))}
        </div>
      </div>

      {/* Success Factors */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Key Success Factors
        </h3>
        <div className="space-y-4">
          {strategy.aiInsights.successFactors.map((factor: string, index: number) => (
            <SuccessFactorCard key={index} factor={factor} index={index} />
          ))}
        </div>
      </div>

      {/* AI Technology Stack */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          Advanced AI Technology Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Predictive Matching 2.0</h4>
            <p className="text-sm text-gray-600">47 factors vs 23 in Campaign 2</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Real-Time Orchestration</h4>
            <p className="text-sm text-gray-600">4-hour optimization cycles</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Advanced Attribution 3.0</h4>
            <p className="text-sm text-gray-600">8 attribution models</p>
          </div>
        </div>
      </div>
    </div>
  );
}