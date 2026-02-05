'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function InventoryDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Mock inventory data - in a real app, this would come from an API
  const inventoryData = {
    id: id,
    name: `Inventory Item ${id}`,
    category: 'Construction Materials',
    quantity: 150,
    unit: 'pieces',
    price: 25.99,
    supplier: 'ABC Construction Supplies',
    description: 'High-quality construction materials for building projects.',
    lastUpdated: '2024-01-15',
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/inventory" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Inventory
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Inventory Item Details</h1>
          <p className="text-gray-400">View and manage inventory information</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Item Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Item Name</label>
                  <p className="text-white text-lg">{inventoryData.name}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Category</label>
                  <p className="text-white text-lg">{inventoryData.category}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Quantity</label>
                  <p className="text-white text-lg">{inventoryData.quantity} {inventoryData.unit}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Price per Unit</label>
                  <p className="text-white text-lg">${inventoryData.price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Additional Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Supplier</label>
                  <p className="text-white text-lg">{inventoryData.supplier}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Last Updated</label>
                  <p className="text-white text-lg">{inventoryData.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-gray-400 text-sm">Description</label>
            <p className="text-white">{inventoryData.description}</p>
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              href={`/inventory/${id}/edit`}
              className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Edit Item
            </Link>
            <Link
              href="/inventory"
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
            >
              Back to Inventory
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}