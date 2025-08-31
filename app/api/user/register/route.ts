import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { userSchema } from './schema/register';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ erros: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    /* biome-ignore lint/correctness/noUnusedVariables: Removemos confirmPassword do payload antes de criar o usuário */
    const { confirmPassword, ...data } = parsed.data;
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (_error) {
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
