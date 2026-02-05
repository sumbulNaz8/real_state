import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable sending cookies and credentials with requests
  withCredentials: false, // Changed to false to avoid issues when backend is not available
  // Set timeout to allow sufficient time for API calls
  timeout: 15000, // Increased timeout to 15 seconds to handle longer operations
});

// Request interceptor to add token to requests and log requests
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Request config:', config);

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and log responses
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status}`);
    console.log('Response data:', response.data);
    return response;
  },
  async (error) => {
    console.error('API Response Error:', error);
    console.error('Error response:', error.response);

    // Only fallback to mock services for specific network errors
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error') || error.message?.includes('fetch')) {
      // Network error - API is probably down, use mock services
      console.warn('Network error - API connection failed, using mock services');
      return Promise.reject({...error, isNetworkError: true});
    } else if (error.response?.status === 401) {
      // Token might be expired, redirect to login
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } else {
      // For any other error (400, 404, 500, etc.), don't fallback to mock services
      // Let the error propagate so the UI can handle it properly
      console.error(`API request failed with status: ${error.response?.status}`, error.message);
      console.error('This error will be propagated to the UI for proper handling');
      return Promise.reject(error);
    }
  }
);

export default api;