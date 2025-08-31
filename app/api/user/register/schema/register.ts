import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(2, 'Nome muito curto'),
    lastName: z.string().min(2, 'Sobrenome muito curto'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    confirmPassword: z
      .string()
      .min(8, 'A confirmação de senha precisa ter pelo menos 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  });

export type UserInput = z.infer<typeof userSchema>;
