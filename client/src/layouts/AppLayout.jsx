import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-sahara-50">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
