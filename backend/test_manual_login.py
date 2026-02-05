import requests
import json

def test_login_manually():
    """Test login manually with the exact same format the frontend would use"""
    print("Testing login with the exact same format as frontend...")

    # This mimics exactly what the frontend authService does
    url = "http://localhost:8000/api/v1/auth/login"

    # Create form data (this is what URLSearchParams does)
    import urllib.parse
    form_data = {
        'username': 'scitforte',
        'password': 'Pass2026'
    }

    # Convert to form encoded data
    form_encoded = urllib.parse.urlencode(form_data)

    print(f"URL: {url}")
    print(f"Form Data: {form_encoded}")

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    try:
        response = requests.post(url, data=form_encoded, headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")

        try:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        except:
            print(f"Response Text: {response.text}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login_manually()