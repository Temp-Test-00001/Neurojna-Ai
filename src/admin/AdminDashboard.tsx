import { useEffect, useState, useCallback } from 'react';
import { fetchStats, fetchEnquiries, fetchSubscribers, updateEnquiryStatus, deleteEnquiry, deleteSubscriber } from './api';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import {
  LayoutDashboard, Mail, Users, CheckCircle, Clock, AlertCircle,
  Trash2, RefreshCw, LogOut, TrendingUp, MessageSquare, Bell
} from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const STATUS_STYLES: Record<string, string> = {
  new:         'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'in-progress': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  resolved:    'bg-green-500/15 text-green-400 border-green-500/30',
};

function StatCard({ label, value, icon: Icon, color, sub }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/8 transition-colors">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400 font-sans">{label}</div>
        {sub && <div className="text-xs text-gray-600 font-mono mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono shadow-xl">
      <div className="text-gray-400 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'overview' | 'enquiries' | 'subscribers'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [enquiryTotal, setEnquiryTotal] = useState(0);
  const [enquiryPage, setEnquiryPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadStats = useCallback(async () => {
    const data = await fetchStats();
    setStats(data);
    setLastUpdated(new Date());
  }, []);

  const loadEnquiries = useCallback(async () => {
    const data = await fetchEnquiries(enquiryPage, statusFilter || undefined);
    setEnquiries(data.data);
    setEnquiryTotal(data.total);
  }, [enquiryPage, statusFilter]);

  const loadSubscribers = useCallback(async () => {
    const data = await fetchSubscribers();
    setSubscribers(data.data);
  }, []);

  useEffect(() => {
    Promise.all([loadStats(), loadEnquiries(), loadSubscribers()])
      .finally(() => setLoading(false));
    // Auto-refresh every 30s
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  const refresh = async () => {
    setRefreshing(true);
    await Promise.all([loadStats(), loadEnquiries(), loadSubscribers()]);
    setRefreshing(false);
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateEnquiryStatus(id, status);
    loadEnquiries();
    loadStats();
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm('Delete this enquiry?')) return;
    await deleteEnquiry(id);
    loadEnquiries();
    loadStats();
  };

  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return;
    await deleteSubscriber(id);
    loadSubscribers();
    loadStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 font-mono text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview',     label: 'Overview',     icon: LayoutDashboard },
    { id: 'enquiries',    label: 'Enquiries',     icon: MessageSquare, badge: stats?.counts?.new },
    { id: 'subscribers',  label: 'Subscribers',   icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-black/30 border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img src="/assets/logo.png" alt="Neurojna AI" className="h-8 w-auto object-contain" />
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}>
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <button onClick={refresh}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h1 className="font-display font-bold text-lg capitalize">{tab}</h1>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live · updated {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="p-6">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && stats && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard label="Total Enquiries" value={stats.counts.total} icon={MessageSquare} color="bg-blue-600" />
                <StatCard label="New" value={stats.counts.new} icon={Bell} color="bg-violet-600" sub="Needs attention" />
                <StatCard label="In Progress" value={stats.counts.inProgress} icon={Clock} color="bg-yellow-600" />
                <StatCard label="Resolved" value={stats.counts.resolved} icon={CheckCircle} color="bg-green-600" />
                <StatCard label="Subscribers" value={stats.counts.subscribers} icon={Users} color="bg-cyan-600" />
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Enquiries over time */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading font-semibold text-white">Enquiries — Last 30 Days</h3>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={stats.enquiriesOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }}
                        tickFormatter={v => new Date(v).toLocaleDateString('en', { month: 'short', day: 'numeric' })} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="count" name="Enquiries" stroke="#3b82f6" strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* By service pie */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-heading font-semibold text-white mb-5">By Program</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={stats.enquiriesByService} dataKey="count" nameKey="service"
                        cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                        {stats.enquiriesByService.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8}
                        formatter={(v) => <span style={{ color: '#9ca3af', fontSize: 11 }}>{v}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Subscribers chart + recent enquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-heading font-semibold text-white mb-5">New Subscribers</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={stats.subscribersOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 9 }}
                        tickFormatter={v => new Date(v).toLocaleDateString('en', { day: 'numeric', month: 'short' })} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 9 }} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="count" name="Subscribers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent enquiries */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="font-heading font-semibold text-white mb-4">Recent Enquiries</h3>
                  <div className="space-y-3">
                    {stats.recentEnquiries.map((e: any) => (
                      <div key={e.id} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-white truncate">{e.name}</div>
                          <div className="text-xs text-gray-500 font-mono truncate">{e.email}</div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono shrink-0">
                          {new Date(e.created_at).toLocaleDateString()}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[e.status]}`}>
                          {e.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ENQUIRIES ── */}
          {tab === 'enquiries' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {['', 'new', 'in-progress', 'resolved'].map(s => (
                  <button key={s} onClick={() => { setStatusFilter(s); setEnquiryPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                      statusFilter === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                    }`}>
                    {s || 'All'} {s === '' && `(${enquiryTotal})`}
                  </button>
                ))}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-wider">
                      {['Name', 'Email', 'Program', 'Message', 'Date', 'Status', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(e => (
                      <tr key={e.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 font-medium text-white">{e.name}</td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-xs">{e.email}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{e.service || '—'}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px] truncate">{e.message}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                          {new Date(e.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <select value={e.status}
                            onChange={ev => handleStatusChange(e.id, ev.target.value)}
                            className={`text-[10px] font-mono px-2 py-1 rounded-full border bg-transparent cursor-pointer ${STATUS_STYLES[e.status]}`}>
                            <option value="new">new</option>
                            <option value="in-progress">in-progress</option>
                            <option value="resolved">resolved</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeleteEnquiry(e.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {enquiries.length === 0 && (
                  <div className="text-center py-12 text-gray-600 font-mono text-sm">No enquiries found</div>
                )}
              </div>

              {/* Pagination */}
              {enquiryTotal > 15 && (
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>Showing {(enquiryPage - 1) * 15 + 1}–{Math.min(enquiryPage * 15, enquiryTotal)} of {enquiryTotal}</span>
                  <div className="flex gap-2">
                    <button disabled={enquiryPage === 1} onClick={() => setEnquiryPage(p => p - 1)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">
                      Prev
                    </button>
                    <button disabled={enquiryPage * 15 >= enquiryTotal} onClick={() => setEnquiryPage(p => p + 1)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 hover:bg-white/10 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SUBSCRIBERS ── */}
          {tab === 'subscribers' && (
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-wider">
                      {['#', 'Email', 'Subscribed', ''].map(h => (
                        <th key={h} className="px-4 py-3 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s, i) => (
                      <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{i + 1}</td>
                        <td className="px-4 py-3 text-white font-mono">{s.email}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeleteSubscriber(s.id)}
                            className="text-gray-600 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscribers.length === 0 && (
                  <div className="text-center py-12 text-gray-600 font-mono text-sm">No subscribers yet</div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
