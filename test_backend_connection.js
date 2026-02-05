// Test script to verify backend connectivity
async function testBackendConnection() {
    console.log('Testing backend connection...');

    try {
        // Test login
        const loginResponse = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'username=scitforte&password=Pass2026'
        });

        const loginData = await loginResponse.json();
        console.log('Login response:', loginData);

        if (loginData.success && loginData.data && loginData.data.access_token) {
            console.log('✅ Backend connection successful!');

            // Test creating a user with the token
            const token = loginData.data.access_token;
            const createUserResponse = await fetch('http://localhost:8000/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "username": "testuser123",
                    "email": "test@example.com",
                    "password": "testpass123",
                    "first_name": "Test",
                    "last_name": "User",
                    "phone": "+1234567890",
                    "role": "sales_agent"
                })
            });

            const userData = await createUserResponse.json();
            console.log('Create user response:', userData);

            if (userData.success) {
                console.log('✅ Save operation successful!');
                console.log('✅ All backend operations are working correctly!');
            } else {
                console.log('❌ Save operation failed:', userData);
            }
        } else {
            console.log('❌ Login failed:', loginData);
        }
    } catch (error) {
        console.log('❌ Connection error:', error);
    }
}

// Clear mock data and test
localStorage.removeItem('mock_projects');
localStorage.removeItem('mock_bookings');
localStorage.removeItem('mock_inventory');
localStorage.removeItem('mock_customers');
localStorage.removeItem('mock_payments');

testBackendConnection();