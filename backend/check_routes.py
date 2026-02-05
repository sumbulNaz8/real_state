import asyncio
from main import app

def print_all_routes():
    print("📋 ALL REGISTERED ROUTES:")
    print("=" * 50)

    for route in app.routes:
        if hasattr(route, 'methods') and hasattr(route, 'path'):
            # Handle different route types
            if hasattr(route, 'name') and route.name:
                print(f"{', '.join(sorted(route.methods))} {route.path} -> {route.name}")
            else:
                print(f"{', '.join(sorted(route.methods))} {route.path}")
        elif hasattr(route, 'path') and hasattr(route, 'endpoint'):
            # For other route types
            print(f"FUNCTION {route.path} -> {route.endpoint.__name__ if hasattr(route.endpoint, '__name__') else str(route.endpoint)}")

    print("=" * 50)

    # Specifically look for login route
    login_found = False
    for route in app.routes:
        if hasattr(route, 'path') and '/login' in route.path.lower():
            if hasattr(route, 'methods'):
                print(f"🔍 FOUND LOGIN RELATED ROUTE: {', '.join(sorted(route.methods))} {route.path}")
                login_found = True

    if not login_found:
        print("❌ NO LOGIN ROUTE FOUND!")

    # Count total routes
    total_routes = len([r for r in app.routes if hasattr(r, 'path')])
    print(f"\n📊 TOTAL ROUTES REGISTERED: {total_routes}")

if __name__ == "__main__":
    print_all_routes()