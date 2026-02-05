const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: 'Ali Khan',
      action: 'Booked unit',
      project: 'Sky Tower',
      time: '2 min ago',
      status: 'success'
    },
    {
      id: 2,
      user: 'Fatima Ali',
      action: 'Made payment',
      project: 'Ocean View',
      time: '15 min ago',
      status: 'success'
    },
    {
      id: 3,
      user: 'Ahmed Hassan',
      action: 'Added new project',
      project: 'Garden City',
      time: '1 hour ago',
      status: 'info'
    },
    {
      id: 4,
      user: 'Sara Malik',
      action: 'Updated inventory',
      project: 'City Center',
      time: '3 hours ago',
      status: 'info'
    },
    {
      id: 5,
      user: 'Omar Farooq',
      action: 'Requested refund',
      project: 'Royal Palace',
      time: '5 hours ago',
      status: 'warning'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-3 pb-4 border-b border-gray-800 last:border-0 last:pb-0">
          <div className={`w-2 h-2 rounded-full ${
            activity.status === 'success' ? 'bg-green-500' :
            activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}></div>
          <div className="flex-1">
            <p className="text-white text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}
              <span className="text-purple-400 ml-1">{activity.project}</span>
            </p>
            <p className="text-gray-500 text-xs">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;