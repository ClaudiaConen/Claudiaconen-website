import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { Loader2 } from 'lucide-react';

interface MemberProtectedRouteProps {
  children: React.ReactNode;
}

export default function MemberProtectedRoute({ children }: MemberProtectedRouteProps) {
  const { student, isLoading } = useStudentAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white/60">Lade Member-Bereich...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return <Navigate to="/member/login" replace />;
  }

  return <>{children}</>;
}
