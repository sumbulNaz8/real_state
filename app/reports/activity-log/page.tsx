'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ActivityLogPage() {
  // Mock activity data - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      user: 'Ali Khan',
      action: 'Booked unit',
      project: 'Sky Tower',
      time: '2024-01-15 10:30 AM',
      status: 'success'
    },
    {
      id: 2,
      user: 'Fatima Ali',
      action: 'Made payment',
      project: 'Ocean View',
      time: '2024-01-15 09:45 AM',
      status: 'success'
    },
    {
      id: 3,
      user: 'Ahmed Hassan',
      action: 'Added new project',
      project: 'Garden City',
      time: '2024-01-15 08:20 AM',
      status: 'info'
    },
    {
      id: 4,
      user: 'Sara Malik',
      action: 'Updated inventory',
      project: 'City Center',
      time: '2024-01-14 05:15 PM',
      status: 'info'
    },
    {
      id: 5,
      user: 'Omar Farooq',
      action: 'Requested refund',
      project: 'Royal Palace',
      time: '2024-01-14 03:40 PM',
      status: 'warning'
    },
    {
      id: 6,
      user: 'Zainab Ahmed',
      action: 'Created booking',
      project: 'Sky Tower',
      time: '2024-01-14 02:10 PM',
      status: 'success'
    },
    {
      id: 7,
      user: 'Bilal Riaz',
      action: 'Updated payment',
      project: 'Ocean View',
      time: '2024-01-14 11:30 AM',
      status: 'info'
    },
    {
      id: 8,
      user: 'Ayesha Khan',
      action: 'Cancelled booking',
      project: 'Garden City',
      time: '2024-01-14 10:15 AM',
      status: 'error'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="mb-6">
        <Link href="/reports" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
          ← Back to Reports
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2">Activity Log</h1>
        <p className="text-gray-400">View all system activities and actions</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recent Activities</h2>
          <div className="flex gap-3">
            <button
              onClick={() => {
                // In a real app, this would open a filter modal
                // For now, we'll simulate opening a filter interface
                const filterModal = document.createElement('div');
                filterModal.innerHTML = `
                  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                    <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; width: 400px; max-width: 90%; position: relative;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #444;">
                        <h3 style="color: white; margin: 0;">Filter Activity</h3>
                        <button onclick="this.closest('div').closest('div').remove()" style="background: none; border: none; color: #ccc; font-size: 20px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">&times;</button>
                      </div>
                      <div style="margin-bottom: 15px;">
                        <label style="display: block; color: #ccc; margin-bottom: 5px;">Date Range</label>
                        <input type="date" id="startDate" style="width: 100%; padding: 8px; background: #1f1f1f; color: white; border: 1px solid #444; border-radius: 4px; margin-bottom: 10px;">
                        <input type="date" id="endDate" style="width: 100%; padding: 8px; background: #1f1f1f; color: white; border: 1px solid #444; border-radius: 4px;">
                      </div>
                      <div style="margin-bottom: 15px;">
                        <label style="display: block; color: #ccc; margin-bottom: 5px;">User</label>
                        <input type="text" placeholder="Filter by user..." style="width: 100%; padding: 8px; background: #1f1f1f; color: white; border: 1px solid #444; border-radius: 4px;">
                      </div>
                      <div style="margin-bottom: 15px;">
                        <label style="display: block; color: #ccc; margin-bottom: 5px;">Action Type</label>
                        <select style="width: 100%; padding: 8px; background: #1f1f1f; color: white; border: 1px solid #444; border-radius: 4px;">
                          <option>All Actions</option>
                          <option>Booked unit</option>
                          <option>Made payment</option>
                          <option>Added new project</option>
                          <option>Updated inventory</option>
                          <option>Requested refund</option>
                        </select>
                      </div>
                      <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button onclick="this.closest('div').closest('div').remove()" style="padding: 8px 16px; background: #444; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
                        <button onclick="alert('Filters applied!')" style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">Apply</button>
                      </div>
                    </div>
                  </div>
                `;
                document.body.appendChild(filterModal);
              }}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors cursor-pointer"
            >
              Filter
            </button>
            <button
              onClick={() => {
                // Prepare activity log data for export
                const activityData = {
                  headers: ['User', 'Action', 'Project', 'Time', 'Status'],
                  rows: [
                    ['Ali Khan', 'Booked unit', 'Sky Tower', '2024-01-15 10:30 AM', 'Success'],
                    ['Fatima Ali', 'Made payment', 'Ocean View', '2024-01-15 09:45 AM', 'Success'],
                    ['Ahmed Hassan', 'Added new project', 'Garden City', '2024-01-15 08:20 AM', 'Info'],
                    ['Sara Malik', 'Updated inventory', 'City Center', '2024-01-14 05:15 PM', 'Info'],
                    ['Omar Farooq', 'Requested refund', 'Royal Palace', '2024-01-14 03:40 PM', 'Warning'],
                    ['Zainab Ahmed', 'Created booking', 'Sky Tower', '2024-01-14 02:10 PM', 'Success'],
                    ['Bilal Riaz', 'Updated payment', 'Ocean View', '2024-01-14 11:30 AM', 'Info'],
                    ['Ayesha Khan', 'Cancelled booking', 'Garden City', '2024-01-14 10:15 AM', 'Error']
                  ],
                  fileName: 'activity-log.csv',
                  title: 'Activity Log Report'
                };

                // Import the export utility and use it
                import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                  exportAsCSV(activityData);
                });
              }}
              className="px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">User</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Action</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Project</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Time</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-800 hover:bg-[#252525] transition-colors">
                  <td className="py-4 px-4 text-white">{activity.user}</td>
                  <td className="py-4 px-4 text-gray-300">{activity.action}</td>
                  <td className="py-4 px-4 text-purple-400">{activity.project}</td>
                  <td className="py-4 px-4 text-gray-400">{activity.time}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      activity.status === 'success' ? 'bg-green-900/30 text-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                      activity.status === 'error' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'
                    }`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}