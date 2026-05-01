import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Video, MessageSquare, LogOut, CalendarCheck,
  Clock, ListChecks, Brain, Upload, FileText, Users, GraduationCap,
  BookOpen, Home, Star, Menu, X, ChevronDown, ChevronRight, Settings,
  CreditCard, Lightbulb, ClipboardList, Award, AlignLeft
} from 'lucide-react';
import { logoutAdmin } from '../lib/adminAuth';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  to: string;
  icon: any;
  label: string;
  description: string;
}

interface NavCategory {
  label: string;
  icon: any;
  items: NavItem[];
}

export default function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Dashboard']));
  const [hasStudentAccess, setHasStudentAccess] = useState(false);

  useEffect(() => {
    const studentData = localStorage.getItem('student');
    setHasStudentAccess(!!studentData);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const toggleCategory = (categoryLabel: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryLabel)) {
      newExpanded.delete(categoryLabel);
    } else {
      newExpanded.add(categoryLabel);
    }
    setExpandedCategories(newExpanded);
  };

  const navCategories: NavCategory[] = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      items: [
        {
          to: '/admin',
          icon: LayoutDashboard,
          label: 'Dashboard',
          description: 'Übersicht'
        }
      ]
    },
    {
      label: 'Kursverwaltung',
      icon: GraduationCap,
      items: [
        {
          to: '/admin/member-studenten',
          icon: GraduationCap,
          label: 'Studenten',
          description: 'Member-Studenten'
        },
        {
          to: '/admin/member-courses-list',
          icon: BookOpen,
          label: 'Kurse',
          description: 'Kursverwaltung'
        },
        {
          to: '/admin/member-kurse',
          icon: ListChecks,
          label: 'Module',
          description: 'Kurs-Module'
        },
        {
          to: '/admin/member-quizze',
          icon: Brain,
          label: 'Quizze',
          description: 'Quiz-Verwaltung'
        },
        {
          to: '/admin/member-flashcards',
          icon: CreditCard,
          label: 'Flashcards',
          description: 'Flashcard-Verwaltung'
        },
        {
          to: '/admin/member-takeaways',
          icon: Lightbulb,
          label: 'Takeaways',
          description: 'Takeaway-Verwaltung'
        },
        {
          to: '/admin/member-miniaufgaben',
          icon: ClipboardList,
          label: 'Miniaufgaben',
          description: 'Miniaufgaben-Verwaltung'
        },
        {
          to: '/admin/member-lückentexte',
          icon: AlignLeft,
          label: 'Lückentexte',
          description: 'Lückentext-Übungen'
        },
        {
          to: '/admin/willkommen',
          icon: Home,
          label: 'Willkommen',
          description: 'Willkommensbereich'
        }
      ]
    },
    {
      label: 'Terminverwaltung',
      icon: CalendarCheck,
      items: [
        {
          to: '/admin/buchungen',
          icon: CalendarCheck,
          label: 'Buchungen',
          description: 'Terminbuchungen'
        },
        {
          to: '/admin/termintypen',
          icon: ListChecks,
          label: 'Termintypen',
          description: 'Terminarten'
        },
        {
          to: '/admin/verfuegbarkeit',
          icon: Clock,
          label: 'Verfügbarkeit',
          description: 'Zeiten verwalten'
        },
        {
          to: '/admin/ki-manager-anmeldungen',
          icon: Brain,
          label: 'KI-Manager',
          description: 'Ausbildung Anmeldungen'
        },
        {
          to: '/admin/buchprojekt',
          icon: BookOpen,
          label: 'Buchprojekt',
          description: 'Hauptbuch-Anmeldungen'
        }
      ]
    },
    {
      label: 'Inhalte',
      icon: Video,
      items: [
        {
          to: '/admin/seiteninhalte',
          icon: FileText,
          label: 'Seiteninhalte',
          description: 'Texte & Headlines bearbeiten'
        },
        {
          to: '/admin/events',
          icon: Calendar,
          label: 'Events',
          description: 'Veranstaltungen verwalten'
        },
        {
          to: '/admin/mentoring',
          icon: Award,
          label: 'Mentoring',
          description: 'Mentoring-Pakete verwalten'
        },
        {
          to: '/admin/adventskalender',
          icon: Calendar,
          label: 'Adventskalender',
          description: 'Türchen verwalten'
        },
        {
          to: '/admin/schritte-media',
          icon: Video,
          label: 'Schritte Media',
          description: 'Timeline Medien'
        },
        {
          to: '/admin/testimonials',
          icon: MessageSquare,
          label: 'Testimonials',
          description: 'Kundenstimmen'
        }
      ]
    },
    {
      label: 'Verwaltung',
      icon: Settings,
      items: [
        {
          to: '/admin/benutzer',
          icon: Users,
          label: 'Benutzer',
          description: 'Admin-Verwaltung'
        },
        {
          to: '/admin/content-uploads',
          icon: Upload,
          label: 'Content Uploads',
          description: 'Hochgeladene Dateien'
        },
        {
          to: '/admin/content-plaene',
          icon: FileText,
          label: 'Contentpläne',
          description: 'Gespeicherte Pläne'
        },
        {
          to: '/admin/empfehlungen',
          icon: Star,
          label: 'Empfehlungen',
          description: 'Tools & Affiliate-Links'
        }
      ]
    }
  ];

  const isItemActive = (itemPath: string) => {
    return location.pathname === itemPath ||
           (itemPath !== '/admin' && location.pathname.startsWith(itemPath));
  };

  const isCategoryActive = (category: NavCategory) => {
    return category.items.some(item => isItemActive(item.to));
  };

  useEffect(() => {
    navCategories.forEach((category) => {
      if (isCategoryActive(category)) {
        setExpandedCategories((prev) => new Set([...prev, category.label]));
      }
    });
  }, [location.pathname]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            <Link
              to="/admin"
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              Admin Bereich
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={hasStudentAccess ? "/member/dashboard" : "/member/login"}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium hidden sm:block"
              title={hasStudentAccess ? "Als Student eingeloggt - zum Dashboard" : "Zum Member-Login"}
            >
              Member-Bereich →
            </Link>
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
              target="_blank"
            >
              Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Abmelden"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isSidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
        } w-72`}
      >
        <div className="flex flex-col h-full">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex items-center justify-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            title={isSidebarCollapsed ? 'Sidebar erweitern' : 'Sidebar einklappen'}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategories.has(category.label);
              const isActive = isCategoryActive(category);

              return (
                <div key={category.label} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all hover:bg-gray-50 ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                    title={category.label}
                  >
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="w-5 h-5 flex-shrink-0" />
                      {!isSidebarCollapsed && (
                        <span className="font-semibold text-sm">{category.label}</span>
                      )}
                    </div>
                    {!isSidebarCollapsed && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {isExpanded && !isSidebarCollapsed && (
                    <div className="mt-1 ml-4 space-y-1">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        const itemIsActive = isItemActive(item.to);

                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                              itemIsActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                            title={item.description}
                          >
                            <ItemIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {isExpanded && isSidebarCollapsed && (
                    <div className="mt-1 space-y-1">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        const itemIsActive = isItemActive(item.to);

                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all ${
                              itemIsActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                            title={item.description}
                          >
                            <ItemIcon className="w-5 h-5" />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
