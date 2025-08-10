import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  QrCode,
  Receipt,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatisticsWithFilter } from './_components/statistics-with-filter';

export default function Dashboard() {
  const recentPayments = [
    {
      tenant: 'João Silva',
      property: 'Apto 201 - Centro',
      amount: 'R$ 2.500',
      status: 'paid',
      method: 'pix',
      date: '05/01/2024',
    },
    {
      tenant: 'Maria Santos',
      property: 'Casa - Jardins',
      amount: 'R$ 3.200',
      status: 'pending',
      method: 'boleto',
      date: '03/01/2024',
    },
    {
      tenant: 'Pedro Costa',
      property: 'Sala Comercial',
      amount: 'R$ 1.800',
      status: 'late',
      method: 'boleto',
      date: '28/12/2023',
    },
    {
      tenant: 'Ana Oliveira',
      property: 'Apto 105 - Vila Nova',
      amount: 'R$ 2.100',
      status: 'paid',
      method: 'cartao',
      date: '02/01/2024',
    },
  ];

  const upcomingEvents = [
    {
      type: 'contract_renewal',
      title: 'Renovação de Contrato',
      tenant: 'João Silva',
      date: '15/01/2024',
    },
    {
      type: 'payment_due',
      title: 'Vencimento de Aluguel',
      tenant: 'Carlos Lima',
      date: '10/01/2024',
    },
    { type: 'inspection', title: 'Vistoria Programada', property: 'Apto 304', date: '12/01/2024' },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: 'default',
      pending: 'secondary',
      late: 'destructive',
    };

    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      late: 'Atrasado',
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getMethodIcon = (method: string) => {
    const map = {
      pix: QrCode,
      boleto: Receipt,
      cartao: CreditCard,
    };
    const Icon = map[method as keyof typeof map];
    return Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null;
  };

  return (
    <div className="space-y-6">
      <StatisticsWithFilter />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pagamentos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={`${payment.tenant}-${payment.date}-${payment.amount}`}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{payment.tenant}</p>
                    <p className="text-sm text-muted-foreground">{payment.property}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {getMethodIcon(payment.method as any)}
                      <p className="font-semibold">{payment.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(payment.status)}
                      <span className="text-xs text-muted-foreground">{payment.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximos Eventos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={`${event.type}-${event.date}-${event.title}`}
                  className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="mt-1">
                    {event.type === 'contract_renewal' && (
                      <FileText className="h-4 w-4 text-primary" />
                    )}
                    {event.type === 'payment_due' && (
                      <DollarSign className="h-4 w-4 text-warning" />
                    )}
                    {event.type === 'inspection' && <CheckCircle className="h-4 w-4 text-accent" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.tenant || event.property}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
