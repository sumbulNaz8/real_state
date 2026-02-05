/**
 * Kings Builder - Frontend Authentication Handler
 * This script handles authentication and API calls for the Kings Builder frontend
 */

class KingsBuilderAPI {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.baseURL = 'http://localhost:8000';

        // Load tokens from localStorage if they exist
        this.loadTokens();
    }

    /**
     * Save tokens to localStorage
     */
    saveTokens(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        localStorage.setItem('kings_builder_access_token', accessToken);
        localStorage.setItem('kings_builder_refresh_token', refreshToken);
    }

    /**
     * Load tokens from localStorage
     */
    loadTokens() {
        this.accessToken = localStorage.getItem('kings_builder_access_token');
        this.refreshToken = localStorage.getItem('kings_builder_refresh_token');
    }

    /**
     * Clear tokens
     */
    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;

        localStorage.removeItem('kings_builder_access_token');
        localStorage.removeItem('kings_builder_refresh_token');
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!this.accessToken;
    }

    /**
     * Login function
     */
    async login(username, password) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${this.baseURL}/api/v1/auth/login`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Save tokens
                this.saveTokens(data.data.access_token, data.data.refresh_token);

                // Return user data
                return {
                    success: true,
                    user: data.data.user,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    error: data.error,
                    message: data.message
                };
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Network error occurred'
            };
        }
    }

    /**
     * Logout function
     */
    async logout() {
        this.clearTokens();
        // Optionally notify backend to invalidate tokens
    }

    /**
     * Make authenticated API request
     */
    async makeAuthenticatedRequest(endpoint, options = {}) {
        if (!this.isAuthenticated()) {
            throw new Error('Not authenticated. Please login first.');
        }

        const authOptions = {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                ...options.headers
            }
        };

        let response = await fetch(`${this.baseURL}${endpoint}`, authOptions);

        // If we get a 401, try to refresh the token
        if (response.status === 401) {
            const refreshSuccess = await this.refreshAccessToken();
            if (refreshSuccess) {
                // Retry the original request with new token
                authOptions.headers['Authorization'] = `Bearer ${this.accessToken}`;
                response = await fetch(`${this.baseURL}${endpoint}`, authOptions);
            } else {
                // If refresh failed, logout user
                this.logout();
                throw new Error('Session expired. Please login again.');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status} error`);
        }

        return await response.json();
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken() {
        if (!this.refreshToken) {
            return false;
        }

        try {
            const response = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.refreshToken}`
                },
                body: JSON.stringify({
                    // This would typically be the refresh token data
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.accessToken = data.data.access_token;
                    localStorage.setItem('kings_builder_access_token', data.data.access_token);
                    return true;
                }
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
        }

        return false;
    }

    // API methods for different entities

    // Projects
    async getProjects() {
        return await this.makeAuthenticatedRequest('/api/v1/projects/');
    }

    async createProject(projectData) {
        return await this.makeAuthenticatedRequest('/api/v1/projects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });
    }

    async updateProject(projectId, projectData) {
        return await this.makeAuthenticatedRequest(`/api/v1/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData)
        });
    }

    async deleteProject(projectId) {
        return await this.makeAuthenticatedRequest(`/api/v1/projects/${projectId}`, {
            method: 'DELETE'
        });
    }

    // Users
    async getUsers() {
        return await this.makeAuthenticatedRequest('/api/v1/users/');
    }

    async getUser(userId) {
        return await this.makeAuthenticatedRequest(`/api/v1/users/${userId}`);
    }

    // Builders
    async getBuilders() {
        return await this.makeAuthenticatedRequest('/api/v1/builders/');
    }

    async createBuilder(builderData) {
        return await this.makeAuthenticatedRequest('/api/v1/builders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(builderData)
        });
    }

    // Inventory
    async getInventory() {
        return await this.makeAuthenticatedRequest('/api/v1/inventory/');
    }

    // Investors
    async getInvestors() {
        return await this.makeAuthenticatedRequest('/api/v1/investors/');
    }

    // Bookings
    async getBookings() {
        return await this.makeAuthenticatedRequest('/api/v1/bookings/');
    }

    // Customers
    async getCustomers() {
        return await this.makeAuthenticatedRequest('/api/v1/customers/');
    }

    // Payments
    async getPayments() {
        return await this.makeAuthenticatedRequest('/api/v1/payments/');
    }

    // Installments
    async getInstallments() {
        return await this.makeAuthenticatedRequest('/api/v1/installments/');
    }

    // Transfers
    async getTransfers() {
        return await this.makeAuthenticatedRequest('/api/v1/transfers/');
    }
}

// Export the class for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KingsBuilderAPI;
} else {
    window.KingsBuilderAPI = KingsBuilderAPI;
}