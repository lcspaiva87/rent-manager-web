import { z } from 'zod';

export const tenantRegisterSchema = z.object({
  contractType: z.enum(['residencial', 'comercial'], {
    message: 'Tipo de contrato é obrigatório',
  }),
  fullName: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().min(1, 'Email é obrigatório').email('Email deve ter um formato válido'),
  phone: z
    .string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^[\d\s()+-]+$/, 'Telefone deve conter apenas números e caracteres especiais válidos'),
  document: z
    .string()
    .min(11, 'Documento deve ter pelo menos 11 caracteres')
    .max(14, 'Documento deve ter no máximo 14 caracteres'),
  startDate: z
    .string()
    .min(1, 'Data de início é obrigatória')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve estar no formato DD/MM/AAAA'),
  rentValue: z.string().min(1, 'Valor da renda é obrigatório'),
  paymentDay: z.string().min(1, 'Dia de pagamento é obrigatório'),
  property: z.string().min(1, 'Seleção de imóvel é obrigatória'),
  tenant: z.string().min(1, 'Seleção de inquilino é obrigatória'),
  monthlyRent: z.string().min(1, 'Renda mensal é obrigatória'),
  notes: z.string().optional(),
});
