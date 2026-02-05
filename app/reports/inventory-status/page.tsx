'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function InventoryStatusReportPage() {
  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/reports" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Inventory Status Report</h1>
        <p className="text-gray-400">Check current inventory levels</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-purple rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Total Units</h3>
            <p className="text-3xl font-bold text-white">405</p>
          </div>

          <div className="bg-gradient-blue rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Available</h3>
            <p className="text-3xl font-bold text-white">145</p>
          </div>

          <div className="bg-gradient-yellow rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Reserved</h3>
            <p className="text-3xl font-bold text-white">89</p>
          </div>

          <div className="bg-gradient-green rounded-xl p-6">
            <h3 className="text-white text-lg mb-2">Sold</h3>
            <p className="text-3xl font-bold text-white">171</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Inventory by Project</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Total Units</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Available</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Reserved</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Sold</th>
                  <th className="py-3 px-4 text-left text-gray-400 font-medium">Availability %</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Sky Tower</td>
                  <td className="py-4 px-4 text-white">75</td>
                  <td className="py-4 px-4 text-white">45</td>
                  <td className="py-4 px-4 text-white">15</td>
                  <td className="py-4 px-4 text-white">15</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">60%</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4 px-4 text-white">Ocean View</td>
                  <td className="py-4 px-4 text-white">85</td>
                  <td className="py-4 px-4 text-white">23</td>
                  <td className="py-4 px-4 text-white">22</td>
                  <td className="py-4 px-4 text-white">40</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">27%</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white">Garden City</td>
                  <td className="py-4 px-4 text-white">200</td>
                  <td className="py-4 px-4 text-white">67</td>
                  <td className="py-4 px-4 text-white">35</td>
                  <td className="py-4 px-4 text-white">98</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">34%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Inventory by Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Apartments</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Available</span>
                  <span className="text-white">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reserved</span>
                  <span className="text-white">56</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sold</span>
                  <span className="text-white">120</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Houses</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Available</span>
                  <span className="text-white">34</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reserved</span>
                  <span className="text-white">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sold</span>
                  <span className="text-white">32</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f1f1f] rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Commercial</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Available</span>
                  <span className="text-white">22</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reserved</span>
                  <span className="text-white">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sold</span>
                  <span className="text-white">19</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              // Prepare inventory status data for export
              const inventoryData = {
                headers: ['Project', 'Total Units', 'Available', 'Reserved', 'Sold', 'Availability %'],
                rows: [
                  ['Sky Tower', 75, 45, 15, 15, '60%'],
                  ['Ocean View', 85, 23, 22, 40, '27%'],
                  ['Garden City', 200, 67, 35, 98, '34%']
                ],
                fileName: 'inventory-status-report.csv',
                title: 'Inventory Status Report'
              };

              // Import the export utility and use it
              import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                exportAsCSV(inventoryData);
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