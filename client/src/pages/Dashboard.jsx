import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import { Users, Activity, Calendar, Plus, Download, UserPlus, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user, token, API_URL } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = stats?.contactGrowth?.map(item => ({
    month: monthNames[item._id.month - 1],
    contacts: item.count
  })) || [];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-sahara-800">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-sienna-600 font-medium mb-1">Dashboard</p>
        <h1 className="font-heading text-4xl text-sahara-950 mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}.
        </h1>
        <p className="text-sahara-800 text-sm">
          {stats?.totalContacts > 0
            ? `You have ${stats.totalContacts} contacts in your network.`
            : 'Start building your network by adding your first contact.'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatsCard
          label="Total Contacts"
          value={stats?.totalContacts || 0}
          icon={Users}
        />
        <StatsCard
          label="Recent Activities"
          value={stats?.recentActivity || 0}
          subtitle="Added in last 24 hours"
          icon={Activity}
        />
        <StatsCard
          label="Tag Groups"
          value={stats?.tagDistribution?.length || 0}
          subtitle="Active categories"
          icon={Calendar}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-xl text-sahara-950 mb-1">Contact Growth</h3>
          <p className="text-xs text-sahara-800 mb-6">Performance over the last 6 months</p>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ece6dc" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#605850' }}
                  axisLine={{ stroke: '#d8d0c8' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#605850' }}
                  axisLine={{ stroke: '#d8d0c8' }}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#faf5ee',
                    border: '1px solid #d8d0c8',
                    borderRadius: '8px',
                    fontSize: '13px',
                    boxShadow: '0 2px 16px rgba(58,48,42,0.04)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="contacts"
                  stroke="#c2652a"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#c2652a', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#c2652a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[260px] flex items-center justify-center text-sahara-800 text-sm">
              No growth data yet. Start adding contacts!
            </div>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-xl text-sahara-950 mb-4">Recent Leads</h3>
          <div className="space-y-4">
            {stats?.recentContacts?.length > 0 ? (
              stats.recentContacts.map(contact => (
                <Link
                  key={contact._id}
                  to={`/contacts/${contact._id}`}
                  className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-sahara-100 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-sienna-600/10 flex items-center justify-center text-sienna-600 font-heading text-sm font-semibold shrink-0">
                    {contact.image ? (
                      <img src={contact.image} alt={contact.name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      contact.name?.charAt(0)?.toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sahara-950 truncate">{contact.name}</p>
                    <p className="text-xs text-sahara-800 truncate">{contact.title || contact.email}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-sahara-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))
            ) : (
              <p className="text-sm text-sahara-800">No contacts yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Shortcut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-lg text-sahara-950 mb-2">Curated Shortcuts</h3>
          <p className="text-xs text-sahara-800 mb-4">Quick actions for your workflow</p>
          <div className="flex gap-3">
            <Link
              to="/add-contact"
              className="flex items-center gap-2 px-4 py-2 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors"
            >
              <Plus size={16} /> Add Contact
            </Link>
            <Link
              to="/contacts"
              className="flex items-center gap-2 px-4 py-2 border border-sahara-600 text-sahara-950 rounded-lg text-sm font-medium hover:bg-sahara-200 transition-colors"
            >
              <Users size={16} /> View All
            </Link>
          </div>
        </div>
        <div className="bg-sienna-600/5 rounded-xl p-6 border border-sienna-600/15">
          <h3 className="font-heading text-lg text-sahara-950 mb-2">Build Better Relationships</h3>
          <p className="text-xs text-sahara-800 leading-relaxed">
            Keep your contacts organized with tags and notes. Regular updates help you maintain strong professional connections and never miss an opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}
