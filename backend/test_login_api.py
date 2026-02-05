import requests
import json

# Test the login endpoint with different credentials
def test_login():
    url = "http://localhost:8000/api/v1/auth/login"

    # Test with the default admin credentials from .env
    print("Testing login with username: scitforte, password: Pass2026")
    payload = {
        'username': 'scitforte',
        'password': 'Pass2026'
    }

    try:
        response = requests.post(url, data=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

    print("\n" + "="*50 + "\n")

    # Test with the default admin credentials from settings
    print("Testing login with username: admin, password: admin")
    payload = {
        'username': 'admin',
        'password': 'admin'
    }

    try:
        response = requests.post(url, data=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()