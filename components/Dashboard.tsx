'use client';

import React from 'react';
import Link from 'next/link';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import ProjectChart from './ProjectChart';
import {
  Building,
  Home,
  FileText,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';

const Dashboard = () => {
  return (
    <>
      {/* Main Content */}
      <div className="p-0 md:p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Welcome to Kings Builder Real Estate Management System</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard
            icon={<Building className="w-8 h-8 text-white" />}
            title="Total Projects"
            value="8"
            change="+2 this month"
            trend="positive"
          />

          <StatsCard
            icon={<Home className="w-8 h-8 text-white" />}
            title="Available Units"
            value="145"
            change="+12 this week"
            trend="positive"
          />

          <StatsCard
            icon={<FileText className="w-8 h-8 text-white" />}
            title="Booked Units"
            value="89"
            change="+5 this week"
            trend="positive"
          />

          <StatsCard
            icon={<DollarSign className="w-8 h-8 text-white" />}
            title="Revenue"
            value="$1.2M"
            change="+15% this month"
            trend="positive"
          />
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-dark-card rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Project Overview</h2>
              <button
                onClick={() => {
                  // Prepare project overview data for export
                  const projectData = {
                    headers: ['Project', 'Status', 'Progress', 'Team Members', 'Deadline'],
                    rows: [
                      ['Sky Tower', 'Active', '75%', '5', '2025-06-30'],
                      ['Ocean View', 'Under Construction', '45%', '8', '2025-12-15'],
                      ['Garden City', 'Active', '90%', '12', '2024-11-30'],
                      ['City Center', 'Planning', '15%', '3', '2026-03-20'],
                      ['Royal Palace', 'Completed', '100%', '15', '2024-08-15']
                    ],
                    fileName: 'project-overview.csv',
                    title: 'Project Overview Report'
                  };

                  // Import the export utility and use it
                  import('@/utils/exportUtils').then(({ exportAsCSV }) => {
                    exportAsCSV(projectData);
                  });
                }}
                className="px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <ProjectChart />
          </div>

          <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <Link href="/reports/activity-log" className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors cursor-pointer">
                <Eye className="w-4 h-4" />
                View All
              </Link>
            </div>
            <RecentActivity />
          </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;