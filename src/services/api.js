import axios from 'axios';

const browserHostname = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
const browserOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:3000';
const isDevelopment = process.env.NODE_ENV === 'development';
const isLoopbackHost = (hostname) => ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname.toLowerCase());
const defaultApiHostname = isLoopbackHost(browserHostname) ? '127.0.0.1' : browserHostname;
let configuredApiUrl = process.env.REACT_APP_API_URL;

if (isDevelopment) {
  try {
    const configuredUrl = configuredApiUrl ? new URL(configuredApiUrl) : null;
    if (!configuredUrl || isLoopbackHost(configuredUrl.hostname)) {
      configuredApiUrl = `${browserOrigin}${configuredUrl?.pathname || '/api'}`;
    }
  } catch {
    // Keep relative API URLs as configured.
  }
} else if (configuredApiUrl && !isLoopbackHost(browserHostname)) {
  try {
    const configuredUrl = new URL(configuredApiUrl);
    if (isLoopbackHost(configuredUrl.hostname)) {
      configuredUrl.hostname = browserHostname;
      configuredApiUrl = configuredUrl.toString();
    }
  } catch {
    // Leave relative or custom API URLs as configured.
  }
}

configuredApiUrl = configuredApiUrl || `http://${defaultApiHostname}:8000/api`;

const api = axios.create({
  baseURL: configuredApiUrl.replace(/\/+$/, ''),
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const isLoginRequest = /\/(?:auth\/)?login\/?$/i.test(config.url || '');
  const token = window.sessionStorage.getItem('acma-auth-token');
  const tokenType = window.sessionStorage.getItem('acma-auth-token-type') || 'Bearer';

  if (token && !isLoginRequest) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  return config;
});

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (payload == null) return [];
  throw new Error('A API devolveu um formato de lista inesperado.');
};

const getCollection = async (path, params) => {
  let response = await api.get(path, { params });
  const payload = response.data;
  if (!Array.isArray(payload?.results)) return normalizeCollection(payload);

  const records = [...payload.results];
  const visitedPages = new Set();
  const apiOrigin = new URL(api.defaults.baseURL).origin;
  let nextPage = payload.next;
  const initialUrl = response.config.url;
  let currentUrl = /^https?:\/\//i.test(initialUrl)
    ? new URL(initialUrl)
    : new URL(String(initialUrl).replace(/^\/+/, ''), `${api.defaults.baseURL}/`);

  while (nextPage) {
    const nextUrl = new URL(nextPage, currentUrl);
    if (nextUrl.origin !== apiOrigin || visitedPages.has(nextUrl.href)) break;
    visitedPages.add(nextUrl.href);
    response = await api.get(nextUrl.href);
    if (!Array.isArray(response.data?.results)) break;
    records.push(...response.data.results);
    nextPage = response.data.next;
    currentUrl = nextUrl;
  }

  return records;
};

export const login = async (credentials) => {
  const { data } = await api.post('/login/', credentials);
  return data;
};

export const resolveLoginRole = (payload) => {
  const data = payload?.data ?? payload ?? {};
  const user = data.user ?? data.usuario ?? data.profile ?? data.perfil ?? {};
  const roleValue =
    data.role ?? data.tipo ?? data.user_type ?? data.userType ?? data.tipo_usuario ?? data.account_type ??
    user.role ?? user.tipo ?? user.user_type ?? user.userType ?? user.tipo_usuario ?? user.perfil ?? user.account_type;

  if (roleValue) {
    const role = String(roleValue)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (['admin', 'administrador', 'administrator', 'staff', 'superuser'].includes(role)) return 'admin';
    if (['utente', 'user', 'cliente'].includes(role)) return 'utente';
  }

  if (
    data.administrador || data.administradora || data.is_admin || data.is_staff || data.is_superuser ||
    user.administrador || user.administradora || user.is_admin || user.is_staff || user.is_superuser
  ) {
    return 'admin';
  }
  if (data.utente || data.cliente || data.is_utente || user.utente || user.cliente || user.is_utente) return 'utente';
  return null;
};

