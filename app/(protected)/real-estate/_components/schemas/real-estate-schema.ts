import { z } from 'zod';

export const realEstateSchema = z.object({
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  postalCode: z
    .string()
    .min(1, 'Código postal é obrigatório')
    .regex(/^\d{4}-\d{3}$/, 'Formato inválido (ex: 1000-001)'),

  propertyType: z.enum(['apartamento', 'casa', 'comercial', 'terreno', 'garagem'], {
    message: 'Tipo de imóvel é obrigatório',
  }),
  typology: z.enum(['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6+'], {
    message: 'Tipologia é obrigatória',
  }),
  area: z
    .string()
    .min(1, 'Área é obrigatória')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Área deve ser um número maior que 0',
    }),

  constructionYear: z
    .string()
    .min(1, 'Ano de construção é obrigatório')
    .refine(
      (val) => {
        const year = Number(val);
        return !isNaN(year) && year >= 1800 && year <= new Date().getFullYear();
      },
      {
        message: `Ano deve estar entre 1800 e ${new Date().getFullYear()}`,
      }
    ),

  propertyCondition: z.enum(['pronto_habitar', 'renovacao_ligeira', 'grandes_obras', 'novo'], {
    message: 'Estado do imóvel é obrigatório',
  }),

  fiscalNumber: z.string().min(1, 'Número fiscal é obrigatório'),
  internalNotes: z.string().optional(),
});

export type RealEstateFormData = z.infer<typeof realEstateSchema>;
