'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { crudService } from '@/services/crudService';

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    units: '',
    status: 'Active',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    manager: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
        const project = await crudService.call(`/projects/${projectId}`, { method: 'GET' });

        setFormData({
          name: project.name || '',
          location: project.location || '',
          units: project.total_units?.toString() || '',
          status: project.status || 'Active',
          description: project.description || '',
          startDate: project.start_date || '',
          endDate: project.end_date || '',
          budget: project.budget || '',
          manager: project.project_manager || '',
        });
      } catch (err: any) {
        console.error('Error fetching project:', err);
        setError(err.message || 'Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const projectId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);

      // Format the project data to match API expectations
      const projectData = {
        name: formData.name,
        location: formData.location,
        total_units: parseInt(formData.units),
        available_units: parseInt(formData.units), // Adjust based on actual availability
        status: formData.status,
        description: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: formData.budget,
        project_manager: formData.manager,
      };

      // Update project using the service
      await crudService.updateProject(projectId, projectData);

      alert(`Project "${formData.name}" updated successfully!`);
      router.push(`/projects/${projectId}`);
    } catch (err: any) {
      console.error('Error updating project:', err);
      setError(err.message || 'Failed to update project');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/projects" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
              ← Back to Projects
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2">Editing Project</h1>
            <p className="text-gray-400">Loading project data...</p>
          </div>
          <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href={`/projects/${id}`} className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
            ← Back to Project
          </Link>
          <h1 className="text-3xl font-bold text-white mt-2">Edit Project</h1>
          <p className="text-gray-400">Update project information</p>
        </div>

        <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Number of Units *</label>
                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter number of units"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Completed">Completed</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter budget (e.g., $1,000,000)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Project Manager</label>
                <input
                  type="text"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter project manager name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-dark-input border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter project description"
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Update Project
              </button>
              <Link
                href={`/projects/${id}`}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}