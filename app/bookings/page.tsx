'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Bookings</h1>
          <p className="text-gray-400">Manage property bookings</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg ml-4 mr-4 md:ml-0 md:mr-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
          <Link href="/bookings/create" className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            + New Booking
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Customer</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Unit</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Amount</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Action</th>
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
                      <div className="text-gray-500 text-sm">ali@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Sky Tower</td>
                <td className="py-4 px-4 text-gray-300">ST-501</td>
                <td className="py-4 px-4 text-gray-300">Jan 15, 2024</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Confirmed</span>
                </td>
                <td className="py-4 px-4 text-gray-300">$125,000</td>
                <td className="py-4 px-4">
                  <Link href="/bookings/1" className="text-purple-400 hover:text-purple-300">View</Link>
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
                      <div className="text-gray-500 text-sm">fatima@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Ocean View</td>
                <td className="py-4 px-4 text-gray-300">OV-302</td>
                <td className="py-4 px-4 text-gray-300">Jan 18, 2024</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Pending</span>
                </td>
                <td className="py-4 px-4 text-gray-300">$98,500</td>
                <td className="py-4 px-4">
                  <Link href="/bookings/2" className="text-purple-400 hover:text-purple-300">View</Link>
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
                      <div className="text-gray-500 text-sm">ahmed@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Garden City</td>
                <td className="py-4 px-4 text-gray-300">GC-205</td>
                <td className="py-4 px-4 text-gray-300">Jan 20, 2024</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Confirmed</span>
                </td>
                <td className="py-4 px-4 text-gray-300">$156,750</td>
                <td className="py-4 px-4">
                  <Link href="/bookings/3" className="text-purple-400 hover:text-purple-300">View</Link>
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