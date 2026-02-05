'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BookingDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Mock booking data - in a real app, this would come from an API
  const bookingData = {
    id: id,
    customerName: `Customer ${id}`,
    customerEmail: `customer${id}@example.com`,
    customerPhone: '+1-555-000-0000',
    project: 'Sky Tower',
    unitNumber: 'A-101',
    bookingDate: '2024-01-15',
    moveInDate: '2024-06-01',
    totalAmount: 250000,
    deposit: 25000,
    status: 'Confirmed',
    paymentStatus: 'Partial Payment',
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/bookings" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Bookings
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Booking Details</h1>
          <p className="text-gray-400">View and manage booking information</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Customer Name</label>
                <p className="text-white text-lg">{bookingData.customerName}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white text-lg">{bookingData.customerEmail}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-white text-lg">{bookingData.customerPhone}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Booking Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Project</label>
                <p className="text-white text-lg">{bookingData.project}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Unit Number</label>
                <p className="text-white text-lg">{bookingData.unitNumber}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Booking Date</label>
                <p className="text-white text-lg">{bookingData.bookingDate}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Move-in Date</label>
                <p className="text-white text-lg">{bookingData.moveInDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Financial Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Total Amount</label>
                <p className="text-white text-lg">${bookingData.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Deposit</label>
                <p className="text-white text-lg">${bookingData.deposit.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Status Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Booking Status</label>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  bookingData.status === 'Confirmed'
                    ? 'bg-green-900/30 text-green-400'
                    : bookingData.status === 'Pending'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {bookingData.status}
                </span>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Payment Status</label>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-900/30 text-blue-400">
                  {bookingData.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href={`/bookings/${id}/edit`}
            className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Edit Booking
          </Link>
          <Link
            href="/bookings"
            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
          >
            Back to Bookings
          </Link>
        </div>
      </div>
        </div>
    </ProtectedRoute>
  );
}