export const API_CONFIG = {
  mode: (import.meta.env.VITE_APP_MODE || 'mock') as 'mock' | 'api',
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
};

export const isMockMode = (): boolean => API_CONFIG.mode === 'mock';
