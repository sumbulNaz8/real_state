// Script to clear all mock data and force API connection
function clearAllMockData() {
    // Clear all mock data that might be cached
    localStorage.removeItem('mock_projects');
    localStorage.removeItem('mock_bookings');
    localStorage.removeItem('mock_inventory');
    localStorage.removeItem('mock_customers');
    localStorage.removeItem('mock_payments');

    // Also clear any cached API responses
    localStorage.removeItem('last_api_status');

    console.log('Mock data cleared. The application will now try to connect to the real API.');
    console.log('Make sure your backend is running on http://localhost:8000/api/v1');

    // Optionally reload the page to ensure fresh state
    // Uncomment the next line if you want to automatically reload
    // window.location.reload();
}

// Run the function
clearAllMockData();

// Export for use in console if needed
window.clearAllMockData = clearAllMockData;