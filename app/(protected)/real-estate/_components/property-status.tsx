import { AlertCircle, Check, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PropertyCardStatus } from '@/types';

interface PropertyStatusProps {
  status: PropertyCardStatus;
}

const statusConfig = {
  rented: {
    icon: Check,
    label: 'Alugado',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
    iconClassName: 'text-green-500',
  },
  vacant: {
    icon: Circle,
    label: 'Vazio',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
    iconClassName: 'text-gray-500',
  },
  overdue: {
    icon: AlertCircle,
    label: 'Atrasado',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
    iconClassName: 'text-red-500',
  },
};

export function PropertyStatus({ status }: PropertyStatusProps) {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Badge variant="secondary" className={config.className}>
      <IconComponent className={`size-3 mr-1 ${config.iconClassName}`} />
      {config.label}
    </Badge>
  );
}
