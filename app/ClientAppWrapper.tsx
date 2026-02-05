'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define public routes that should not have the authenticated layout
const PUBLIC_ROUTES = ['/login', '/register'];

// Dynamically import the authenticated layout
const AuthenticatedLayout = dynamic(() => import('./authenticated/layout'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

interface ClientAppWrapperProps {
  children: ReactNode;
}

export default function ClientAppWrapper({ children }: ClientAppWrapperProps) {
  const pathname = usePathname();
  const [shouldRenderAuthenticated, setShouldRenderAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if current route is a public route
    const isPublicRoute = PUBLIC_ROUTES.some(publicRoute => pathname === publicRoute);
    setShouldRenderAuthenticated(!isPublicRoute);
  }, [pathname]);

  // If it's a public route, render children without authenticated layout
  if (!isClient) {
    // Server-side render: just return children, client will handle the rest
    return <>{children}</>;
  }

  if (!shouldRenderAuthenticated) {
    return <>{children}</>;
  }

  // For all other routes, use the authenticated layout
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}