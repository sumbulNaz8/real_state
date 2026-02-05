'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Menu, X } from 'lucide-react';

interface WithSidebarLayoutProps {
  children: React.ReactNode;
}

export default function WithSidebarLayout({ children }: WithSidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <div className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-16'} transition-all duration-300 ease-in-out overflow-hidden z-10 flex-shrink-0`}>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-0' : 'ml-0'} min-h-screen`}>
          {/* Mobile menu button */}
          <div className="md:hidden p-4 border-b">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}