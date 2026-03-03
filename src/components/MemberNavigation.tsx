import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import {
  GraduationCap,
  Home,
  BookOpen,
  MessageSquare,
  Video,
  Award,
  User,
  LogOut,
  Menu,
  X,
  Flame,
  Zap,
} from 'lucide-react';

export default function MemberNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logout } = useStudentAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/member/login');
  };

  const navItems = [
    { path: '/member/dashboard', label: 'Dashboard', icon: Home },
    { path: '/member/courses', label: 'Kurse', icon: BookOpen },
    { path: '/member/certificate', label: 'Zertifikat', icon: Award },
    { path: '/member/forum', label: 'Forum', icon: MessageSquare },
    { path: '/member/sessions', label: 'Live Sessions', icon: Video },
    { path: '/member/profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/member/dashboard"
            className="flex items-center space-x-2 font-bold text-slate-900 hover:text-blue-600 transition"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:block">KI-Manager</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-600">{student?.currentStreak}</span>
                <span className="text-xs text-orange-600">Tage</span>
              </div>

              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-600">Level {student?.level}</span>
              </div>

              <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">
                    {student?.firstName} {student?.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{student?.totalXp} XP</p>
                </div>
                {student?.avatarUrl ? (
                  <img
                    src={student.avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {student?.firstName[0]}
                    {student?.lastName[0]}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex items-center justify-between px-4 mb-4">
                <div className="flex items-center space-x-2">
                  {student?.avatarUrl ? (
                    <img
                      src={student.avatarUrl}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {student?.firstName[0]}
                      {student?.lastName[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">
                      {student?.firstName} {student?.lastName}
                    </p>
                    <p className="text-sm text-slate-500">Level {student?.level} · {student?.totalXp} XP</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
