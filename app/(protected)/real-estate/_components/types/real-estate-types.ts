import type { UseFormReturn } from 'react-hook-form';
import type { RealEstateFormData } from '../schemas/real-estate-schema';

export interface RealEstateData extends RealEstateFormData {
  id?: string;
}

export interface CreateRealEstateDialogProps {
  onSubmit?: (data: RealEstateData) => void;
}
export interface PropertyInfoSectionProps {
  form: UseFormReturn<RealEstateFormData>;
}

export interface NotesSectionProps {
  form: UseFormReturn<RealEstateFormData>;
}

export const PropertyTypes = {
  APARTAMENTO: 'apartamento',
  CASA: 'casa',
  COMERCIAL: 'comercial',
  TERRENO: 'terreno',
  GARAGEM: 'garagem',
} as const;

export const PropertyConditions = {
  NOVO: 'novo',
  PRONTO_HABITAR: 'pronto_habitar',
  RENOVACAO_LIGEIRA: 'renovacao_ligeira',
  GRANDES_OBRAS: 'grandes_obras',
} as const;

export const Typologies = {
  T0: 'T0',
  T1: 'T1',
  T2: 'T2',
  T3: 'T3',
  T4: 'T4',
  T5: 'T5',
  T6_PLUS: 'T6+',
} as const;
