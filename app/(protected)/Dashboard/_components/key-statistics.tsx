import {
  AlertTriangle,
  Building2,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Period = 'current' | 'last' | '12m';

interface KeyStatisticsProps {
  period: Period;
}

const statsByPeriod = {
  current: [
    {
      title: 'Total de Imóveis',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: Building2,
      color: 'primary',
    },
    {
      title: 'Inquilinos Ativos',
      value: '18',
      change: '+1',
      changeType: 'positive',
      icon: Users,
      color: 'accent',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.200',
      change: '+12%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'success',
    },
    {
      title: 'Inadimplência',
      value: '3',
      change: '-1',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'warning',
    },
  ],
  last: [
    {
      title: 'Total de Imóveis',
      value: '22',
      change: '+1',
      changeType: 'positive',
      icon: Building2,
      color: 'primary',
    },
    {
      title: 'Inquilinos Ativos',
      value: '17',
      change: '+1',
      changeType: 'positive',
      icon: Users,
      color: 'accent',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 40.300',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'success',
    },
    {
      title: 'Inadimplência',
      value: '4',
      change: '+1',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'warning',
    },
  ],
  '12m': [
    {
      title: 'Total de Imóveis',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: Building2,
      color: 'primary',
    },
    {
      title: 'Inquilinos Ativos',
      value: '18',
      change: '+10%',
      changeType: 'positive',
      icon: Users,
      color: 'accent',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 480.000',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'success',
    },
    {
      title: 'Inadimplência',
      value: '5',
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'warning',
    },
  ],
} as const;

export function KeyStatistics({ period }: KeyStatisticsProps) {
  const stats = statsByPeriod[period];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
