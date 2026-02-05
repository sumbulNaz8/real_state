import requests

def test_backend():
    print("Testing backend connectivity...")

    # Test basic connectivity
    try:
        response = requests.get("http://localhost:8001/health")
        print(f"Health check - Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Health response: {response.json()}")
        else:
            print(f"Health response: {response.text}")
    except Exception as e:
        print(f"Health check failed: {e}")

    print("\nTesting login endpoint with different methods...")

    # Test OPTIONS method (to see allowed methods)
    try:
        response = requests.options("http://localhost:8001/api/v1/auth/login")
        print(f"OPTIONS request - Status: {response.status_code}")
        print(f"Allow header: {response.headers.get('Allow', 'Not provided')}")
        print(f"Access-Control-Allow-Methods: {response.headers.get('Access-Control-Allow-Methods', 'Not provided')}")
    except Exception as e:
        print(f"OPTIONS request failed: {e}")

    # Test GET method
    try:
        response = requests.get("http://localhost:8001/api/v1/auth/login")
        print(f"GET request - Status: {response.status_code}")
        print(f"GET response: {response.text[:200]}...")  # First 200 chars
    except Exception as e:
        print(f"GET request failed: {e}")

    # Test POST with form data (the expected format)
    try:
        response = requests.post("http://localhost:8001/api/v1/auth/login",
                               data={"username": "scitforte", "password": "Pass2026"})
        print(f"POST request - Status: {response.status_code}")
        print(f"POST response: {response.text}")
    except Exception as e:
        print(f"POST request failed: {e}")

if __name__ == "__main__":
    test_backend()