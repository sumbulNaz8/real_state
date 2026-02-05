'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Mock customer data - in a real app, this would come from an API
  const customerData = {
    id: id,
    firstName: `Customer ${id}`,
    lastName: `Test${id}`,
    email: `customer${id}@example.com`,
    phone: '+1-555-000-0000',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    occupation: 'Software Engineer',
    status: 'Active',
    registrationDate: '2024-01-15',
  };

  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/customers" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Customers
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Customer Details</h1>
        <p className="text-gray-400">View and manage customer information</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Full Name</label>
                <p className="text-white text-lg">{customerData.firstName} {customerData.lastName}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white text-lg">{customerData.email}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <p className="text-white text-lg">{customerData.phone}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Occupation</label>
                <p className="text-white text-lg">{customerData.occupation}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Address</label>
                <p className="text-white text-lg">{customerData.address}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">City</label>
                <p className="text-white text-lg">{customerData.city}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">State</label>
                <p className="text-white text-lg">{customerData.state}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">ZIP/Postal Code</label>
                <p className="text-white text-lg">{customerData.zipCode}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Country</label>
                <p className="text-white text-lg">{customerData.country}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Registration Date</label>
                <p className="text-white text-lg">{customerData.registrationDate}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  customerData.status === 'Active'
                    ? 'bg-green-900/30 text-green-400'
                    : customerData.status === 'Lead'
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-gray-900/30 text-gray-400'
                }`}>
                  {customerData.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href={`/customers/${id}/edit`}
            className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Edit Customer
          </Link>
          <Link
            href="/customers"
            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
          >
            Back to Customers
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}