import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setAuthed(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthed(false);
  };

  return authed
    ? <AdminDashboard onLogout={handleLogout} />
    : <AdminLogin onLogin={() => setAuthed(true)} />;
}
