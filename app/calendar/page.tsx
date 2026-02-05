'use client';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CalendarPage() {
  return (
    <ProtectedRoute>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Calendar</h1>
        <p className="text-gray-400">Manage appointments and events</p>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Event Calendar</h2>
          <Link href="/calendar/create" className="px-4 py-2 bg-gradient-purple text-white rounded-lg text-sm">
            Add Event
          </Link>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-400">Calendar view coming soon. Events will be displayed here.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}