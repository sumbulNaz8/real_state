'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface GlobalAuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function GlobalAuthenticatedLayout({ children }: GlobalAuthenticatedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Define public routes that should not have the sidebar
  const publicRoutes = ['/login', '/register'];

  // Check if current route is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <div className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-16'} transition-all duration-300 ease-in-out overflow-hidden z-10`}>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className={`flex-1 p-0 transition-all duration-300 ease-in-out ml-0`}>
          {/* Mobile menu button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}