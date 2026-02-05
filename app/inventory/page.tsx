'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function InventoryPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Inventory</h1>
          <p className="text-gray-400">Manage your property inventory</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg ml-4 mr-4 md:ml-0 md:mr-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Property Units</h2>
          <Link href="/inventory/create" className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            + Add Unit
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-purple rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Sky Tower</h3>
              <span className="text-green-400 text-sm">+2</span>
            </div>
            <p className="text-white/80 mb-4">Premium residential units</p>
            <div className="flex justify-between text-white">
              <div>
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm text-white/70">Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold">75</div>
                <div className="text-sm text-white/70">Total</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-blue rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Ocean View</h3>
              <span className="text-green-400 text-sm">+12</span>
            </div>
            <p className="text-white/80 mb-4">Beachfront resort units</p>
            <div className="flex justify-between text-white">
              <div>
                <div className="text-3xl font-bold">23</div>
                <div className="text-sm text-white/70">Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold">85</div>
                <div className="text-sm text-white/70">Total</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-indigo rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">Garden City</h3>
              <span className="text-green-400 text-sm">+5</span>
            </div>
            <p className="text-white/80 mb-4">Mixed-use development</p>
            <div className="flex justify-between text-white">
              <div>
                <div className="text-3xl font-bold">67</div>
                <div className="text-sm text-white/70">Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold">200</div>
                <div className="text-sm text-white/70">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}