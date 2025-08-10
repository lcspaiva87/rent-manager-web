import { BarChart3, Building2, CheckCircle, Users } from 'lucide-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import loginHero from '@/assets/images/login-hero.jpg';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <div className="flex h-screen">
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            {/* Imagem de fundo */}
            <div className="absolute inset-0">
              <Image
                src={loginHero}
                alt="Gestão de Imóveis"
                className="w-full h-full object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/70" />
            </div>

            {/* Conteúdo sobreposto */}
            <div className="relative z-10 flex flex-col justify-center p-12 text-white">
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Building2 className="h-12 w-12 text-white mr-4" />
                  <h1 className="text-3xl font-bold">PropertyManager</h1>
                </div>
                <h2 className="text-4xl font-bold mb-4 leading-tight">
                  Simplifique a gestão dos seus imóveis
                </h2>
                <p className="text-xl text-white/90 max-w-md leading-relaxed">
                  A plataforma completa para administrar propriedades, inquilinos e pagamentos de
                  forma eficiente.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Gestão de Inquilinos</h3>
                    <p className="text-sm text-white/80">
                      Controle completo do cadastro e histórico
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Controle de Pagamentos</h3>
                    <p className="text-sm text-white/80">Automação de cobranças e recibos</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Relatórios Inteligentes</h3>
                    <p className="text-sm text-white/80">Análises detalhadas e insights valiosos</p>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/80">Imóveis Gerenciados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/80">Satisfação</div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos sutis */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          </div>
          <main className="flex-1 w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-[400px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
