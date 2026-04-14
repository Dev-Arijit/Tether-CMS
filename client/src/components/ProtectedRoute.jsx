import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sun } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sahara-50">
        <div className="flex flex-col items-center gap-4">
          <Sun className="w-10 h-10 text-sienna-600 animate-spin" style={{ animationDuration: '3s' }} />
          <p className="text-sahara-800 font-body text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
