import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectChart = () => {
  const data = [
    { name: 'Jan', Projects: 4000, Bookings: 2400 },
    { name: 'Feb', Projects: 3000, Bookings: 1398 },
    { name: 'Mar', Projects: 2000, Bookings: 9800 },
    { name: 'Apr', Projects: 2780, Bookings: 3908 },
    { name: 'May', Projects: 1890, Bookings: 4800 },
    { name: 'Jun', Projects: 2390, Bookings: 3800 },
    { name: 'Jul', Projects: 3490, Bookings: 4300 },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#4f46e5', borderRadius: '8px' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend />
          <Bar dataKey="Projects" fill="#8b5cf6" name="Projects" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Bookings" fill="#3b82f6" name="Bookings" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;