'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { crudService } from '@/services/crudService';

export default function EditInventoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pieces',
    price: '',
    supplier: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const inventoryId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
        const inventory = await crudService.getInventoryItem(inventoryId);

        setFormData({
          name: inventory.name || '',
          category: inventory.category || '',
          quantity: inventory.quantity?.toString() || '',
          unit: inventory.unit || 'pieces',
          price: inventory.price?.toString() || '',
          supplier: inventory.supplier || '',
          description: inventory.description || '',
        });
      } catch (err: any) {
        console.error('Error fetching inventory:', err);
        setError(err.message || 'Failed to load inventory data');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const inventoryId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);

      // Format the inventory data to match API expectations
      const inventoryData = {
        name: formData.name,
        category: formData.category,
        quantity: parseInt(formData.quantity) || 0,
        unit: formData.unit,
        price: parseFloat(formData.price) || 0,
        supplier: formData.supplier,
        description: formData.description,
      };

      // Update inventory using the service
      await crudService.updateInventory(inventoryId, inventoryData);

      alert(`Inventory item "${formData.name}" updated successfully!`);
      router.push(`/inventory/${inventoryId}`);
    } catch (err: any) {
      console.error('Error updating inventory:', err);
      setError(err.message || 'Failed to update inventory item');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/inventory" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
              ← Back to Inventory
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2">Editing Inventory Item</h1>
            <p className="text-gray-400">Loading inventory data...</p>
          </div>
          <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/inventory/${id}`} className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Item
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Edit Inventory Item</h1>
          <p className="text-gray-400">Update inventory item information</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Unit *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="pieces">Pieces</option>
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
                  <option value="meters">Meters</option>
                  <option value="liters">Liters</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price per Unit</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter price per unit"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter supplier name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter item description"
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Update Item
              </button>
              <Link
                href={`/inventory/${id}`}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}