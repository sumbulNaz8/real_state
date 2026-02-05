import { useState, useEffect } from 'react';
import api from '@/services/api';
import { mockApiService } from '@/services/mockApiService';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useApi = <T,>(url: string, options?: RequestInit): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Attempt to fetch from real API first
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (realApiError) {
        console.warn(`Real API failed for ${url}, using mock data:`, (realApiError as Error).message);

        // Fallback to mock service based on URL
        let mockData: any = null;

        if (url.includes('/projects')) {
          if (url === '/projects') {
            mockData = await mockApiService.getProjects();
          } else {
            // Extract project ID from URL like /projects/1
            const id = parseInt(url.split('/').pop() || '0');
            if (id) {
              mockData = await mockApiService.getProject(id);
            }
          }
        } else if (url.includes('/bookings')) {
          mockData = await mockApiService.getBookings();
        } else if (url.includes('/inventory')) {
          mockData = await mockApiService.getInventory();
        } else if (url.includes('/customers')) {
          mockData = await mockApiService.getCustomers();
        } else if (url.includes('/payments')) {
          mockData = await mockApiService.getPayments();
        } else {
          // Generic fallback - return empty array
          mockData = [];
        }

        setData(mockData as T);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;