import requests
import json

# Get the OpenAPI schema from the backend
url = "http://localhost:8000/openapi.json"

try:
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")

    if response.status_code == 200:
        schema = response.json()

        print("\n=== ALL REGISTERED ENDPOINTS ===")
        paths = schema.get('paths', {})
        for path, methods in paths.items():
            for method, details in methods.items():
                print(f"{method.upper()} {path}")
                if 'summary' in details:
                    print(f"  - {details['summary']}")
                print()

        print(f"\nTotal endpoints found: {len(paths)}")
    else:
        print(f"Failed to get OpenAPI schema. Status: {response.status_code}")

except Exception as e:
    print(f"Error fetching endpoints: {e}")
    print("\nAlternative: Check if the backend is running and accessible")