import { useState, useEffect } from 'react';
import { Users, UserPlus, CheckCircle, XCircle, Mail, Calendar, LogIn, ArrowLeft, Pencil, Trash2, Shield, ShieldCheck, ShieldAlert, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getToken, getAdminUser, isSuperAdmin, ADMIN_SECTIONS } from '../lib/adminAuth';
import type { AdminRole, AdminSection } from '../lib/adminAuth';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface AdminUser {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
  role: AdminRole;
  allowed_sections: AdminSection[];
}

const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super-Admin',
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Betrachter',
};

const ROLE_ICONS: Record<AdminRole, typeof Shield> = {
  super_admin: ShieldAlert,
  admin: ShieldCheck,
  editor: Shield,
  viewer: Eye,
};

const ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: 'bg-purple-100 text-purple-800',
  admin: 'bg-blue-100 text-blue-800',
  editor: 'bg-yellow-100 text-yellow-800',
  viewer: 'bg-gray-100 text-gray-700',
};

const SECTION_LABELS: Record<AdminSection, string> = {
  dashboard: 'Dashboard',
  kursverwaltung: 'Kursverwaltung',
  terminverwaltung: 'Terminverwaltung',
  inhalte: 'Inhalte',
  projektmanagement: 'Projektmanagement',
  verwaltung: 'Verwaltung',
};

