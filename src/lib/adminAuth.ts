const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  admin: AdminUser;
}

export interface VerifyResponse {
  valid: boolean;
  admin: AdminUser;
}

const TOKEN_KEY = 'admin_token';
const ADMIN_KEY = 'admin_user';

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null;
  const adminData = localStorage.getItem(ADMIN_KEY);
  if (!adminData) return null;
  try {
    return JSON.parse(adminData);
  } catch {
    return null;
  }
};

export const setAuthData = (token: string, admin: AdminUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};

export const loginAdmin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const data: LoginResponse = await response.json();
  setAuthData(data.token, data.admin);

  await attemptStudentAutoLogin(email);

  return data;
};

export const attemptStudentAutoLogin = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/student-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email,
        accessCode: 'ADMIN',
        skipValidation: true
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.student) {
        localStorage.setItem('student', JSON.stringify(data.student));
        localStorage.setItem('admin_preview_mode', 'true');
      }
    }
  } catch (error) {
    console.log('Student auto-login not available');
  }
};

export const verifyAdminToken = async (token?: string): Promise<VerifyResponse> => {
  const authToken = token || getToken();

  if (!authToken) {
    throw new Error('No token available');
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-admin-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ token: authToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    clearAuthData();
    throw new Error(error.error || 'Token verification failed');
  }

  const data: VerifyResponse = await response.json();
  return data;
};

export const isAdminAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;

  try {
    const result = await verifyAdminToken(token);
    return result.valid;
  } catch {
    clearAuthData();
    return false;
  }
};

export const checkAdminAuth = (): boolean => {
  return getToken() !== null;
};

export const logoutAdmin = (): void => {
  clearAuthData();
  localStorage.removeItem('student');
  localStorage.removeItem('admin_preview_mode');
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/request-password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Password reset request failed');
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Password reset failed');
  }
};
