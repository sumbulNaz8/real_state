export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'confirmed':
    case 'completed':
      return 'bg-green-900/30 text-green-400';
    case 'pending':
    case 'processing':
      return 'bg-yellow-900/30 text-yellow-400';
    case 'inactive':
    case 'cancelled':
    case 'failed':
      return 'bg-red-900/30 text-red-400';
    case 'under construction':
      return 'bg-blue-900/30 text-blue-400';
    default:
      return 'bg-gray-900/30 text-gray-400';
  }
};

export const getInitials = (name: string): string => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return names[0][0].toUpperCase();
};