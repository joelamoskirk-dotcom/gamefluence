'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  Ticket, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  User,
  Search,
  Filter,
  Plus,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Timer,
  Star
} from 'lucide-react';

interface TicketData {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  status: 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed' | 'escalated';
  assignedTo?: string;
  reporterId: string;
  reporterType: string;
  createdAt: Date;
  updatedAt: Date;
  slaStatus: 'within_sla' | 'approaching_breach' | 'breached';
  resolutionTime?: number;
  firstResponseTime?: number;
  customerSatisfactionScore?: number;
  category: string;
}

interface TicketAnalytics {
  totalTickets: number;
  openTickets: number;
  avgResolutionTime: number;
  avgFirstResponseTime: number;
  slaCompliance: number;
  satisfactionScore: number;
  ticketsByCategory: Record<string, number>;
  ticketsByPriority: Record<string, number>;
}

export default function TicketingDashboard() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [analytics, setAnalytics] = useState<TicketAnalytics>({
    totalTickets: 0,
    openTickets: 0,
    avgResolutionTime: 0,
    avgFirstResponseTime: 0,
    slaCompliance: 0,
    satisfactionScore: 0,
    ticketsByCategory: {},
    ticketsByPriority: {}
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    // Initialize with sample data
    const sampleTickets: TicketData[] = [
      {
        id: 'ticket_001',
        title: 'Payment not received for Campaign #123',
        description: 'Creator reports payment delay for completed campaign',
        type: 'billing',
        priority: 'high',
        status: 'in_progress',
        assignedTo: 'finance_agent_1',
        reporterId: 'creator_001',
        reporterType: 'creator',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
        slaStatus: 'within_sla',
        firstResponseTime: 45,
        category: 'billing'
      },
      {
        id: 'ticket_002',
        title: 'Dashboard not loading properly',
        description: 'User experiencing issues with dashboard loading',
        type: 'technical',
        priority: 'medium',
        status: 'open',
        reporterId: 'brand_001',
        reporterType: 'brand',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        slaStatus: 'approaching_breach',
        category: 'technical'
      },
      {
        id: 'ticket_003',
        title: 'Feature request: Bulk campaign creation',
        description: 'Request for ability to create multiple campaigns at once',
        type: 'feature_request',
        priority: 'low',
        status: 'resolved',
        assignedTo: 'product_manager_1',
        reporterId: 'brand_002',
        reporterType: 'brand',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        slaStatus: 'within_sla',
        resolutionTime: 1320, // 22 hours
        firstResponseTime: 120,
        customerSatisfactionScore: 4.5,
        category: 'feature_request'
      },
      {
        id: 'ticket_004',
        title: 'Critical: Platform completely down',
        description: 'Users cannot access the platform',
        type: 'technical',
        priority: 'critical',
        status: 'escalated',
        assignedTo: 'senior_engineer_1',
        reporterId: 'system',
        reporterType: 'system',
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
        updatedAt: new Date(Date.now() - 10 * 60 * 1000),
        slaStatus: 'breached',
        firstResponseTime: 15,
        category: 'technical'
      }
    ];

    setTickets(sampleTickets);

    // Calculate analytics
    const openTickets = sampleTickets.filter(t => !['resolved', 'closed'].includes(t.status));
    const resolvedTickets = sampleTickets.filter(t => t.status === 'resolved');
    const ticketsWithResponse = sampleTickets.filter(t => t.firstResponseTime);
    const ticketsWithSatisfaction = sampleTickets.filter(t => t.customerSatisfactionScore);
    const slaCompliant = sampleTickets.filter(t => t.slaStatus !== 'breached');

    const ticketsByCategory = sampleTickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ticketsByPriority = sampleTickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setAnalytics({
      totalTickets: sampleTickets.length,
      openTickets: openTickets.length,
      avgResolutionTime: resolvedTickets.length > 0 
        ? resolvedTickets.reduce((sum, t) => sum + (t.resolutionTime || 0), 0) / resolvedTickets.length 
        : 0,
      avgFirstResponseTime: ticketsWithResponse.length > 0
        ? ticketsWithResponse.reduce((sum, t) => sum + (t.firstResponseTime || 0), 0) / ticketsWithResponse.length
        : 0,
      slaCompliance: (slaCompliant.length / sampleTickets.length) * 100,
      satisfactionScore: ticketsWithSatisfaction.length > 0
        ? ticketsWithSatisfaction.reduce((sum, t) => sum + (t.customerSatisfactionScore || 0), 0) / ticketsWithSatisfaction.length
        : 0,
      ticketsByCategory,
      ticketsByPriority
    });
  }, []);

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-orange-600 bg-orange-100',
      critical: 'text-red-600 bg-red-100',
      urgent: 'text-purple-600 bg-purple-100'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: 'text-blue-600 bg-blue-100',
      in_progress: 'text-yellow-600 bg-yellow-100',
      pending_customer: 'text-orange-600 bg-orange-100',
      resolved: 'text-green-600 bg-green-100',
      closed: 'text-gray-600 bg-gray-100',
      escalated: 'text-red-600 bg-red-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getSLAStatusIcon = (status: string) => {
    switch (status) {
      case 'within_sla':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'approaching_breach':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'breached':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ticketing Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.openTickets} open tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(Math.round(analytics.avgResolutionTime))}</div>
            <p className="text-xs text-muted-foreground">
              First response: {formatTime(Math.round(analytics.avgFirstResponseTime))}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${analytics.slaCompliance >= 95 ? 'text-green-600' : 
                           analytics.slaCompliance >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
              {analytics.slaCompliance.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Target: 95%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.satisfactionScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sla">SLA Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Priority Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Priority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.ticketsByPriority).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
                          {priority}
                        </span>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Tickets by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.ticketsByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="capitalize">{category.replace('_', ' ')}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent High Priority Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>High Priority Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tickets
                  .filter(ticket => ['high', 'critical', 'urgent'].includes(ticket.priority))
                  .slice(0, 5)
                  .map(ticket => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSLAStatusIcon(ticket.slaStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Tickets Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Ticket</th>
                      <th className="text-left p-4">Priority</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Assigned To</th>
                      <th className="text-left p-4">Reporter</th>
                      <th className="text-left p-4">SLA</th>
                      <th className="text-left p-4">Created</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map(ticket => (
                      <tr key={ticket.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{ticket.title}</p>
                            <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-4">
                          {ticket.assignedTo ? (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span className="text-sm">{ticket.assignedTo}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Unassigned</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{ticket.reporterId}</span>
                          <span className="text-xs text-muted-foreground block">{ticket.reporterType}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {getSLAStatusIcon(ticket.slaStatus)}
                            <span className="text-xs">{ticket.slaStatus.replace('_', ' ')}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{ticket.createdAt.toLocaleDateString()}</span>
                          <span className="text-xs text-muted-foreground block">
                            {ticket.createdAt.toLocaleTimeString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolution Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Resolution Time</span>
                    <span className="font-medium">{formatTime(Math.round(analytics.avgResolutionTime))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average First Response</span>
                    <span className="font-medium">{formatTime(Math.round(analytics.avgFirstResponseTime))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SLA Compliance</span>
                    <span className="font-medium">{analytics.slaCompliance.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Rating</span>
                    <span className="font-medium">{analytics.satisfactionScore.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Promoter Score</span>
                    <span className="font-medium">+42</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sla" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets
                  .filter(ticket => !['resolved', 'closed'].includes(ticket.status))
                  .map(ticket => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getSLAStatusIcon(ticket.slaStatus)}
                        <div>
                          <p className="font-medium">{ticket.title}</p>
                          <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Created {Math.floor((Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60))}h ago
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}