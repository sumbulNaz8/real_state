'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CustomerLedgerReportPage() {
  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/reports" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Customer Ledger Report</h1>
        <p className="text-gray-400">View customer financial records</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-purple rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Total Outstanding</h3>
            <p className="text-3xl font-bold text-white">$890,456</p>
            <p className="text-red-400 text-sm mt-2">↑ 5% from last month</p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Total Paid</h3>
            <p className="text-3xl font-bold text-white">$2,134,789</p>
            <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-gradient-indigo rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Avg. Balance</h3>
            <p className="text-3xl font-bold text-white">$12,456</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Top Customers by Outstanding Amount</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Customer</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Email</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Total Due</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Paid</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Outstanding</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
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
                  <td className="py-4 px-4 text-gray-300">Sky Tower</td>
                  <td className="py-4 px-4 text-white">$250,000</td>
                  <td className="py-4 px-4 text-green-400">$200,000</td>
                  <td className="py-4 px-4 text-red-400">$50,000</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Partial</span>
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
                  <td className="py-4 px-4 text-gray-300">Ocean View</td>
                  <td className="py-4 px-4 text-white">$180,000</td>
                  <td className="py-4 px-4 text-green-400">$180,000</td>
                  <td className="py-4 px-4 text-green-400">$0</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Paid</span>
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
                  <td className="py-4 px-4 text-gray-300">Garden City</td>
                  <td className="py-4 px-4 text-white">$320,000</td>
                  <td className="py-4 px-4 text-green-400">$150,000</td>
                  <td className="py-4 px-4 text-red-400">$170,000</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Partial</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Payment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank Transfer</span>
                  <span className="text-white">$1,245,678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cheque</span>
                  <span className="text-white">$654,321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cash</span>
                  <span className="text-white">$234,790</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Payment Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-white">125</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing</span>
                  <span className="text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Failed</span>
                  <span className="text-white">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              // Prepare customer ledger data for export
              const customerData = {
                headers: ['Customer', 'Email', 'Project', 'Total Due', 'Paid', 'Outstanding', 'Status'],
                rows: [
                  ['Ali Khan', 'ali@example.com', 'Sky Tower', '$250,000', '$200,000', '$50,000', 'Partial'],
                  ['Fatima Ali', 'fatima@example.com', 'Ocean View', '$180,000', '$180,000', '$0', 'Paid'],
                  ['Ahmed Hassan', 'ahmed@example.com', 'Garden City', '$320,000', '$150,000', '$170,000', 'Partial']
                ],
                fileName: 'customer-ledger-report.csv',
                title: 'Customer Ledger Report'
              };

              // Import the export utility and use it
              import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                exportAsCSV(customerData);
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