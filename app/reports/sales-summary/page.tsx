'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function SalesSummaryReportPage() {
  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/reports" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Sales Summary Report</h1>
        <p className="text-gray-400">View sales performance and trends</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-purple rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-white">$1,245,678</p>
            <p className="text-green-400 text-sm mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Units Sold</h3>
            <p className="text-3xl font-bold text-white">89</p>
            <p className="text-green-400 text-sm mt-2">↑ 5% from last month</p>
          </div>

          <div className="bg-gradient-indigo rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Avg. Sale Price</h3>
            <p className="text-3xl font-bold text-white">$139,964</p>
            <p className="text-green-400 text-sm mt-2">↑ 7% from last month</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Sales Chart</h2>
          <div className="bg-[#1f1f1f] rounded-xl p-6 h-80 flex items-center justify-center">
            <p className="text-gray-400">Sales chart visualization would appear here</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Top Performing Projects</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Units Sold</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Revenue</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Avg. Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Sky Tower</td>
                  <td className="py-4 px-4 text-white">35</td>
                  <td className="py-4 px-4 text-white">$5,250,000</td>
                  <td className="py-4 px-4 text-white">$150,000</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Ocean View</td>
                  <td className="py-4 px-4 text-white">28</td>
                  <td className="py-4 px-4 text-white">$4,200,000</td>
                  <td className="py-4 px-4 text-white">$150,000</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white">Garden City</td>
                  <td className="py-4 px-4 text-white">26</td>
                  <td className="py-4 px-4 text-white">$3,900,000</td>
                  <td className="py-4 px-4 text-white">$150,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              // Prepare sales summary data for export
              const salesData = {
                headers: ['Project', 'Units Sold', 'Revenue', 'Avg. Price'],
                rows: [
                  ['Sky Tower', 35, '$5,250,000', '$150,000'],
                  ['Ocean View', 28, '$4,200,000', '$150,000'],
                  ['Garden City', 26, '$3,900,000', '$150,000']
                ],
                fileName: 'sales-summary-report.csv',
                title: 'Sales Summary Report'
              };

              // Import the export utility and use it
              import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                exportAsCSV(salesData);
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