export default function AdminUserManagement() {
  const navigate = useNavigate();
  const currentUser = getAdminUser();
  const canManageRoles = isSuperAdmin(currentUser);

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: '', name: '', password: '', role: 'viewer' as AdminRole, allowed_sections: [] as AdminSection[] });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState<{ id: string; email: string; name: string; password: string; role: AdminRole; allowed_sections: AdminSection[] }>({ id: '', email: '', name: '', password: '', role: 'viewer', allowed_sections: [] });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = getToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/manage-admin-users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin users');
      }

      const data = await response.json();
      setAdminUsers(data.adminUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admin users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setIsCreating(true);

    try {
      const token = getToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const body: Record<string, unknown> = {
        email: newAdmin.email,
        name: newAdmin.name,
        password: newAdmin.password,
      };
      if (canManageRoles) {
        body.role = newAdmin.role;
        body.allowed_sections = newAdmin.allowed_sections;
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/manage-admin-users?action=create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create admin');
      }

      setSuccessMessage('Admin-Benutzer erfolgreich erstellt');
      setShowCreateModal(false);
      setNewAdmin({ email: '', name: '', password: '', role: 'viewer', allowed_sections: [] });
      await fetchAdminUsers();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create admin');
    } finally {
      setIsCreating(false);
    }
  };

  const toggleAdminStatus = async (adminId: string, currentStatus: boolean) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/manage-admin-users?action=toggle-active`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ id: adminId, is_active: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update admin status');
      }

      setSuccessMessage(`Admin-Benutzer ${!currentStatus ? 'aktiviert' : 'deaktiviert'}`);
      await fetchAdminUsers();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update admin status');
    }
  };

  const openEditModal = (admin: AdminUser) => {
    setEditAdmin({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      password: '',
      role: admin.role || 'viewer',
      allowed_sections: admin.allowed_sections || [],
    });
    setEditError('');
    setShowEditModal(true);
  };

  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');
    setIsUpdating(true);

    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');

      const body: Record<string, unknown> = { id: editAdmin.id };
      if (editAdmin.name) body.name = editAdmin.name;
      if (editAdmin.email) body.email = editAdmin.email;
      if (editAdmin.password) body.password = editAdmin.password;
      if (canManageRoles) {
        body.role = editAdmin.role;
        body.allowed_sections = editAdmin.allowed_sections;
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/manage-admin-users?action=update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Aktualisieren');
      }

      setSuccessMessage('Benutzer erfolgreich aktualisiert');
      setShowEditModal(false);
      await fetchAdminUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Fehler beim Aktualisieren');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAdmin = async (admin: AdminUser) => {
    setIsDeleting(true);
    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${SUPABASE_URL}/functions/v1/manage-admin-users?action=delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ id: admin.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Loeschen');
      }

      setSuccessMessage(`Benutzer "${admin.name}" wurde geloescht`);
      setDeleteConfirm(null);
      await fetchAdminUsers();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Loeschen');
      setDeleteConfirm(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleSection = (
    sections: AdminSection[],
    section: AdminSection,
    setter: (sections: AdminSection[]) => void
  ) => {
    if (sections.includes(section)) {
      setter(sections.filter(s => s !== section));
    } else {
      setter([...sections, section]);
    }
  };

  const toggleAllSections = (
    sections: AdminSection[],
    setter: (sections: AdminSection[]) => void
  ) => {
    if (sections.length === ADMIN_SECTIONS.length) {
      setter([]);
    } else {
      setter([...ADMIN_SECTIONS]);
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Noch nie';
    return new Date(dateString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const RoleBadge = ({ role }: { role: AdminRole }) => {
    const Icon = ROLE_ICONS[role] || Eye;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[role] || ROLE_COLORS.viewer}`}>
        <Icon size={14} />
        {ROLE_LABELS[role] || role}
      </span>
    );
  };

  const RoleAndSectionsFields = ({
    role,
    setRole,
    sections,
    setSections,
    disabled,
  }: {
    role: AdminRole;
    setRole: (r: AdminRole) => void;
    sections: AdminSection[];
    setSections: (s: AdminSection[]) => void;
    disabled: boolean;
  }) => (
    <>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Rolle
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as AdminRole)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black bg-white"
          disabled={disabled}
        >
          <option value="super_admin">Super-Admin (voller Zugriff)</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Betrachter</option>
        </select>
        {role === 'super_admin' && (
          <p className="text-xs text-purple-600 mt-1 font-medium">
            Super-Admins haben immer Zugriff auf alle Bereiche
          </p>
        )}
      </div>

      {role !== 'super_admin' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-900">
              Bereiche
            </label>
            <button
              type="button"
              onClick={() => toggleAllSections(sections, setSections)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              disabled={disabled}
            >
              {sections.length === ADMIN_SECTIONS.length ? 'Alle abwaehlen' : 'Alle auswaehlen'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ADMIN_SECTIONS.map((section) => (
              <label
                key={section}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                  sections.includes(section)
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={sections.includes(section)}
                  onChange={() => toggleSection(sections, section, setSections)}
                  className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                  disabled={disabled}
                />
                <span className="text-sm text-gray-700">{SECTION_LABELS[section]}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-72 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Zurueck zum Dashboard</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Users className="text-yellow-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">Admin-Benutzerverwaltung</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            <UserPlus size={20} />
            Neuer Admin
          </button>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 text-green-600 flex items-center gap-2">
            <CheckCircle size={20} />
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-600">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-yellow-500"></div>
            <p className="mt-4 text-gray-600">Lade Admin-Benutzer...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      E-Mail
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Rolle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Bereiche
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Letzter Login
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {adminUsers.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={16} />
                          {admin.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RoleBadge role={admin.role || 'viewer'} />
                      </td>
                      <td className="px-6 py-4">
                        {admin.role === 'super_admin' ? (
                          <span className="text-xs text-purple-600 font-medium">Alle Bereiche</span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {(admin.allowed_sections || []).length === 0 ? (
                              <span className="text-xs text-gray-400">Keine</span>
                            ) : (
                              (admin.allowed_sections || []).map(section => (
                                <span key={section} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                  {SECTION_LABELS[section] || section}
                                </span>
                              ))
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LogIn size={16} />
                          {formatDate(admin.last_login_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {admin.is_active ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle size={14} />
                            Aktiv
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircle size={14} />
                            Deaktiviert
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(admin)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                          >
                            <Pencil size={14} />
                            Bearbeiten
                          </button>
                          <button
                            onClick={() => toggleAdminStatus(admin.id, admin.is_active)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              admin.is_active
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {admin.is_active ? 'Deaktivieren' : 'Aktivieren'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(admin)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={14} />
                            Loeschen
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benutzer bearbeiten</h2>

            <form onSubmit={handleEditAdmin} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editAdmin.name}
                  onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  required
                  disabled={isUpdating}
                />
              </div>

              <div>
                <label htmlFor="edit-email" className="block text-sm font-semibold text-gray-900 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="edit-email"
                  value={editAdmin.email}
                  onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  required
                  disabled={isUpdating}
                />
              </div>

              <div>
                <label htmlFor="edit-password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Neues Passwort (optional)
                </label>
                <input
                  type="password"
                  id="edit-password"
                  value={editAdmin.password}
                  onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  placeholder="Leer lassen = Passwort bleibt"
                  disabled={isUpdating}
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nur ausfuellen, wenn das Passwort geaendert werden soll (min. 8 Zeichen)
                </p>
              </div>

              {canManageRoles && (
                <RoleAndSectionsFields
                  role={editAdmin.role}
                  setRole={(r) => setEditAdmin({ ...editAdmin, role: r })}
                  sections={editAdmin.allowed_sections}
                  setSections={(s) => setEditAdmin({ ...editAdmin, allowed_sections: s })}
                  disabled={isUpdating}
                />
              )}

              {!canManageRoles && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Nur Super-Admins koennen Rollen und Berechtigungen aendern.
                  </p>
                </div>
              )}

              {editError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {editError}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditError('');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isUpdating}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Speichern...' : 'Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benutzer loeschen?</h2>
            <p className="text-gray-600 mb-2">
              Moechtest du den Benutzer <span className="font-bold">{deleteConfirm.name}</span> ({deleteConfirm.email}) wirklich loeschen?
            </p>
            <p className="text-red-600 text-sm mb-6">
              Diese Aktion kann nicht rueckgaengig gemacht werden.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDeleteAdmin(deleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Loeschen...' : 'Endgueltig loeschen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Neuen Admin erstellen</h2>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  placeholder="Max Mustermann"
                  required
                  disabled={isCreating}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  id="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  placeholder="E-Mail-Adresse eingeben"
                  required
                  disabled={isCreating}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors text-black placeholder:text-gray-400"
                  placeholder="Mindestens 8 Zeichen"
                  required
                  disabled={isCreating}
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Das Passwort muss mindestens 8 Zeichen lang sein
                </p>
              </div>

              {canManageRoles && (
                <RoleAndSectionsFields
                  role={newAdmin.role}
                  setRole={(r) => setNewAdmin({ ...newAdmin, role: r })}
                  sections={newAdmin.allowed_sections}
                  setSections={(s) => setNewAdmin({ ...newAdmin, allowed_sections: s })}
                  disabled={isCreating}
                />
              )}

              {createError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  {createError}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewAdmin({ email: '', name: '', password: '', role: 'viewer', allowed_sections: [] });
                    setCreateError('');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isCreating}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={isCreating}
                >
                  {isCreating ? 'Erstellen...' : 'Erstellen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
