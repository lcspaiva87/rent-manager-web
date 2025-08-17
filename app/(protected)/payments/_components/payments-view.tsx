'use client';

import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Filter,
  Receipt,
  Search,
  Send,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export type PaymentStatus = 'paid' | 'pending' | 'late';

export interface Payment {
  id: number;
  tenantName: string;
  property: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: PaymentStatus;
  paymentMethod: string | null;
  receiptUrl: string | null;
}

interface PaymentsViewProps {
  payments: Payment[];
}

const statusConfig = {
  paid: { label: 'Pago', variant: 'default', Icon: CheckCircle },
  pending: { label: 'Pendente', variant: 'secondary', Icon: Clock },
  late: { label: 'Atrasado', variant: 'destructive', Icon: AlertTriangle },
} as const;

export function PaymentsView({ payments }: PaymentsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = useMemo(
    () =>
      payments.filter(
        (p) =>
          p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.property.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [payments, searchTerm]
  );

  const getDaysLate = (dueDate: string) => {
    const due = new Date(dueDate.split('/').reverse().join('-'));
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <>
      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por inquilino ou propriedade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filtros
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Histórico de Pagamentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const { label, variant, Icon } = statusConfig[payment.status];
              return (
                <div
                  key={payment.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{payment.tenantName}</h3>
                        <Badge variant={variant as any} className="flex items-center gap-1">
                          <Icon size={12} /> {label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{payment.property}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Vencimento: {payment.dueDate}</span>
                        </div>
                        {payment.paidDate && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Pago em: {payment.paidDate}</span>
                          </div>
                        )}
                        {payment.status === 'late' && (
                          <div className="flex items-center gap-1 text-destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{getDaysLate(payment.dueDate)} dias em atraso</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          R$ {payment.amount.toLocaleString()}
                        </div>
                        {payment.paymentMethod && (
                          <div className="text-sm text-muted-foreground">
                            via {payment.paymentMethod}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {payment.status === 'paid' && payment.receiptUrl && (
                          <Button variant="outline" size="sm">
                            <Receipt size={14} className="mr-1" />
                            Recibo
                          </Button>
                        )}
                        {payment.status !== 'paid' && (
                          <>
                            <Button variant="outline" size="sm">
                              <Send size={14} className="mr-1" />
                              Cobrar
                            </Button>
                            <Button size="sm">
                              <CheckCircle size={14} className="mr-1" />
                              Marcar como Pago
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
