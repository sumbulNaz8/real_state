'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomersPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Customers</h1>
          <p className="text-gray-400">Manage customer information and details</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg ml-4 mr-4 md:ml-0 md:mr-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Customer List</h2>
          <Link href="/customers/create" className="px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Add Customer
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Name</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Email</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Phone</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Projects</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-purple flex items-center justify-center text-white font-medium mr-3">
                      AK
                    </div>
                    <div>
                      <div className="font-medium text-white">Ali Khan</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">ali@example.com</td>
                <td className="py-4 px-4 text-gray-300">+92 300 1234567</td>
                <td className="py-4 px-4 text-gray-300">2</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/customers/1" className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-blue flex items-center justify-center text-white font-medium mr-3">
                      FA
                    </div>
                    <div>
                      <div className="font-medium text-white">Fatima Ali</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">fatima@example.com</td>
                <td className="py-4 px-4 text-gray-300">+92 300 7654321</td>
                <td className="py-4 px-4 text-gray-300">1</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/customers/2" className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
              <tr className="hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-indigo flex items-center justify-center text-white font-medium mr-3">
                      AH
                    </div>
                    <div>
                      <div className="font-medium text-white">Ahmed Hassan</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">ahmed@example.com</td>
                <td className="py-4 px-4 text-gray-300">+92 300 9876543</td>
                <td className="py-4 px-4 text-gray-300">3</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Pending</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/customers/3" className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}