'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function PaymentCollectionReportPage() {
  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/reports" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Payment Collection Report</h1>
        <p className="text-gray-400">Track payment collections</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-purple rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Total Collected</h3>
            <p className="text-3xl font-bold text-white">$1,234,567</p>
            <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Expected</h3>
            <p className="text-3xl font-bold text-white">$1,456,789</p>
          </div>

          <div className="bg-gradient-yellow rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Pending</h3>
            <p className="text-3xl font-bold text-white">$222,222</p>
          </div>

          <div className="bg-gradient-green rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Collection Rate</h3>
            <p className="text-3xl font-bold text-white">84.7%</p>
            <p className="text-green-400 text-sm mt-2">↑ 3% from last month</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Monthly Collection Trend</h2>
          <div className="bg-[#1f1f1f] rounded-xl p-6 h-64 flex items-center justify-center">
            <p className="text-gray-400">Payment collection chart would appear here</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Payment Collection by Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Bank Transfer</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collected</span>
                  <span className="text-white">$890,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Count</span>
                  <span className="text-white">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Amount</span>
                  <span className="text-white">$19,787</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Cheque</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collected</span>
                  <span className="text-white">$234,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Count</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Amount</span>
                  <span className="text-white">$10,198</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Cash</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Collected</span>
                  <span className="text-white">$109,544</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Count</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Amount</span>
                  <span className="text-white">$9,128</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Recent Collections</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Customer</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Amount</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Method</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                  <td className="py-4 px-4 text-white">Ali Khan</td>
                  <td className="py-4 px-4 text-gray-300">Sky Tower</td>
                  <td className="py-4 px-4 text-green-400">$50,000</td>
                  <td className="py-4 px-4 text-gray-300">Bank Transfer</td>
                  <td className="py-4 px-4 text-gray-300">2024-01-15</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                  <td className="py-4 px-4 text-white">Fatima Ali</td>
                  <td className="py-4 px-4 text-gray-300">Ocean View</td>
                  <td className="py-4 px-4 text-green-400">$35,000</td>
                  <td className="py-4 px-4 text-gray-300">Cheque</td>
                  <td className="py-4 px-4 text-gray-300">2024-01-18</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Processing</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#252525] transition-colors">
                  <td className="py-4 px-4 text-white">Ahmed Hassan</td>
                  <td className="py-4 px-4 text-gray-300">Garden City</td>
                  <td className="py-4 px-4 text-green-400">$75,000</td>
                  <td className="py-4 px-4 text-gray-300">Cash</td>
                  <td className="py-4 px-4 text-gray-300">2024-01-20</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Completed</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              // Prepare payment collection data for export
              const paymentData = {
                headers: ['Customer', 'Project', 'Amount', 'Method', 'Date', 'Status'],
                rows: [
                  ['Ali Khan', 'Sky Tower', '$50,000', 'Bank Transfer', '2024-01-15', 'Completed'],
                  ['Fatima Ali', 'Ocean View', '$35,000', 'Cheque', '2024-01-18', 'Processing'],
                  ['Ahmed Hassan', 'Garden City', '$75,000', 'Cash', '2024-01-20', 'Completed']
                ],
                fileName: 'payment-collection-report.csv',
                title: 'Payment Collection Report'
              };

              // Import the export utility and use it
              import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                exportAsCSV(paymentData);
              });
            }}
            className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
          >
            Export Report
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}