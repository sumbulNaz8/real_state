import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  trend: 'positive' | 'negative';
}

const StatsCard = ({ icon, title, value, change, trend }: StatsCardProps) => {
  return (
    <div className={`${trend === 'positive' ? 'bg-gradient-purple' : 'bg-gradient-blue'} rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className={`text-sm ${trend === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'positive' ? '+' : '-'}2%
        </span>
      </div>
      <h3 className="text-5xl font-bold text-white mb-2">{value}</h3>
      <p className="text-white/80 text-sm">{title}</p>
      <p className="text-white/60 text-xs mt-2">{change}</p>
    </div>
  );
};

export default StatsCard;