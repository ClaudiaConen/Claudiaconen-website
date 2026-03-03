import { getToken } from './adminAuth';

export async function adminApiCall(action: string, method: string = 'GET', body?: any) {
  const adminToken = getToken();
  if (!adminToken) {
    throw new Error('Keine Authentifizierung gefunden. Bitte erneut einloggen.');
  }

  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-module-operations?action=${action}`;
  const options: RequestInit = {
    method,
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || result.details || 'Ein Fehler ist aufgetreten');
  }

  return result;
}
