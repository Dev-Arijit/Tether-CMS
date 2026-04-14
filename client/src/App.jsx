import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ContactList from './pages/ContactList';
import ContactDetails from './pages/ContactDetails';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import Settings from './pages/Settings';
import Groups from './pages/Groups';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes with Sidebar Layout */}
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/contacts/:id" element={<ContactDetails />} />
              <Route path="/add-contact" element={<AddContact />} />
              <Route path="/edit-contact/:id" element={<EditContact />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
