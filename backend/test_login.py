import requests
import json

url = "http://localhost:8000/api/v1/auth/login"
data = {
    "username": "scitforte",
    "password": "Pass2026"
}

print("Testing login endpoint...")
print(f"Making POST request to: {url}")
print(f"Data: {data}")

try:
    response = requests.post(url, data=data)  # Using form data as required by the backend
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    try:
        print(f"Response JSON: {response.json()}")
    except:
        print(f"Response Text: {response.text}")
except Exception as e:
    print(f"Error: {e}")

print("\nNote: The login endpoint expects form data, not JSON data.")
print("Trying with form data format...")
try:
    # Using form data format as required by the backend
    form_data = {"username": "scitforte", "password": "Pass2026"}
    response = requests.post(url, data=form_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    try:
        print(f"Response JSON: {response.json()}")
    except:
        print(f"Response Text: {response.text}")
except Exception as e:
    print(f"Error: {e}")