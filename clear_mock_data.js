// Clear mock data to force API calls
localStorage.removeItem('mock_projects');
localStorage.removeItem('mock_bookings');
localStorage.removeItem('mock_inventory');
localStorage.removeItem('mock_customers');
localStorage.removeItem('mock_payments');

console.log('Mock data cleared. The frontend should now try to connect to the real API.');
console.log('Make sure your backend is running on http://localhost:8000/api/v1');