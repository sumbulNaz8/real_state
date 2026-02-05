'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // Mock project data - in a real app, this would come from an API
  const projectData = {
    id: id,
    name: `Project ${id}`,
    location: 'Sample Location',
    units: 100,
    status: 'Active',
    description: 'This is a sample project description.',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    budget: '$1,000,000',
    manager: 'John Doe',
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/projects" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Project Details</h1>
          <p className="text-gray-400">View and manage project information</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Project Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Project Name</label>
                <p className="text-white text-lg">{projectData.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Location</label>
                <p className="text-white text-lg">{projectData.location}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Units</label>
                <p className="text-white text-lg">{projectData.units}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Status</label>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  projectData.status === 'Active'
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-yellow-900/30 text-yellow-400'
                }`}>
                  {projectData.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Start Date</label>
                <p className="text-white text-lg">{projectData.startDate}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">End Date</label>
                <p className="text-white text-lg">{projectData.endDate}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Budget</label>
                <p className="text-white text-lg">{projectData.budget}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Manager</label>
                <p className="text-white text-lg">{projectData.manager}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-gray-400 text-sm">Description</label>
          <p className="text-white">{projectData.description}</p>
        </div>

        <div className="flex gap-4 mt-8">
          <Link
            href={`/projects/${id}/edit`}
            className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Edit Project
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
        </div>
    </ProtectedRoute>
  );
}