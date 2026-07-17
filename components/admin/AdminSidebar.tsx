'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Users, BarChart3, Globe, Megaphone, CreditCard,
  Rocket, UserPlus, Info, Newspaper, Shield, Briefcase,
  Map, Target, Layout, ChevronRight, ChevronDown,
  Sparkles, Eye, PanelLeftClose, PanelLeft
} from 'lucide-react';

interface NavSection {
  title: string;
  routes: NavRoute[];
}

interface NavRoute {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  isNew?: boolean;
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Public Pages',
    routes: [
      { label: 'Homepage', href: '/', icon: <Home className="w-4 h-4" /> },
      { label: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
      { label: 'News', href: '/news', icon: <Newspaper className="w-4 h-4" /> },
      { label: 'How It Works', href: '/creators', icon: <Users className="w-4 h-4" /> },
      { label: 'For Brands', href: '/get-started', icon: <Rocket className="w-4 h-4" /> },
      { label: 'Creator Signup', href: '/creator-signup', icon: <UserPlus className="w-4 h-4" /> },
      { label: 'Talent Signup', href: '/talent-signup', icon: <UserPlus className="w-4 h-4" /> },
      { label: 'Pricing', href: '/pricing', icon: <CreditCard className="w-4 h-4" /> },
      { label: 'Beta Access', href: '/beta', icon: <Sparkles className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Dashboards',
    routes: [
      { label: 'Main Dashboard', href: '/dashboard', icon: <Layout className="w-4 h-4" /> },
      { label: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'Market Intelligence', href: '/dashboard/market-intelligence', icon: <Globe className="w-4 h-4" /> },
      { label: 'Brand Dashboard', href: '/dashboard/brand', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Brand Creators', href: '/dashboard/brand/creators', icon: <Users className="w-4 h-4" /> },
      { label: 'Creator Dashboard', href: '/dashboard/creator', icon: <Users className="w-4 h-4" /> },
      { label: 'Campaign 3 APAC', href: '/dashboard/campaign-3', icon: <Target className="w-4 h-4" /> },
      { label: 'Collabs', href: '/dashboard/collabs', icon: <Megaphone className="w-4 h-4" />, isNew: true },
      { label: 'AI Agents', href: '/dashboard/agents', icon: <Sparkles className="w-4 h-4" />, isNew: true },
      { label: 'Talent Roster', href: '/dashboard/talent', icon: <Users className="w-4 h-4" />, isNew: true },
      { label: 'Batch Upload', href: '/dashboard/batch-upload', icon: <Rocket className="w-4 h-4" />, isNew: true },
    ],
  },
  {
    title: 'Campaigns & Demos',
    routes: [
      { label: 'Campaigns', href: '/campaigns', icon: <Megaphone className="w-4 h-4" /> },
      { label: 'Agency Demo', href: '/agency-demo', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Thailand Demo', href: '/thailand-demo', icon: <Map className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Admin',
    routes: [
      { label: 'Admin Portal', href: '/admin', icon: <Shield className="w-4 h-4" /> },
      { label: 'Outreach Sender', href: '/admin/outreach', icon: <Megaphone className="w-4 h-4" />, isNew: true },
      { label: 'MMP Integration', href: '/admin/mmp-integration', icon: <Target className="w-4 h-4" /> },
      { label: 'Privacy Analysis', href: '/admin/integration-analysis', icon: <Eye className="w-4 h-4" /> },
      { label: 'Brief Accept', href: '/brief-accept', icon: <Rocket className="w-4 h-4" /> },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    NAV_SECTIONS.map(s => s.title)
  );
  const [visitedPages, setVisitedPages] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    setVisitedPages(stored);
  }, []);

  useEffect(() => {
    if (pathname && !visitedPages.includes(pathname)) {
      const updated = [...visitedPages, pathname];
      setVisitedPages(updated);
      localStorage.setItem('visitedPages', JSON.stringify(updated));
    }
  }, [pathname, visitedPages]);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isUnvisited = (href: string) => !visitedPages.includes(href);

  if (collapsed) {
    return (
      <div className="w-12 bg-gray-900 min-h-screen flex flex-col items-center py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors mb-4"
          title="Expand sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
        {NAV_SECTIONS.flatMap(s => s.routes)
          .filter(r => isActive(r.href))
          .map(r => (
            <div key={r.href} className="p-2 text-primary">
              {r.icon}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div>
          <h2 className="text-sm font-bold text-white">Platform Map</h2>
          <p className="text-[10px] text-gray-500">All routes & sections</p>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1.5 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          title="Collapse sidebar"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {NAV_SECTIONS.map(section => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
            >
              <span>{section.title}</span>
              {expandedSections.includes(section.title) ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>

            {expandedSections.includes(section.title) && (
              <div className="space-y-0.5 mb-2">
                {section.routes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all group ${
                      isActive(route.href)
                        ? 'bg-primary/20 text-primary font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className={isActive(route.href) ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}>
                      {route.icon}
                    </span>
                    <span className="flex-1 truncate">{route.label}</span>
                    {route.isNew && (
                      <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-bold rounded uppercase">
                        new
                      </span>
                    )}
                    {isUnvisited(route.href) && !isActive(route.href) && (
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" title="Not visited yet" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-[10px] text-gray-500">
          <div className="flex justify-between">
            <span>Pages visited</span>
            <span className="text-gray-400">{visitedPages.length}/{NAV_SECTIONS.flatMap(s => s.routes).length}</span>
          </div>
          <div className="mt-1 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(visitedPages.length / NAV_SECTIONS.flatMap(s => s.routes).length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
