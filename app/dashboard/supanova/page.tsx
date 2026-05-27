'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Users, Target, Download, ExternalLink,
  MapPin, Clock, CheckCircle, Circle, Star, Zap, Globe,
} from 'lucide-react';
import {
  supanovaConfig, creatorTargets, eventTasks,
  generateGoogleCalendarUrl, generateICSFile,
  getTierColor, getTierLabel,
} from '@/lib/supanova-event-intel';
import type { EventCreatorTarget, EventTask } from '@/lib/supanova-event-intel';

type Tab = 'overview' | 'creators' | 'tasks' | 'strategy';

export default function SupanovaPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [tasks, setTasks] = useState(eventTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleExportCalendar = () => {
    const ics = generateICSFile();
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supanova-sydney-2026-gamefluence.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const prioritySigns = creatorTargets.filter(c => c.tier === 'priority_sign');
  const highValue = creatorTargets.filter(c => c.tier === 'high_value');

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🎮</span> {supanovaConfig.name}
          </h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Calendar size={14} /> {supanovaConfig.dates}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {supanovaConfig.venue}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportCalendar} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            <Calendar size={16} /> Export to Calendar
          </button>
          <a href={supanovaConfig.signupUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            <ExternalLink size={16} /> Event Signup Link
          </a>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Creator Targets</p>
          <p className="text-2xl font-bold">{creatorTargets.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Priority Signs</p>
          <p className="text-2xl font-bold text-red-600">{prioritySigns.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">High Value</p>
          <p className="text-2xl font-bold text-orange-600">{highValue.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Tasks Done</p>
          <p className="text-2xl font-bold text-green-600">{completedTasks}/{tasks.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Days Until Event</p>
          <p className="text-2xl font-bold text-purple-600">{Math.max(0, Math.ceil((new Date('2026-06-19').getTime() - Date.now()) / 86400000))}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
        {([
          { id: 'overview' as Tab, label: 'Overview', icon: <Globe size={14} /> },
          { id: 'creators' as Tab, label: 'Creator Targets', icon: <Users size={14} /> },
          { id: 'tasks' as Tab, label: 'Task Planner', icon: <CheckCircle size={14} /> },
          { id: 'strategy' as Tab, label: 'Strategy & Links', icon: <Target size={14} /> },
        ]).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'creators' && <CreatorsTab creators={creatorTargets} />}
      {activeTab === 'tasks' && <TasksTab tasks={tasks} onToggle={toggleTask} />}
      {activeTab === 'strategy' && <StrategyTab />}
    </main>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <h3 className="font-bold text-lg mb-2">🎯 Mission</h3>
        <p className="text-gray-700">Sign 3–5 gaming creators as Gamefluence&apos;s first real roster. Capture hero video footage for the website. Build relationships for future APAC campaigns.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h4 className="font-bold mb-2 flex items-center gap-2"><Zap size={16} className="text-red-500" /> Priority Targets</h4>
          <p className="text-sm text-gray-600 mb-3">Vietnamese/Asian-Australian creators with esports credibility. Small audience but perfect APAC bridge.</p>
          <ul className="text-sm space-y-1">
            {creatorTargets.filter(c => c.tier === 'priority_sign').map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="font-medium">{c.name}</span>
                <span className="text-gray-400">— {c.followers.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h4 className="font-bold mb-2 flex items-center gap-2"><Star size={16} className="text-orange-500" /> High Value</h4>
          <p className="text-sm text-gray-600 mb-3">100K–500K creators with strong engagement. Likely unrepresented. Sign before they get agency&apos;d.</p>
          <ul className="text-sm space-y-1">
            {creatorTargets.filter(c => c.tier === 'high_value').map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="font-medium">{c.name}</span>
                <span className="text-gray-400">— {c.followers.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h4 className="font-bold mb-2 flex items-center gap-2"><Target size={16} className="text-blue-500" /> Anchors</h4>
          <p className="text-sm text-gray-600 mb-3">300K+ creators that give the roster credibility. Harder to sign but worth the effort.</p>
          <ul className="text-sm space-y-1">
            {creatorTargets.filter(c => c.tier === 'anchor').map(c => (
              <li key={c.id} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-medium">{c.name}</span>
                <span className="text-gray-400">— {c.followers.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <h4 className="font-bold mb-3">📅 Event Timeline</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="font-bold text-blue-800">Friday June 19</p>
            <p className="text-blue-600">Level Up Industry Day</p>
            <ul className="mt-2 space-y-1 text-blue-700">
              <li>• E-Racing GT7 Time Trials</li>
              <li>• Rocket League 2v2</li>
              <li>• Industry networking</li>
              <li>• Fewer crowds = better interviews</li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="font-bold text-purple-800">Saturday June 20</p>
            <p className="text-purple-600">Main Event Day 1</p>
            <ul className="mt-2 space-y-1 text-purple-700">
              <li>• Hero video filming</li>
              <li>• Cosplay + gaming floor</li>
              <li>• Creator outreach at booths</li>
              <li>• Peak crowd energy</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="font-bold text-green-800">Sunday June 21</p>
            <p className="text-green-600">Main Event Day 2</p>
            <ul className="mt-2 space-y-1 text-green-700">
              <li>• Final outreach passes</li>
              <li>• Wrap-up shots</li>
              <li>• Evening atmosphere footage</li>
              <li>• Collect remaining contacts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorsTab({ creators }: { creators: EventCreatorTarget[] }) {
  const sorted = [...creators].sort((a, b) => b.totalScore - a.totalScore);
  return (
    <div className="space-y-4">
      {sorted.map(creator => (
        <div key={creator.id} className="card border hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold shrink-0">
              {creator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-lg">{creator.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getTierColor(creator.tier)}`}>
                  {getTierLabel(creator.tier)}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{creator.platform}</span>
              </div>
              <p className="text-sm text-gray-500">{creator.handle} • {creator.heritage}</p>

              {/* Metrics Row */}
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span><strong>{creator.followers.toLocaleString()}</strong> followers</span>
                <span><strong>{creator.engagementRate}%</strong> engagement</span>
                <span><strong>{creator.avgViews.toLocaleString()}</strong> avg views</span>
                <span>Est: <strong>{creator.estMonthlyEarnings}</strong>/mo</span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1 mt-2">
                {creator.genres.map(g => (
                  <span key={g} className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded">{g}</span>
                ))}
              </div>

              {/* Scoring */}
              <div className="flex items-center gap-3 mt-3 text-xs">
                <span title="APAC Fit">🌏 {creator.apacFit}/5</span>
                <span title="Hunger">🔥 {creator.hunger}/5</span>
                <span title="Platforms">📱 {creator.platformSpread}/5</span>
                <span title="Professional">💼 {creator.professionalism}/5</span>
                <span title="Growth">📈 {creator.growthTrajectory}/5</span>
                <span className="font-bold text-primary ml-2">Score: {creator.totalScore}/25</span>
              </div>

              {/* Notes */}
              <p className="text-sm text-gray-600 mt-2 italic">{creator.notes}</p>

              {/* Brand & Representation */}
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span>Brands: {creator.worksBrands ? `Yes (${creator.knownBrands.join(', ') || 'unknown'})` : 'No brand work yet'}</span>
                <span>Represented: {creator.represented === 'yes' ? `✅ ${creator.representedBy}` : creator.represented === 'likely' ? `⚠️ Likely` : '❌ No'}</span>
                <span>Languages: {creator.languages.join(', ')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 shrink-0">
              <a href={creator.profileUrl} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 flex items-center gap-1">
                <ExternalLink size={12} /> Profile
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksTab({ tasks, onToggle }: { tasks: EventTask[]; onToggle: (id: string) => void }) {
  const categories = ['prep', 'equipment', 'outreach', 'content', 'follow_up'] as const;
  const categoryLabels: Record<string, string> = {
    prep: '📋 Preparation', equipment: '🎥 Equipment', outreach: '📨 Outreach',
    content: '🎬 Content', follow_up: '📬 Follow Up',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{tasks.filter(t => t.completed).length} of {tasks.length} tasks completed</p>
        <div className="flex gap-2">
          {tasks.length > 0 && (
            <button onClick={() => {
              const ics = generateICSFile();
              const blob = new Blob([ics], { type: 'text/calendar' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'supanova-tasks.ics';
              a.click();
              URL.revokeObjectURL(url);
            }} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200">
              <Download size={12} /> Download .ics (Google Calendar)
            </button>
          )}
        </div>
      </div>

      {categories.map(cat => {
        const catTasks = tasks.filter(t => t.category === cat);
        if (catTasks.length === 0) return null;
        return (
          <div key={cat}>
            <h3 className="font-bold text-sm mb-3">{categoryLabels[cat]}</h3>
            <div className="space-y-2">
              {catTasks.map(task => (
                <div key={task.id} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'}`}>
                  <button onClick={() => onToggle(task.id)} className="mt-0.5 shrink-0">
                    {task.completed ? <CheckCircle size={18} className="text-green-500" /> : <Circle size={18} className="text-gray-300" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-600' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-400">{new Date(task.dueDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</span>
                    <a href={generateGoogleCalendarUrl(task)} target="_blank" rel="noopener noreferrer" title="Add to Google Calendar"
                      className="p-1 hover:bg-blue-50 rounded">
                      <Calendar size={14} className="text-blue-500" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StrategyTab() {
  const { dailySearchQueries, timingStrategy, salesNavStrategy, linkedInExportInstructions } = require('@/lib/supanova-event-intel');

  return (
    <div className="space-y-6">
      {/* Timing Strategy */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock size={18} /> When & Where to Approach Creators</h3>
        <div className="space-y-3">
          {timingStrategy.map((slot: any, i: number) => (
            <div key={i} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-primary">{slot.timeSlot}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{slot.location}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1"><strong>Who&apos;s there:</strong> {slot.whosThere}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Approach:</strong> {slot.approach}</p>
              <p className="text-sm text-green-700"><strong>Best for:</strong> {slot.bestFor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Search Queries */}
      <div className="card">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe size={18} /> Social Listening — Daily Searches</h3>
        <p className="text-sm text-gray-500 mb-4">Run these searches regularly to spot who&apos;s attending and what opportunities are emerging.</p>
        <div className="space-y-2">
          {dailySearchQueries.map((q: any, i: number) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded shrink-0">{q.platform}</span>
              <div className="flex-1">
                <code className="text-sm bg-white px-2 py-0.5 rounded border">{q.query}</code>
                <p className="text-xs text-gray-500 mt-1">{q.purpose}</p>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">{q.frequency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Strategy */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold mb-3 flex items-center gap-2">🔗 LinkedIn Connections Export</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Export your LinkedIn connections to find gaming/creator contacts who might be at Supanova:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Go to <a href="https://www.linkedin.com/mypreferences/d/download-my-data" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn Data Export</a></li>
              <li>Select &quot;Connections&quot; checkbox</li>
              <li>Click &quot;Request archive&quot;</li>
              <li>Download CSV when ready (~10 min)</li>
              <li>Filter for gaming/esports/creator roles</li>
              <li>Cross-reference with Supanova guest list</li>
            </ol>
          </div>
        </div>
        <div className="card">
          <h3 className="font-bold mb-3 flex items-center gap-2">💼 Sales Navigator Free Trial</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Cost:</strong> Free for 1 month (then $99/mo — cancel before July 4)</p>
            <p><strong>Activate:</strong> June 5, 2026</p>
            <p><strong>Key searches:</strong></p>
            <ul className="list-disc list-inside text-xs space-y-1">
              <li>&quot;Content Creator&quot; + &quot;Gaming&quot; + &quot;Sydney&quot;</li>
              <li>&quot;Supanova&quot; in posts (last 30 days)</li>
              <li>&quot;Influencer Marketing&quot; + &quot;Gaming&quot; + &quot;Australia&quot;</li>
              <li>&quot;Esports&quot; + &quot;Australia&quot;</li>
            </ul>
            <p className="mt-2"><strong>InMail budget:</strong> 50 credits/month — use for pre-event outreach to top targets</p>
          </div>
        </div>
      </div>

      {/* Event Links */}
      <div className="card">
        <h3 className="font-bold mb-3">🔗 Key Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {supanovaConfig.links.map((link: any) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 border rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors text-sm">
              <ExternalLink size={14} className="text-purple-500" />
              {link.label}
            </a>
          ))}
          <a href="https://www.linkedin.com/mypreferences/d/download-my-data" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm">
            <ExternalLink size={14} className="text-blue-500" />
            LinkedIn Data Export
          </a>
          <a href="https://www.linkedin.com/sales/ssi" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm">
            <ExternalLink size={14} className="text-blue-500" />
            Sales Navigator Trial
          </a>
        </div>
      </div>

      {/* Unique Signup Strategy */}
      <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Zap size={18} className="text-green-600" /> Event-Attributed Signup</h3>
        <p className="text-sm text-gray-700 mb-3">Every creator signed at Supanova gets tracked with a unique event code so you can measure ROI of attending.</p>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-xs text-gray-500 mb-1">Signup URL (on business cards / QR code):</p>
          <code className="text-sm text-green-700 break-all">{supanovaConfig.signupUrl}</code>
          <p className="text-xs text-gray-500 mt-3 mb-1">Promo code (verbal):</p>
          <code className="text-lg font-bold text-green-700">{supanovaConfig.signupCode}</code>
        </div>
        <p className="text-xs text-gray-500 mt-3">All signups with this URL/code will be tagged as &quot;Supanova Sydney 2026&quot; in the leads system for attribution.</p>
      </div>
    </div>
  );
}
