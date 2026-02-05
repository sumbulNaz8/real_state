import requests
import json

def test_login_endpoint():
    print("🔍 Testing Login Endpoint...")

    # Test the login endpoint
    url = "http://localhost:8000/api/v1/auth/login"
    print(f"🎯 Request URL: {url}")

    # Test data for the master admin
    login_data = {
        "username": "scitforte",
        "password": "Pass2026"
    }
    print(f"🔑 Login data: {login_data}")

    try:
        print("\n📡 Sending POST request with form data...")
        response = requests.post(url, data=login_data)

        print(f"📊 Status Code: {response.status_code}")
        print(f"🏷️  Response Headers: {dict(response.headers)}")

        try:
            response_json = response.json()
            print(f"📥 Response JSON: {json.dumps(response_json, indent=2)}")

            if response.status_code == 200 and response_json.get('success'):
                print("✅ Login successful!")
                print(f"🗝️  Access Token: {response_json.get('data', {}).get('access_token', '')[:20]}...")
            elif response.status_code == 401:
                print("❌ Login failed - Invalid credentials")
            elif response.status_code == 404:
                print("❌ Login endpoint not found - Check if backend is running and routes are registered")
            else:
                print(f"⚠️  Unexpected response: {response_json}")

        except ValueError:
            print(f"📄 Response Text: {response.text}")

    except requests.exceptions.ConnectionError:
        print("❌ Connection Error - Is the backend server running on http://localhost:8000?")
    except Exception as e:
        print(f"💥 Error occurred: {e}")

def test_server_health():
    print("\n🏥 Testing Server Health...")
    try:
        health_response = requests.get("http://localhost:8000/health")
        print(f"Health Check Status: {health_response.status_code}")
        print(f"Health Check Response: {health_response.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")

def test_available_routes():
    print("\n🗺️  Testing Available Routes...")
    try:
        routes_response = requests.get("http://localhost:8000/debug/routes")
        if routes_response.status_code == 200:
            routes = routes_response.json()
            print("Available routes:")
            for route in routes.get('routes', []):
                print(f"  {route['methods']} {route['path']}")
        else:
            print(f"Routes debug endpoint not available: {routes_response.status_code}")
    except Exception as e:
        print(f"Routes check failed: {e}")

def test_swagger_docs():
    print("\n📖 Testing Swagger Documentation...")
    try:
        docs_response = requests.get("http://localhost:8000/docs")
        print(f"Docs Status: {docs_response.status_code}")
        if docs_response.status_code == 200:
            print("✅ Swagger docs are accessible")
        else:
            print("❌ Swagger docs not accessible")
    except Exception as e:
        print(f"Docs check failed: {e}")

if __name__ == "__main__":
    print("🚀 Starting Authentication System Test Suite\n")

    # Run all tests
    test_server_health()
    test_swagger_docs()
    test_available_routes()
    test_login_endpoint()

    print("\n📋 Test Suite Complete!")
    print("\n💡 Troubleshooting Tips:")
    print("   1. Make sure backend is running: `python main.py` or `uvicorn main:app --reload`")
    print("   2. Verify the login endpoint is registered in the route list")
    print("   3. Check that the master admin user exists in the database")
    print("   4. Confirm CORS settings allow requests from your frontend origin")