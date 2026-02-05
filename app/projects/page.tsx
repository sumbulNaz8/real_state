'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="mb-6 ml-4 mr-4 md:ml-0 md:mr-0">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400">Manage your real estate projects</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg ml-4 mr-4 md:ml-0 md:mr-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">All Projects</h2>
          <Link href="/projects/create" className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
            + New Project
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Location</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Units</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-purple w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Sky Tower</div>
                      <div className="text-gray-500 text-sm">Residential Complex</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Karachi, Clifton</td>
                <td className="py-4 px-4 text-gray-300">120</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/projects/1" className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-blue w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Ocean View</div>
                      <div className="text-gray-500 text-sm">Beachfront Resort</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Karachi, Sea View</td>
                <td className="py-4 px-4 text-gray-300">85</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Under Construction</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/projects/2" className="text-purple-400 hover:text-purple-300">View</Link>
                </td>
              </tr>
              <tr className="hover:bg-[#252525] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-indigo w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white">Garden City</div>
                      <div className="text-gray-500 text-sm">Mixed Use Development</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">Karachi, DHA</td>
                <td className="py-4 px-4 text-gray-300">200</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
                </td>
                <td className="py-4 px-4">
                  <Link href="/projects/3" className="text-purple-400 hover:text-purple-300">View</Link>
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