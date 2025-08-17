'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Payment } from './payments-view';

const schema = z.object({
  tenantName: z.string().min(2, 'Nome muito curto'),
  property: z.string().min(2, 'Imóvel obrigatório'),
  amount: z.preprocess(
    (val) => (val === '' ? 0 : Number(val)),
    z.number().positive('Valor deve ser > 0')
  ),
  dueDate: z.string().min(1, 'Vencimento obrigatório'),
  paidDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  receiptUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

interface RegisterPaymentDialogProps {
  onSubmit?: (payment: Omit<Payment, 'id'>) => void;
}

export function RegisterPaymentDialog({ onSubmit }: RegisterPaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    // Cast para contornar incompatibilidade de tipo entre inferência e resolver
    resolver: zodResolver(schema as any) as any,
    defaultValues: {
      tenantName: '',
      property: '',
      amount: 0,
      dueDate: '',
      paidDate: '',
      paymentMethod: '',
      receiptUrl: '',
    },
  });

  const submit = (values: FormValues) => {
    const payload: Omit<Payment, 'id'> = {
      tenantName: values.tenantName,
      property: values.property,
      amount: values.amount,
      dueDate: values.dueDate,
      paidDate: values.paidDate || null,
      status: 'pending',
      paymentMethod: values.paymentMethod || null,
      receiptUrl: values.receiptUrl ? values.receiptUrl : null,
    };
    onSubmit?.(payload);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Registrar Pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Pagamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="tenantName">Inquilino</Label>
              <Input id="tenantName" {...form.register('tenantName')} />
              {form.formState.errors.tenantName && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.tenantName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="property">Imóvel</Label>
              <Input id="property" {...form.register('property')} />
              {form.formState.errors.property && (
                <p className="text-xs text-destructive">{form.formState.errors.property.message}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input id="amount" type="number" min="0" step="0.01" {...form.register('amount')} />
              {form.formState.errors.amount && (
                <p className="text-xs text-destructive">{form.formState.errors.amount.message}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="dueDate">Vencimento</Label>
              <Input id="dueDate" type="date" {...form.register('dueDate')} />
              {form.formState.errors.dueDate && (
                <p className="text-xs text-destructive">{form.formState.errors.dueDate.message}</p>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="paidDate">Data Pagamento (opcional)</Label>
              <Input id="paidDate" type="date" {...form.register('paidDate')} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="paymentMethod">Método (opcional)</Label>
              <Input id="paymentMethod" {...form.register('paymentMethod')} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="receiptUrl">URL Recibo (opcional)</Label>
              <Input id="receiptUrl" {...form.register('receiptUrl')} />
              {form.formState.errors.receiptUrl && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.receiptUrl.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
