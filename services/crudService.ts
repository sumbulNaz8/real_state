import api from './api';
import { mockApiService } from './mockApiService';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: any;
}

export const crudService = {
  // Generic API call with fallback to mock service
  async call(url: string, options: ApiOptions = {}) {
    const { method = 'GET', data, params } = options;

    try {
      let response;

      switch (method) {
        case 'GET':
          response = await api.get(url, { params });
          break;
        case 'POST':
          response = await api.post(url, data);
          break;
        case 'PUT':
          response = await api.put(url, data);
          break;
        case 'DELETE':
          response = await api.delete(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data;
    } catch (error: any) {
      console.error(`API ${method} request failed for ${url}:`, error.message);

      // Check if this is a network error that warrants fallback to mock services
      const isNetworkError = error.isNetworkError ||
                            error.code === 'ECONNABORTED' ||
                            error.code === 'ERR_NETWORK' ||
                            error.message?.includes('Network Error') ||
                            (!error.response && error.message?.includes('fetch'));

      if (!isNetworkError) {
        // If it's not a network error (e.g., it's a 400, 401, 403, 404, 500, etc.), re-throw the error
        // This allows the calling component to handle specific API errors appropriately
        console.error(`Non-network error - propagating to UI for proper handling:`, error);
        throw error;
      }

      console.warn('Using mock service due to network error');
      // Fallback to mock service based on URL
      try {
        if (url.includes('/customers')) {
          if (method === 'POST') {
            // For creating customers
            return await mockApiService['createCustomer'](data);
          } else if (method === 'PUT') {
            // For updating customers (assuming URL has ID)
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['updateCustomer'](id, data);
          } else if (method === 'DELETE') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['deleteCustomer'](id);
          } else {
            // For GET requests - check if it's for a specific customer
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (!isNaN(parseInt(lastPart))) {
              // This is a request for a specific customer
              const id = parseInt(lastPart);
              return await mockApiService.getCustomer(id);
            } else {
              // This is a request for all customers
              return await mockApiService.getCustomers(params);
            }
          }
        } else if (url.includes('/projects')) {
          if (method === 'POST') {
            return await mockApiService.createProject(data);
          } else if (method === 'PUT') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService.updateProject(id, data);
          } else if (method === 'DELETE') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService.deleteProject(id);
          } else {
            // Check if this is a request for a specific project
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (!isNaN(parseInt(lastPart))) {
              // This is a request for a specific project
              const id = parseInt(lastPart);
              return await mockApiService.getProject(id);
            } else {
              // This is a request for all projects
              return await mockApiService.getProjects(params);
            }
          }
        } else if (url.includes('/bookings')) {
          if (method === 'POST') {
            return await mockApiService['createBooking'](data);
          } else if (method === 'PUT') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['updateBooking'](id, data);
          } else if (method === 'DELETE') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['deleteBooking'](id);
          } else {
            // Check if this is a request for a specific booking
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (!isNaN(parseInt(lastPart))) {
              // This is a request for a specific booking
              const id = parseInt(lastPart);
              return await mockApiService.getBooking(id);
            } else {
              // This is a request for all bookings
              return await mockApiService.getBookings(params);
            }
          }
        } else if (url.includes('/inventory')) {
          if (method === 'POST') {
            return await mockApiService['createInventory'](data);
          } else if (method === 'PUT') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['updateInventory'](id, data);
          } else if (method === 'DELETE') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['deleteInventory'](id);
          } else {
            // Check if this is a request for a specific inventory item
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (!isNaN(parseInt(lastPart))) {
              // This is a request for a specific inventory item
              const id = parseInt(lastPart);
              return await mockApiService.getInventoryItem(id);
            } else {
              // This is a request for all inventory items
              return await mockApiService.getInventory(params);
            }
          }
        } else if (url.includes('/payments')) {
          if (method === 'POST') {
            return await mockApiService['createPayment'](data);
          } else if (method === 'PUT') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['updatePayment'](id, data);
          } else if (method === 'DELETE') {
            const id = parseInt(url.split('/').pop() || '0');
            return await mockApiService['deletePayment'](id);
          } else {
            // Check if this is a request for a specific payment
            const parts = url.split('/');
            const lastPart = parts[parts.length - 1];
            if (!isNaN(parseInt(lastPart))) {
              // This is a request for a specific payment
              const id = parseInt(lastPart);
              return await mockApiService.getPayment(id);
            } else {
              // This is a request for all payments
              return await mockApiService.getPayments(params);
            }
          }
        }

        // Generic fallback
        if (method === 'GET') {
          return [];
        } else {
          return { success: true, message: 'Operation completed (mock)' };
        }
      } catch (mockError) {
        console.error('Mock service also failed:', mockError);
        throw new Error(`Operation failed - both API and mock services unavailable: ${error.message}`);
      }
    }
  },

  // Specific entity methods
  async getCustomers(params?: any) {
    return this.call('/customers', { method: 'GET', params });
  },

  async getCustomer(id: number) {
    return this.call(`/customers/${id}`, { method: 'GET' });
  },

  async createCustomer(data: any) {
    return this.call('/customers', { method: 'POST', data });
  },

  async updateCustomer(id: number, data: any) {
    return this.call(`/customers/${id}`, { method: 'PUT', data });
  },

  async deleteCustomer(id: number) {
    return this.call(`/customers/${id}`, { method: 'DELETE' });
  },

  async getProjects(params?: any) {
    return this.call('/projects', { method: 'GET', params });
  },

  async createProject(data: any) {
    return this.call('/projects', { method: 'POST', data });
  },

  async updateProject(id: number, data: any) {
    return this.call(`/projects/${id}`, { method: 'PUT', data });
  },

  async deleteProject(id: number) {
    return this.call(`/projects/${id}`, { method: 'DELETE' });
  },

  async getBookings(params?: any) {
    return this.call('/bookings', { method: 'GET', params });
  },

  async getBooking(id: number) {
    return this.call(`/bookings/${id}`, { method: 'GET' });
  },

  async createBooking(data: any) {
    return this.call('/bookings', { method: 'POST', data });
  },

  async updateBooking(id: number, data: any) {
    return this.call(`/bookings/${id}`, { method: 'PUT', data });
  },

  async deleteBooking(id: number) {
    return this.call(`/bookings/${id}`, { method: 'DELETE' });
  },

  async getInventory(params?: any) {
    return this.call('/inventory', { method: 'GET', params });
  },

  async getInventoryItem(id: number) {
    return this.call(`/inventory/${id}`, { method: 'GET' });
  },

  async createInventory(data: any) {
    return this.call('/inventory', { method: 'POST', data });
  },

  async updateInventory(id: number, data: any) {
    return this.call(`/inventory/${id}`, { method: 'PUT', data });
  },

  async deleteInventory(id: number) {
    return this.call(`/inventory/${id}`, { method: 'DELETE' });
  },

  async getPayments(params?: any) {
    return this.call('/payments', { method: 'GET', params });
  },

  async getPayment(id: number) {
    return this.call(`/payments/${id}`, { method: 'GET' });
  },

  async createPayment(data: any) {
    return this.call('/payments', { method: 'POST', data });
  },

  async updatePayment(id: number, data: any) {
    return this.call(`/payments/${id}`, { method: 'PUT', data });
  },

  async deletePayment(id: number) {
    return this.call(`/payments/${id}`, { method: 'DELETE' });
  }
};