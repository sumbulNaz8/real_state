'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { crudService } from '@/services/crudService';

export default function CreateBookingPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    projectId: '',
    unitNumber: '',
    bookingDate: '',
    moveInDate: '',
    totalAmount: '',
    deposit: '',
    status: 'Confirmed',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // Format the booking data to match API expectations
      const bookingData = {
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        project_id: parseInt(formData.projectId) || formData.projectId,
        unit_number: formData.unitNumber,
        booking_date: formData.bookingDate,
        move_in_date: formData.moveInDate,
        total_amount: parseFloat(formData.totalAmount) || 0,
        deposit: parseFloat(formData.deposit) || 0,
        status: formData.status,
        payment_status: 'Pending', // Default payment status
      };

      // Create booking using the service
      await crudService.createBooking(bookingData);

      alert(`Booking for "${formData.customerName}" created successfully!`);

      // Reset form or redirect to bookings list
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        projectId: '',
        unitNumber: '',
        bookingDate: '',
        moveInDate: '',
        totalAmount: '',
        deposit: '',
        status: 'Confirmed',
      });
    } catch (err: any) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/bookings" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Bookings
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Create New Booking</h1>
          <p className="text-gray-400">Book a property unit for a customer</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Customer Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter customer email"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Customer Phone</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter customer phone"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Project *</label>
                <input
                  type="text"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Unit Number *</label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter unit number"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Booking Date *</label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Move-in Date</label>
                <input
                  type="date"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Total Amount *</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter total amount"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Deposit</label>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter deposit amount"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Create Booking
              </button>
              <Link
                href="/bookings"
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