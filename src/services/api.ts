import axios from 'axios';

/**
 * Base API Client configured for future Backend Integration
 * Endpoints will target e.g. https://api.mindmate.edu/v1
 */
export const apiClient = axios.create({
  baseURL: 'https://api.mindmate.mock/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor placeholder for Future Auth Tokens
apiClient.interceptors.request.use(
  (config) => {
    // const token = await AsyncStorage.getItem('auth_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
