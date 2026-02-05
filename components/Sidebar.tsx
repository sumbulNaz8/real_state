'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  Home,
  FileText,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type SidebarProps = {
  sidebarOpen?: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ sidebarOpen = true, toggleSidebar }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Projects', icon: Building, href: '/projects' },
    { name: 'Inventory', icon: Home, href: '/inventory' },
    { name: 'Bookings', icon: FileText, href: '/bookings' },
    { name: 'Payments', icon: DollarSign, href: '/payments' },
    { name: 'Customers', icon: Users, href: '/customers' },
    { name: 'Reports', icon: TrendingUp, href: '/reports' },
    { name: 'Calendar', icon: Calendar, href: '/calendar' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-dark-bg h-screen p-4 border-r border-gray-800 fixed left-0 top-0 bottom-0 overflow-y-auto transition-all duration-300 ease-in-out`}>
      {sidebarOpen && (
        <div className="mb-8">
          <div className="flex items-center gap-3 p-3 bg-gradient-sidebar rounded-xl">
            <Building className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-white font-bold">Kings Builder</h2>
              <p className="text-white/70 text-xs">Property Management System</p>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl text-gray-400 transition ${
                  isActive
                    ? 'bg-gradient-sidebar text-white'
                    : 'hover:bg-dark-card hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Toggle Button */}
      <div className={`absolute ${sidebarOpen ? 'left-auto right-[-12px]' : 'left-auto right-[-12px]'} top-1/2 transform -translate-y-1/2 z-10`}>
        <button
          onClick={toggleSidebar}
          className="bg-dark-card p-2 rounded-r-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="absolute bottom-4 w-56 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 bg-dark-card rounded-xl text-red-400 hover:bg-red-900/20 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;