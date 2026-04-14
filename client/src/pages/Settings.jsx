import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function Settings() {
  const { user, token, API_URL, updateProfile, isAdmin } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', email: user.email || '' });
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin && showAdmin) {
      fetchUsers();
    }
  }, [showAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.contacts || []);
      }
    } catch (err) {
      console.error('Failed to load users');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-sm text-sienna-600 font-medium mb-1">Settings</p>
        <h1 className="font-heading text-4xl text-sahara-950">Account Settings</h1>
        <p className="text-sahara-800 text-sm mt-1">Manage your profile and preferences.</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50 mb-6">
        <h3 className="font-heading text-xl text-sahara-950 mb-5 flex items-center gap-2">
          <User size={18} className="text-sienna-600" /> Profile Information
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Name</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Email</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-full bg-sienna-600/10 text-sienna-600 text-xs font-medium capitalize">
              {user?.role || 'user'}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors disabled:opacity-60"
            >
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Panel */}
      {isAdmin && (
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading text-xl text-sahara-950 flex items-center gap-2">
              <Shield size={18} className="text-sienna-600" /> Admin Panel
            </h3>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="text-sm text-sienna-600 font-medium hover:underline"
            >
              {showAdmin ? 'Hide' : 'View Registered Users'}
            </button>
          </div>

          {showAdmin && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sahara-300">
                    <th className="text-left py-3 px-4 text-sahara-800 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-sahara-800 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={idx} className="border-b border-sahara-200 hover:bg-sahara-100 transition-colors">
                      <td className="py-3 px-4 text-sahara-950">{u.name}</td>
                      <td className="py-3 px-4 text-sahara-800">{u.email}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={2} className="py-6 text-center text-sahara-800">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
