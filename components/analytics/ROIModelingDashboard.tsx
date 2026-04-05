import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { DollarSign, TrendingUp, BarChart3, Calendar, Users, Zap } from 'lucide-react';
import { regionData } from '@/components/campaign/RegionTargeting';
import CountUp from 'react-countup';

interface ROIModelingProps {
  campaignId?: string;
  initialData?: any;
}

export default function ROIModelingDashboard({ campaignId, initialData }: ROIModelingProps) {
  const [modelParams, setModelParams] = useState({
    region: 'north_america',
    platform: 'cross_platform',
    cpi: 2.50,
    arpu: 4.00,
    ltv: 6.00,
    retentionRate: 32,
    conversionRate: 3.5,
    campaignBudget: 10000,
    attributionModel: 'position-based'
  });
  
  const [cohortData, setCohortData] = useState({
    day1: { retention: 45, conversion: 2.1, arpu: 0.15 },
    day3: { retention: 28, conversion: 3.8, arpu: 0.42 },
    day7: { retention: 18, conversion: 5.2, arpu: 0.95 }
  });
  
  // Calculate ROI metrics
  const projectedRoi = (modelParams.ltv / modelParams.cpi) * 100 - 100;
  const breakEvenPoint = Math.ceil(modelParams.cpi / (modelParams.arpu / 30));
  const estimatedInstalls = Math.floor(modelParams.campaignBudget / modelParams.cpi);
  const estimatedRevenue = estimatedInstalls * modelParams.ltv;
  const estimatedProfit = estimatedRevenue - modelParams.campaignBudget;
  
  // Attribution models
  const attributionModels = [
    { id: 'first-touch', name: 'First Touch', description: '100% credit to first touchpoint' },
    { id: 'last-touch', name: 'Last Touch', description: '100% credit to last touchpoint' },
    { id: 'linear', name: 'Linear', description: 'Equal credit across all touchpoints' },
    { id: 'position-based', name: 'Position Based', description: '40% first, 20% middle, 40% last' },
    { id: 'time-decay', name: 'Time Decay', description: 'More credit to recent touchpoints' }
  ];
  
  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModelParams(prev => ({
      ...prev,
      [name]: name === 'region' || name === 'platform' || name === 'attributionModel' 
        ? value 
        : parseFloat(value)
    }));
    
    // Update CPI and ARPU based on region selection
    if (name === 'region') {
      const region = regionData.find(r => r.id === value);
      if (region) {
        setModelParams(prev => ({
          ...prev,
          cpi: prev.platform === 'ios' ? region.iosCPI : region.androidCPI,
          arpu: prev.platform === 'ios' ? region.iosCPI * 1.5 : region.androidCPI * 1.5,
          ltv: prev.platform === 'ios' ? region.iosCPI * 2.2 : region.androidCPI * 2.2,
        }));
      }
    }
    
    // Update CPI and ARPU based on platform selection
    if (name === 'platform') {
      const region = regionData.find(r => r.id === modelParams.region);
      if (region) {
        if (value === 'ios') {
          setModelParams(prev => ({
            ...prev,
            cpi: region.iosCPI,
            arpu: region.iosCPI * 1.5,
            ltv: region.iosCPI * 2.2,
          }));
        } else if (value === 'android') {
          setModelParams(prev => ({
            ...prev,
            cpi: region.androidCPI,
            arpu: region.androidCPI * 1.5,
            ltv: region.androidCPI * 2.2,
          }));
        } else {
          // Cross-platform average
          setModelParams(prev => ({
            ...prev,
            cpi: (region.iosCPI + region.androidCPI) / 2,
            arpu: ((region.iosCPI + region.androidCPI) / 2) * 1.5,
            ltv: ((region.iosCPI + region.androidCPI) / 2) * 2.2,
          }));
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ROI Modeling & Attribution</h2>
        <Button variant="outline">Export Model</Button>
      </div>
      
      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-600">Projected ROI</h3>
            <DollarSign className="text-primary w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-primary">
            <CountUp 
              end={projectedRoi} 
              suffix="%" 
              decimals={1}
              duration={1.5}
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            LTV/CPI Ratio: {(modelParams.ltv / modelParams.cpi).toFixed(2)}x
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-600">Break-Even Point</h3>
            <Calendar className="text-secondary w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-secondary">
            <CountUp 
              end={breakEvenPoint} 
              suffix=" days" 
              duration={1.5}
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Based on daily ARPU of ${(modelParams.arpu / 30).toFixed(2)}
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-success/10 to-success/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-600">Estimated Installs</h3>
            <Users className="text-success w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-success">
            <CountUp 
              end={estimatedInstalls} 
              separator="," 
              duration={1.5}
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            At ${modelParams.cpi.toFixed(2)} CPI
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-600">Estimated Revenue</h3>
            <TrendingUp className="text-accent w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-accent">
            <CountUp 
              prefix="$" 
              end={estimatedRevenue} 
              separator="," 
              duration={1.5}
            />
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Profit: ${estimatedProfit.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* ROI Model Parameters */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="text-primary" />
          ROI Model Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Target Region</label>
            <select
              name="region"
              value={modelParams.region}
              onChange={handleParamChange}
              className="w-full p-3 border rounded-lg"
            >
              {regionData.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name} (Android: ${region.androidCPI.toFixed(2)}, iOS: ${region.iosCPI.toFixed(2)})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Platform Focus</label>
            <select
              name="platform"
              value={modelParams.platform}
              onChange={handleParamChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="ios">iOS Focus</option>
              <option value="android">Android Focus</option>
              <option value="cross_platform">Cross-Platform</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Attribution Model</label>
            <select
              name="attributionModel"
              value={modelParams.attributionModel}
              onChange={handleParamChange}
              className="w-full p-3 border rounded-lg"
            >
              {attributionModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {attributionModels.find(m => m.id === modelParams.attributionModel)?.description}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cost Per Install (CPI)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                name="cpi"
                value={modelParams.cpi}
                onChange={handleParamChange}
                className="w-full p-3 pl-7 border rounded-lg"
                step="0.01"
                min="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Average Revenue Per User (ARPU)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                name="arpu"
                value={modelParams.arpu}
                onChange={handleParamChange}
                className="w-full p-3 pl-7 border rounded-lg"
                step="0.01"
                min="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Lifetime Value (LTV)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                name="ltv"
                value={modelParams.ltv}
                onChange={handleParamChange}
                className="w-full p-3 pl-7 border rounded-lg"
                step="0.01"
                min="0.01"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">30-Day Retention Rate (%)</label>
            <input
              type="number"
              name="retentionRate"
              value={modelParams.retentionRate}
              onChange={handleParamChange}
              className="w-full p-3 border rounded-lg"
              step="0.1"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Conversion Rate (%)</label>
            <input
              type="number"
              name="conversionRate"
              value={modelParams.conversionRate}
              onChange={handleParamChange}
              className="w-full p-3 border rounded-lg"
              step="0.1"
              min="0"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Campaign Budget</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                name="campaignBudget"
                value={modelParams.campaignBudget}
                onChange={handleParamChange}
                className="w-full p-3 pl-7 border rounded-lg"
                step="1000"
                min="1000"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Cohort Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="text-gaming" />
          Day 1/3/7 Cohort Analysis
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-semibold">Metric</th>
                <th className="p-3 text-center font-semibold">Day 1</th>
                <th className="p-3 text-center font-semibold">Day 3</th>
                <th className="p-3 text-center font-semibold">Day 7</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Retention Rate</td>
                <td className="p-3 text-center">{cohortData.day1.retention}%</td>
                <td className="p-3 text-center">{cohortData.day3.retention}%</td>
                <td className="p-3 text-center">{cohortData.day7.retention}%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Conversion Rate</td>
                <td className="p-3 text-center">{cohortData.day1.conversion}%</td>
                <td className="p-3 text-center">{cohortData.day3.conversion}%</td>
                <td className="p-3 text-center">{cohortData.day7.conversion}%</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">ARPU</td>
                <td className="p-3 text-center">${cohortData.day1.arpu.toFixed(2)}</td>
                <td className="p-3 text-center">${cohortData.day3.arpu.toFixed(2)}</td>
                <td className="p-3 text-center">${cohortData.day7.arpu.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-primary w-4 h-4" />
            <h4 className="font-semibold">Key Insights</h4>
          </div>
          <ul className="space-y-1 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Early monetization is critical - {cohortData.day1.conversion}% of users convert on Day 1</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>ARPU increases by {((cohortData.day7.arpu / cohortData.day1.arpu) * 100 - 100).toFixed(0)}% from Day 1 to Day 7</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Retention drops to {cohortData.day7.retention}% by Day 7 - focus on engagement strategies</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Attribution Visualization Placeholder */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Multi-Touch Attribution Visualization</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Attribution visualization will be displayed here</p>
            <p className="text-sm">Connect analytics APIs to view real-time data</p>
          </div>
        </div>
      </div>
    </div>
  );
}