'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400">Generate and view system reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Sales Summary</h3>
          <p className="text-gray-400">View sales performance and trends</p>
          <Link href="/reports/sales-summary" className="mt-4 inline-block px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Generate Report
          </Link>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Inventory Status</h3>
          <p className="text-gray-400">Check current inventory levels</p>
          <Link href="/reports/inventory-status" className="mt-4 inline-block px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Generate Report
          </Link>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Customer Ledger</h3>
          <p className="text-gray-400">View customer financial records</p>
          <Link href="/reports/customer-ledger" className="mt-4 inline-block px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Generate Report
          </Link>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Payment Collection</h3>
          <p className="text-gray-400">Track payment collections</p>
          <Link href="/reports/payment-collection" className="mt-4 inline-block px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Generate Report
          </Link>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4">Activity Log</h3>
          <p className="text-gray-400">View all system activities and actions</p>
          <Link href="/reports/activity-log" className="mt-4 inline-block px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            View Log
          </Link>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}