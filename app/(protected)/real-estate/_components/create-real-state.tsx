'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Plus } from 'lucide-react';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NotesSection } from './notes-section';
import { PropertyInfoSection } from './property-info-section';
import type { RealEstateFormData } from './schemas/real-estate-schema';
import { realEstateSchema } from './schemas/real-estate-schema';
import type { CreateRealEstateDialogProps } from './types/real-estate-types';

function CreateRealStateComponent({ onSubmit }: CreateRealEstateDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<RealEstateFormData>({
    resolver: zodResolver(realEstateSchema),
    defaultValues: {
      address: '',
      city: '',
      postalCode: '',
      propertyType: undefined,
      typology: undefined,
      area: '',
      constructionYear: '',
      propertyCondition: undefined,
      fiscalNumber: '',
      internalNotes: '',
    },
  });

  const handleSubmit = (values: RealEstateFormData) => {
    onSubmit?.(values);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button data-testid="create-real-state" aria-label="Criar imóvel">
          <Plus className="size-4" />
          Criar Imóvel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="size-4" />
              Novo Imóvel - Adicionar detalhes
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(85vh-8rem)] overflow-y-auto pr-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <PropertyInfoSection form={form} />
            <NotesSection form={form} />
          </form>
        </div>

        <DialogFooter className="pt-4 border-t mt-4 pr-6">
          <div className="flex justify-between items-center w-full">
            <div className="text-xs text-gray-500">
              💡 Pode editar estes dados mais tarde em Propriedades.
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                ← Voltar
              </Button>
              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={form.formState.isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {form.formState.isSubmitting ? 'Salvando...' : 'Continuar para Inquilino →'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const CreateRealState = memo(CreateRealStateComponent);
