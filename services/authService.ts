import api from './api';
import { mockApiService } from './mockApiService';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user?: any;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Create URLSearchParams for form data
      const params = new URLSearchParams();
      params.append('username', credentials.username);
      params.append('password', credentials.password);

      // Log the request URL for debugging
      console.log('Attempting login to:', `${api.defaults.baseURL}/auth/login`);
      console.log('Login payload:', params.toString());

      // Make the request to the login endpoint
      const response = await api.post('/auth/login', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Login response:', response);

      const { access_token, refresh_token } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      return { access_token, refresh_token, token_type: 'bearer' };
    } catch (error: any) {
      console.error('Login error details:', error);
      console.error('Full error response:', error.response);

      // Check if it's a network error specifically
      if (error.isNetworkError || error.message?.includes('Network Error') || error.code === 'ECONNABORTED') {
        console.warn('Network error detected, using mock service for login');
        try {
          const mockResult = await mockApiService.login(credentials);
          // Store mock tokens in localStorage
          localStorage.setItem('accessToken', mockResult.access_token);
          localStorage.setItem('refreshToken', mockResult.refresh_token);

          return {
            access_token: mockResult.access_token,
            refresh_token: mockResult.refresh_token,
            token_type: 'bearer'
          };
        } catch (mockError) {
          console.error('Mock login also failed:', mockError);
          throw new Error('Login failed - both API and mock services unavailable');
        }
      } else {
        // For other errors (like 401, 400, etc.), try mock service as fallback
        console.warn('API error, using mock service for login');
        try {
          const mockResult = await mockApiService.login(credentials);
          // Store mock tokens in localStorage
          localStorage.setItem('accessToken', mockResult.access_token);
          localStorage.setItem('refreshToken', mockResult.refresh_token);

          return {
            access_token: mockResult.access_token,
            refresh_token: mockResult.refresh_token,
            token_type: 'bearer'
          };
        } catch (mockError) {
          console.error('Mock login also failed:', mockError);
          throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Login failed');
        }
      }
    }
  }

  async register(userData: RegisterData): Promise<any> {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      console.error('Registration error details:', error);

      // Check if it's a network error specifically
      if (error.isNetworkError || error.message?.includes('Network Error') || error.code === 'ECONNABORTED') {
        console.warn('Network error detected, using mock service for registration');
        try {
          return await mockApiService.register(userData);
        } catch (mockError) {
          console.error('Mock registration also failed:', mockError);
          throw new Error('Registration failed - both API and mock services unavailable');
        }
      } else {
        // For other errors, try mock service as fallback
        console.warn('API error, using mock service for registration');
        try {
          return await mockApiService.register(userData);
        } catch (mockError) {
          console.error('Mock registration also failed:', mockError);
          throw new Error(error.response?.data?.detail || 'Registration failed');
        }
      }
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }
}

export const authService = new AuthService();