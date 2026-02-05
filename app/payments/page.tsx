'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PaymentsPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-gray-400">Manage property payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-purple rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-green-400 text-sm">+12%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">$1.2M</h3>
          <p className="text-white/80 text-sm">Total Received</p>
        </div>

        <div className="bg-gradient-blue rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-green-400 text-sm">+5%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">$890K</h3>
          <p className="text-white/80 text-sm">This Month</p>
        </div>

        <div className="bg-gradient-indigo rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-red-400 text-sm">-2%</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">$120K</h3>
          <p className="text-white/80 text-sm">Pending</p>
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          <Link href="/payments/create" className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            + Record Payment
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Customer</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Method</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Amount</th>
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
                <td className="py-4 px-4 text-gray-300">Jan 15, 2024</td>
                <td className="py-4 px-4 text-gray-300">Bank Transfer</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                </td>
                <td className="py-4 px-4 text-right text-green-400 font-medium">$50,000</td>
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
                <td className="py-4 px-4 text-gray-300">Jan 18, 2024</td>
                <td className="py-4 px-4 text-gray-300">Cheque</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Processing</span>
                </td>
                <td className="py-4 px-4 text-right text-green-400 font-medium">$35,000</td>
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
                <td className="py-4 px-4 text-gray-300">Jan 20, 2024</td>
                <td className="py-4 px-4 text-gray-300">Cash</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                </td>
                <td className="py-4 px-4 text-right text-green-400 font-medium">$75,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}