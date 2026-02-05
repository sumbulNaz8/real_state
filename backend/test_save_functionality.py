import requests
import json

def test_create_user():
    # First, login to get a token
    login_url = "http://localhost:8000/api/v1/auth/login"
    login_payload = {
        'username': 'scitforte',
        'password': 'Pass2026'
    }

    print("Logging in to get token...")
    try:
        login_response = requests.post(login_url, data=login_payload)
        if login_response.status_code == 200:
            token_data = login_response.json()
            access_token = token_data['data']['access_token']
            print("Login successful, got access token")
        else:
            print(f"Login failed: {login_response.status_code}")
            print(f"Response: {login_response.json()}")
            return
    except Exception as e:
        print(f"Login error: {e}")
        return

    # Now test creating a user with the token
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    create_url = "http://localhost:8000/api/v1/users/"
    user_data = {
        "username": "testuser123",
        "email": "test@example.com",
        "password": "testpass123",
        "first_name": "Test",
        "last_name": "User",
        "phone": "+1234567890",
        "role": "sales_agent"
    }

    print("Creating a new user...")
    try:
        create_response = requests.post(create_url, json=user_data, headers=headers)
        print(f"Create user status: {create_response.status_code}")
        print(f"Response: {json.dumps(create_response.json(), indent=2)}")

        if create_response.status_code == 200:
            print("User created successfully!")
        else:
            print("User creation failed!")

    except Exception as e:
        print(f"Create user error: {e}")

if __name__ == "__main__":
    test_create_user()