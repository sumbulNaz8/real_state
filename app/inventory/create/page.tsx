'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { crudService } from '@/services/crudService';

export default function CreateInventoryPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pieces',
    price: '',
    supplier: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      // Create inventory using the service
      await crudService.createInventory(inventoryData);

      alert(`Inventory item "${formData.name}" created successfully!`);

      // Reset form or redirect to inventory list
      setFormData({
        name: '',
        category: '',
        quantity: '',
        unit: 'pieces',
        price: '',
        supplier: '',
        description: '',
      });
    } catch (err: any) {
      console.error('Error creating inventory:', err);
      setError(err.message || 'Failed to create inventory item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/inventory" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Inventory
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Add New Inventory Item</h1>
          <p className="text-gray-400">Add a new item to your inventory</p>
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
                Add to Inventory
              </button>
              <Link
                href="/inventory"
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