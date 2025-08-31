import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from './../../../../types/index';
import { userSchema } from './schema/register';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = userSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ erros: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const user = await prisma.User.create({
      data: parsed.data,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
