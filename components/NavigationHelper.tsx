'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

interface NavigationHelperProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  showHomeButton?: boolean;
  children?: React.ReactNode;
}

export default function NavigationHelper({
  title = '',
  subtitle = '',
  showBackButton = false,
  backButtonHref = '/',
  showHomeButton = true,
  children
}: NavigationHelperProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          {title && <h1 className="text-3xl font-bold text-white">{title}</h1>}
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>

        <div className="flex gap-3">
          {showHomeButton && (
            <Link
              href="/authenticated"
              className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors"
              title="Go to Dashboard"
            >
              <Home className="w-5 h-5" />
            </Link>
          )}

          {showBackButton && (
            <Link
              href={backButtonHref}
              className="p-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          )}
        </div>
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}