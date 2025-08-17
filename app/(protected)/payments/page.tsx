import { AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { type Payment, PaymentsView } from './_components/payments-view';
import { RegisterPaymentDialog } from './_components/register-payment-dialog';

export default function Payments() {
  const payments: Payment[] = [
    {
      id: 1,
      tenantName: 'João Silva',
      property: 'Rua das Flores, 123',
      amount: 2500,
      dueDate: '05/01/2024',
      paidDate: '05/01/2024',
      status: 'paid',
      paymentMethod: 'PIX',
      receiptUrl: '#',
    },
    {
      id: 2,
      tenantName: 'Maria Santos',
      property: 'Av. Principal, 456',
      amount: 3200,
      dueDate: '03/01/2024',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      receiptUrl: null,
    },
    {
      id: 3,
      tenantName: 'Pedro Costa',
      property: 'Rua Comercial, 789',
      amount: 1800,
      dueDate: '28/12/2023',
      paidDate: null,
      status: 'late',
      paymentMethod: null,
      receiptUrl: null,
    },
    {
      id: 4,
      tenantName: 'Ana Oliveira',
      property: 'Rua Tranquila, 321',
      amount: 2100,
      dueDate: '02/01/2024',
      paidDate: '02/01/2024',
      status: 'paid',
      paymentMethod: 'Transferência',
      receiptUrl: '#',
    },
    {
      id: 5,
      tenantName: 'Carlos Lima',
      property: 'Rua Nova, 555',
      amount: 2800,
      dueDate: '10/01/2024',
      paidDate: null,
      status: 'pending',
      paymentMethod: null,
      receiptUrl: null,
    },
  ];

  const stats = {
    totalReceived: payments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0),
    totalPending: payments
      .filter((p) => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0),
    totalLate: payments.filter((p) => p.status === 'late').reduce((sum, p) => sum + p.amount, 0),
    totalExpected: payments.reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Pagamentos</h1>
          <p className="text-muted-foreground">Controle de aluguéis e cobranças</p>
        </div>
        <RegisterPaymentDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Recebido</p>
                <p className="text-2xl font-bold">R$ {stats.totalReceived.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pendente</p>
                <p className="text-2xl font-bold">R$ {stats.totalPending.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Atrasado</p>
                <p className="text-2xl font-bold">R$ {stats.totalLate.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Esperado</p>
                <p className="text-2xl font-bold">R$ {stats.totalExpected.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <PaymentsView payments={payments} />
    </div>
  );
}
