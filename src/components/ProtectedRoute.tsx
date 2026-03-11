import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminAuth, getToken, getAdminUser, hasSection } from '../lib/adminAuth';
import type { AdminSection } from '../lib/adminAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredSection?: AdminSection;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export default function ProtectedRoute({ children, requiredSection }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const verifyAuth = () => {
      if (!checkAdminAuth()) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      const token = getToken();
      const adminUser = getAdminUser();

      if (!token || !adminUser) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      if (isTokenExpired(token)) {
        setIsAuthenticated(false);
        setIsChecking(false);
        return;
      }

      setIsAuthenticated(true);

      // Check section access
      if (requiredSection) {
        setHasAccess(hasSection(adminUser, requiredSection));
      }

      setIsChecking(false);
    };

    verifyAuth();
  }, [requiredSection]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-yellow-500 mb-4"></div>
          <p className="text-gray-600">Authentifizierung wird überprüft...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
