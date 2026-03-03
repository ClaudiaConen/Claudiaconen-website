import { ReactNode } from 'react';
import AdminNavigation from './AdminNavigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="lg:pl-72 pt-16">
        {children}
      </div>
    </div>
  );
}