export const saveAuthSession = (payload, role, loginUsername) => {
  const data = payload?.data ?? payload ?? {};
  const user = data.user ?? data.usuario ?? data.profile ?? data.perfil ?? data.utente ?? data.administrador ?? {};
  const accessToken = data.access ?? data.access_token ?? data.tokens?.access ?? user.access ?? user.access_token;
  const genericToken = data.token ?? data.key ?? data.auth_token ?? user.token ?? user.key ?? user.auth_token;
  const token = accessToken ?? genericToken;

  clearAuthSession();
  window.sessionStorage.setItem('acma-user-role', role);

  const profile = {
    id: user.id ?? user.pk ?? data.user_id ?? data.id,
    username: user.username ?? data.username ?? loginUsername,
    email: user.email ?? data.email,
    nome: user.nome ?? user.first_name ?? data.nome ?? data.first_name,
    apelido: user.apelido ?? user.last_name ?? data.apelido ?? data.last_name,
  };
  if (Object.values(profile).some(Boolean)) {
    window.sessionStorage.setItem('acma-user-profile', JSON.stringify(profile));
  }

  if (token) {
    const tokenType = data.token_type ?? data.tokenType ?? (accessToken ? 'Bearer' : 'Token');
    window.sessionStorage.setItem('acma-auth-token', token);
    window.sessionStorage.setItem('acma-auth-token-type', tokenType);
  }

  const refreshToken = data.refresh ?? data.refresh_token ?? user.refresh ?? user.refresh_token;
  if (refreshToken) window.sessionStorage.setItem('acma-auth-refresh', refreshToken);
};

export const clearAuthSession = () => {
  window.sessionStorage.removeItem('acma-user-role');
  window.sessionStorage.removeItem('acma-demo-role');
  window.sessionStorage.removeItem('acma-user-profile');
  window.sessionStorage.removeItem('acma-auth-token');
  window.sessionStorage.removeItem('acma-auth-token-type');
  window.sessionStorage.removeItem('acma-auth-refresh');
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem('acma-user-profile') || '{}');
  } catch {
    return {};
  }
};

export const getUtentes = (params) => getCollection('/utentes/', params);
export const createUtente = (utente) => api.post('/utentes/', utente);
export const updateUtente = (id, utente) => api.patch(`/utentes/${encodeURIComponent(id)}/`, utente);
export const deleteUtente = (id) => api.delete(`/utentes/${encodeURIComponent(id)}/`);
export const associateCertificateToUtente = (utenteId, certificadoId) =>
  api.post('/utente-certificados/', { utente_id: utenteId, certificado_id: certificadoId });
export const getAdministradores = (params) => getCollection('/administradores/', params);
export const getCertificados = (params) => getCollection('/certificados/', params);
const prepareCertificatePayload = (certificado) => {
  const file = certificado?.arquivos;
  if (!file || typeof file === 'string' || (typeof FormData !== 'undefined' && file instanceof FormData)) return certificado;

  const formData = new FormData();
  Object.entries(certificado).forEach(([key, value]) => {
    if (value != null && value !== '') formData.append(key, value);
  });
  return formData;
};

const certificateRequestConfig = (payload) => (
  typeof FormData !== 'undefined' && payload instanceof FormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : undefined
);

export const createCertificado = (certificado) => {
  const payload = prepareCertificatePayload(certificado);
  return api.post('/certificados/', payload, certificateRequestConfig(payload));
};
export const updateCertificado = (id, certificado) => {
  const payload = prepareCertificatePayload(certificado);
  return api.patch(`/certificados/${encodeURIComponent(id)}/`, payload, certificateRequestConfig(payload));
};
export const deleteCertificado = (id) => api.delete(`/certificados/${encodeURIComponent(id)}/`);
export const getUtenteCertificados = (params) => getCollection('/utente-certificados/', params);

export const getBackendFileUrl = (filePath) => {
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) {
    const fileUrl = new URL(filePath);
    if (isDevelopment && isLoopbackHost(fileUrl.hostname)) {
      return `${browserOrigin}${fileUrl.pathname}${fileUrl.search}${fileUrl.hash}`;
    }
    return filePath;
  }

  const apiOrigin = new URL(api.defaults.baseURL, window.location.origin).origin;
  return new URL(filePath, `${apiOrigin}/`).toString();
};

export const downloadBackendFile = async (filePath, fileName) => {
  const fileUrl = getBackendFileUrl(filePath);
  const { data } = await api.get(fileUrl, { responseType: 'blob' });
  const urlFileName = new URL(fileUrl).pathname.split('/').filter(Boolean).pop();
  let downloadName = fileName || urlFileName || 'certificado';
  try {
    downloadName = decodeURIComponent(downloadName);
  } catch {
    // Keep the original filename if it contains invalid URI encoding.
  }

  const blobUrl = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
};

export default api;
