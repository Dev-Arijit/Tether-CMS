import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sun, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sahara-50 flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-sahara-950 relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-sienna-600 flex items-center justify-center">
              <Sun size={22} className="text-white" />
            </div>
            <span className="font-heading text-2xl text-white font-semibold">Sahara CMS</span>
          </div>
          <h2 className="font-heading text-4xl text-white mb-4 leading-tight">
            Welcome back to your sanctuary.
          </h2>
          <p className="text-sahara-600 leading-relaxed">
            Your professional network awaits. Sign in to continue cultivating meaningful connections with warmth and clarity.
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sienna-600/10" />
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-sienna-600/5" />
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-sienna-600 flex items-center justify-center">
              <Sun size={17} className="text-white" />
            </div>
            <span className="font-heading text-lg font-semibold text-sahara-950">Sahara CMS</span>
          </div>

          <h1 className="font-heading text-3xl text-sahara-950 mb-2">Sign In</h1>
          <p className="text-sahara-800 text-sm mb-8">Enter your credentials to access your network.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sahara-800" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm text-sahara-950 placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sahara-800" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm text-sahara-950 placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-sienna-600 text-white rounded-lg font-medium hover:bg-sienna-700 focus:ring-2 focus:ring-sienna-600/30 focus:ring-offset-2 focus:ring-offset-sahara-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-sahara-800 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-sienna-600 font-medium hover:underline">
              Create one
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-sahara-600/20 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-sahara-800 hover:text-sienna-600 transition-colors font-medium">
              <ArrowLeft size={14} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}