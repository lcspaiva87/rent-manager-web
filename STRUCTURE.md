# Estrutura do Projeto - Rent Manager Web

## 📁 Organização de Diretórios

```
rent-manager-web/
├── app/                          # Next.js App Router
│   ├── auth/                     # Páginas de autenticação
│   ├── dashboard/                # Páginas do dashboard (futuro)
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── src/                         # Código fonte da aplicação
│   ├── components/              # Componentes reutilizáveis
│   │   ├── forms/              # Componentes de formulários
│   │   ├── layout/             # Componentes de layout
│   │   ├── ui/                 # Componentes UI base (shadcn/ui)
│   │   └── index.ts            # Barrel exports
│   ├── lib/                    # Utilitários e configurações
│   │   ├── validations/        # Schemas de validação (Zod)
│   │   └── utils.ts           # Funções utilitárias
│   ├── types/                  # Definições de tipos TypeScript
│   ├── hooks/                  # Custom hooks
│   ├── constants/              # Constantes da aplicação
│   └── services/               # Serviços de API (futuro)
├── public/                     # Arquivos estáticos
│   ├── assets/                 # Assets organizados
│   │   └── images/            # Imagens
│   └── [outros arquivos]      # Ícones, etc.
└── [arquivos de configuração] # tsconfig, tailwind, etc.
```

## 🎯 Benefícios da Nova Estrutura

### 1. **Organização Melhorada**

- Separação clara entre lógica de negócio (`src/`) e roteamento (`app/`)
- Agrupamento lógico de componentes por funcionalidade
- Assets organizados hierarquicamente

### 2. **Tipagem Robusta**

- Tipos centralizados em `src/types/`
- Validação de formulários com Zod
- TypeScript paths configurados para imports limpos

### 3. **Reutilização de Código**

- Barrel exports para imports simplificados
- Hooks customizados para lógica compartilhada
- Componentes modulares e testáveis

### 4. **Escalabilidade**

- Estrutura preparada para crescimento
- Padrões consistentes de desenvolvimento
- Fácil localização de arquivos

## 🔧 Configurações Importantes

### TypeScript Paths

```json
{
  "@/*": ["./src/*"],
  "@/components/*": ["./src/components/*"],
  "@/lib/*": ["./src/lib/*"],
  "@/types/*": ["./src/types/*"],
  "@/hooks/*": ["./src/hooks/*"],
  "@/constants/*": ["./src/constants/*"],
  "@/assets/*": ["./public/assets/*"]
}
```

### Barrel Exports

- `src/components/index.ts` - Todos os componentes
- `src/components/ui/index.ts` - Componentes UI
- `src/components/forms/index.ts` - Formulários
- `src/components/layout/index.ts` - Layouts

## 📦 Dependências Principais

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

## 🚀 Próximos Passos

1. Implementar autenticação real
2. Criar páginas do dashboard
3. Implementar CRUD de propriedades
4. Adicionar sistema de pagamentos
5. Implementar relatórios e analytics

## 📝 Convenções

### Nomenclatura

- **Componentes**: PascalCase (`LoginForm.tsx`)
- **Arquivos**: kebab-case (`login-form.tsx`)
- **Constantes**: UPPER_SNAKE_CASE (`USER_ROLES`)
- **Tipos**: PascalCase (`User`, `Property`)

### Imports

```typescript
// Preferir imports com alias
import { LoginForm } from '@/components/forms';
import { User } from '@/types';
import { ROUTES } from '@/constants';
```

### Estrutura de Componentes

```typescript
// Sempre exportar por nome, não default para componentes
export const ComponentName = () => {
  // implementação
};
```
