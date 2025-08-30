'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
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
import { tenantRegisterSchema } from '../Schema/tenantRegisterSchema';

type TenantRegisterForm = z.infer<typeof tenantRegisterSchema>;

interface TenantsRegisterUserProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: TenantRegisterForm) => void;
}

export function TenantsRegisterUser({
  open = true,
  onOpenChange,
  onSubmit,
}: TenantsRegisterUserProps) {
  const [contractType, setContractType] = useState<'residencial' | 'comercial' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TenantRegisterForm>({
    resolver: zodResolver(tenantRegisterSchema),
    defaultValues: {
      contractType: undefined,
      fullName: '',
      email: '',
      phone: '',
      document: '',
      startDate: '',
      rentValue: '',
      paymentDay: '',
      property: '',
      tenant: '',
      monthlyRent: '',
      notes: '',
    },
  });

  const handleContractTypeSelect = (type: 'residencial' | 'comercial') => {
    setContractType(type);
    setValue('contractType', type);
  };

  const validateAndTransformData = (data: TenantRegisterForm) => {
    const rentValue = parseFloat(data.rentValue.replace(/[^\d,]/g, '').replace(',', '.'));
    const paymentDay = parseInt(data.paymentDay);
    const monthlyRent = parseFloat(data.monthlyRent.replace(/[^\d,]/g, '').replace(',', '.'));

    return {
      ...data,
      rentValue,
      paymentDay,
      monthlyRent,
    };
  };

  const onFormSubmit = async (data: TenantRegisterForm) => {
    try {
      setIsSubmitting(true);
      const transformedData = validateAndTransformData(data);

      if (onSubmit) {
        await onSubmit(transformedData as any);
      }

      // Reset form após submissão bem-sucedida
      reset();
      setContractType(null);
      onOpenChange?.(false);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const formatted = (parseInt(numericValue || '0') / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatted;
  };

  const handleCurrencyInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'rentValue' | 'monthlyRent'
  ) => {
    const formatted = formatCurrency(e.target.value);
    setValue(fieldName, formatted);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <Button variant="outline">Cadastrar Inquilino</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle>Cadastrar novo inquilino</DialogTitle>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Header com ícone */}
            <div className="space-y-2">
              <Button
                type="button"
                className="flex justify-start items-center gap-2 rounded-full"
                variant="secondary"
              >
                <UserPlusIcon className="w-4 h-4" />
                Dados do Inquilino
              </Button>
            </div>

            {/* Tipo de contrato */}
            <section className="space-y-2">
              <Label className="text-sm font-medium">Tipo de contrato *</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={contractType === 'residencial' ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => handleContractTypeSelect('residencial')}
                >
                  Residencial
                </Button>
                <Button
                  type="button"
                  variant={contractType === 'comercial' ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => handleContractTypeSelect('comercial')}
                >
                  Comercial
                </Button>
              </div>
              {errors.contractType && (
                <p className="text-sm text-red-500">{errors.contractType.message}</p>
              )}
            </section>

            {/* Linha 1: Nome completo e Email */}
            <section className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Nome completo *
                </Label>
                <Input
                  id="fullName"
                  placeholder="Introduzir nome"
                  {...register('fullName')}
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </section>

            {/* Linha 2: Telefone e Documento */}
            <section className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Telemóvel *
                </Label>
                <Input
                  id="phone"
                  placeholder="+351 ___ ___ ___"
                  {...register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="document" className="text-sm font-medium">
                  NIF *
                </Label>
                <Input
                  id="document"
                  placeholder="Número de identificação"
                  {...register('document')}
                  className={errors.document ? 'border-red-500' : ''}
                />
                {errors.document && (
                  <p className="text-sm text-red-500">{errors.document.message}</p>
                )}
              </div>
            </section>

            {/* Linha 3: Data de início e Valor da renda */}
            <section className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium">
                  Data de início *
                </Label>
                <Input
                  id="startDate"
                  placeholder="DD / MM / AAAA"
                  {...register('startDate')}
                  className={errors.startDate ? 'border-red-500' : ''}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500">{errors.startDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentValue" className="text-sm font-medium">
                  Valor da renda *
                </Label>
                <Input
                  id="rentValue"
                  placeholder="€ 0,00"
                  {...register('rentValue')}
                  onChange={(e) => handleCurrencyInput(e, 'rentValue')}
                  className={errors.rentValue ? 'border-red-500' : ''}
                />
                {errors.rentValue && (
                  <p className="text-sm text-red-500">{errors.rentValue.message}</p>
                )}
              </div>
            </section>

            {/* Linha 4: Dia de pagamento */}
            <section className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentDay" className="text-sm font-medium">
                  Dia de pagamento *
                </Label>
                <Input
                  id="paymentDay"
                  placeholder="1 - 28"
                  type="number"
                  min="1"
                  max="28"
                  {...register('paymentDay')}
                  className={errors.paymentDay ? 'border-red-500' : ''}
                />
                {errors.paymentDay && (
                  <p className="text-sm text-red-500">{errors.paymentDay.message}</p>
                )}
              </div>
              <div /> {/* Espaço vazio para manter o grid */}
            </section>

            {/* Linha 5: Selects */}
            <section className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Imóvel *</Label>
                <Controller
                  name="property"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                      <SelectTrigger className={errors.property ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecionar imóvel" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="property1">Apartamento T2 - Rua A</SelectItem>
                        <SelectItem value="property2">Casa T3 - Rua B</SelectItem>
                        <SelectItem value="property3">Escritório - Centro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.property && (
                  <p className="text-sm text-red-500">{errors.property.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Inquilino *</Label>
                <Controller
                  name="tenant"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                      <SelectTrigger className={errors.tenant ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Selecionar inquilino" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={4}>
                        <SelectItem value="tenant1">João Silva</SelectItem>
                        <SelectItem value="tenant2">Maria Santos</SelectItem>
                        <SelectItem value="tenant3">Pedro Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tenant && <p className="text-sm text-red-500">{errors.tenant.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent" className="text-sm font-medium">
                  Renda Mensal *
                </Label>
                <Input
                  id="monthlyRent"
                  placeholder="€ 0,00"
                  {...register('monthlyRent')}
                  onChange={(e) => handleCurrencyInput(e, 'monthlyRent')}
                  className={errors.monthlyRent ? 'border-red-500' : ''}
                />
                {errors.monthlyRent && (
                  <p className="text-sm text-red-500">{errors.monthlyRent.message}</p>
                )}
              </div>
            </section>

            {/* Notas */}
            <section className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Notas
              </Label>
              <Input
                id="notes"
                placeholder="Adicionar notas internas (opcional)"
                {...register('notes')}
              />
              <p className="text-xs text-gray-500">Campo opcional para informações adicionais</p>
            </section>
          </form>
        </DialogHeader>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setContractType(null);
              onOpenChange?.(false);
            }}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                // Funcionalidade "Guardar rascunho" pode ser implementada aqui
              }}
              disabled={isSubmitting}
            >
              Guardar rascunho
            </Button>

            <Button type="submit" onClick={handleSubmit(onFormSubmit)} disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : 'Continuar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
