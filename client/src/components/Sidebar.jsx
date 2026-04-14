import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Tag, Settings, LogOut, Sun } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/groups', icon: Tag, label: 'Groups' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sahara-950 text-sahara-50 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80" title="Return to Landing Page">
          <div className="w-9 h-9 rounded-lg bg-sienna-600 flex items-center justify-center">
            <Sun size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight text-white">Sahara CMS</h1>
            <p className="text-[11px] text-sahara-600 tracking-wider uppercase">Management Suite</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-sienna-600/15 text-sienna-400 border-l-2 border-sienna-400 -ml-px'
                  : 'text-sahara-600 hover:bg-white/5 hover:text-sahara-300'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-5 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-sienna-600 flex items-center justify-center text-white font-heading text-sm font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
            <p className="text-[11px] text-sahara-600 truncate capitalize">{user?.role || 'User'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md text-sahara-600 hover:text-rose-400 hover:bg-white/5 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
