'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Tenant } from './tenants-view';

const tenantSchema = z.object({
  name: z.string().min(2, 'Nome inválido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Telefone inválido'),
  property: z.string().min(2, 'Imóvel obrigatório'),
  contractStart: z.string().min(1, 'Início obrigatório'),
  contractEnd: z.string().min(1, 'Fim obrigatório'),
  rent: z
    .union([
      z.number().positive('Aluguel > 0'),
      z
        .string()
        .min(1)
        .transform((s) => Number(s))
        .pipe(z.number().positive('Aluguel > 0')),
    ])
    .transform((v) => (typeof v === 'number' ? v : Number(v))),
});

type TenantForm = z.infer<typeof tenantSchema>;

interface RegisterTenantDialogProps {
  onSubmit?: (tenant: Omit<Tenant, 'id'>) => void;
  propertyOptions?: string[];
}

export function RegisterTenantDialog({
  onSubmit,
  propertyOptions = [],
}: RegisterTenantDialogProps) {
  const [open, setOpen] = useState(false);
  const [propertyMode, setPropertyMode] = useState<'select' | 'new'>('select');
  const form = useForm<TenantForm>({
    resolver: zodResolver(tenantSchema as any) as any,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      property: '',
      contractStart: '',
      contractEnd: '',
      rent: 0,
    },
  });
  const [newProperty, setNewProperty] = useState('');

  const submit = (values: TenantForm) => {
    const resolvedProperty = propertyMode === 'new' ? newProperty.trim() : values.property;
    if (!resolvedProperty) {
      form.setError('property', { message: 'Imóvel obrigatório' });
      return;
    }
    const payload: Omit<Tenant, 'id'> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      property: resolvedProperty,
      contractStart: values.contractStart,
      contractEnd: values.contractEnd,
      rent: values.rent,
      status: 'active',
      paymentStatus: 'up_to_date',
      lastPayment: values.contractStart,
    };
    onSubmit?.(payload);
    setOpen(false);
    form.reset();
    setNewProperty('');
    setPropertyMode('select');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button data-testid="add-tenant-button" className="flex items-center gap-2">
          <Plus size={16} /> Novo Inquilino
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Inquilino</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <section className="grid gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Nome</Label>
                <Input aria-label="name" id="name" {...form.register('name')} />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input aria-label="email" id="email" type="email" {...form.register('email')} />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" {...form.register('phone')} />
                {form.formState.errors.phone && (
                  <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="grid gap-1">
                <Label>Imóvel</Label>
                {propertyMode === 'select' && propertyOptions.length > 0 && (
                  <Select
                    value={form.watch('property')}
                    onValueChange={(v) => {
                      if (v === '__new') {
                        setPropertyMode('new');
                        form.setValue('property', '');
                      } else {
                        form.setValue('property', v);
                      }
                    }}
                  >
                    <SelectTrigger data-testid="property-select">
                      <SelectValue placeholder="Selecione o imóvel" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                      <SelectItem value="__new">Adicionar novo...</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {(propertyMode === 'new' || propertyOptions.length === 0) && (
                  <div className="flex gap-2">
                    <Input
                      id="newProperty"
                      placeholder="Novo imóvel"
                      value={newProperty}
                      onChange={(e) => setNewProperty(e.target.value)}
                    />
                    {propertyOptions.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setPropertyMode('select');
                          setNewProperty('');
                        }}
                      >
                        Voltar
                      </Button>
                    )}
                  </div>
                )}
                {form.formState.errors.property && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.property.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="contractStart">Início Contrato</Label>
                <Input id="contractStart" type="date" {...form.register('contractStart')} />
                {form.formState.errors.contractStart && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.contractStart.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="contractEnd">Fim Contrato</Label>
                <Input id="contractEnd" type="date" {...form.register('contractEnd')} />
                {form.formState.errors.contractEnd && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.contractEnd.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                <Label htmlFor="rent">Aluguel (R$)</Label>
                <Input id="rent" type="number" min="0" step="0.01" {...form.register('rent')} />
                {form.formState.errors.rent && (
                  <p className="text-xs text-destructive">{form.formState.errors.rent.message}</p>
                )}
              </div>
            </div>
          </section>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="bg-transparent text-muted-foreground hover:bg-[#a3a3a317]"
            >
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
