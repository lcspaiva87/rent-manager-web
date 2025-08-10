# 🔧 Scripts de Lint e Commit - Rent Manager Web

## 📋 Scripts Disponíveis

### **Scripts de Desenvolvimento**
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

### **Scripts de Qualidade de Código**

#### **Lint (Verificação)**
```bash
# Verificar problemas de lint
npm run lint

# Verificar e corrigir automaticamente
npm run lint:fix
```

#### **Formatação**
```bash
# Formatar código
npm run format

# Verificar formatação sem alterar
npm run format:check
```

#### **Verificações Combinadas**
```bash
# Verificar lint + formatação + tipos
npm run check-all

# Corrigir lint + formatação
npm run fix-all

# Verificar tipos TypeScript
npm run type-check
```

## 🚀 Sistema de Pre-commit

### **Funcionamento Automático**
Quando você fizer um commit, o sistema automaticamente:

1. ✅ **Executa lint-staged** - verifica apenas arquivos modificados
2. ✅ **Corrige problemas automaticamente** - lint + formatação
3. ✅ **Verifica tipos TypeScript** - garante tipagem correta
4. ✅ **Valida mensagem de commit** - usando conventional commits

### **Arquivos Verificados**
- **`*.{js,jsx,ts,tsx}`** - Lint + Formatação
- **`*.{json,md,css}`** - Formatação

### **Como usar:**
```bash
# Commit normal - verificações executam automaticamente
git add .
git commit -m "feat: adicionar nova funcionalidade"

# Se houver erros, eles serão corrigidos automaticamente
# e você precisa fazer commit novamente
git add .
git commit -m "feat: adicionar nova funcionalidade"
```

## 🛠️ Scripts Manuais

### **Verificação Completa (Windows)**
```powershell
# Execute para verificar todo o projeto
.\check-all.ps1
```

### **Verificação Completa (Linux/Mac)**
```bash
# Execute para verificar todo o projeto
./check-all.sh
```

### **Correção Manual**
```bash
# Se quiser corrigir tudo manualmente antes do commit
npm run fix-all
```

## ⚙️ Configurações

### **Biome (biome.json)**
- **Formatter**: Espaços, linha width 100, quotes simples
- **Linter**: Regras recomendadas + customizadas
- **Organização**: Auto-organiza imports

### **Lint-staged (package.json)**
```json
{
  "*.{js,jsx,ts,tsx}": [
    "biome check --fix",
    "biome format --write",
    "git add"
  ],
  "*.{json,md,css}": [
    "biome format --write", 
    "git add"
  ]
}
```

### **Husky (.husky/pre-commit)**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Executando verificações pré-commit..."
npx lint-staged
echo "🔍 Verificando tipos TypeScript..."
npm run type-check
echo "✅ Verificações pré-commit concluídas!"
```

## 🎯 Benefícios

### **1. Qualidade Automática**
- ✅ Código sempre formatado consistentemente
- ✅ Problemas de lint corrigidos automaticamente
- ✅ Imports organizados automaticamente
- ✅ Tipagem TypeScript verificada

### **2. Workflow Otimizado**
- 🚀 **Rápido**: Verifica apenas arquivos modificados
- 🔧 **Automático**: Correções aplicadas automaticamente
- 📝 **Padronizado**: Mensagens de commit consistentes
- 🛡️ **Seguro**: Impede commits com erros

### **3. Configuração Robusta**
- 📋 **Lint rules** personalizadas para React/Next.js
- 🎨 **Formatação** consistente em toda a equipe
- 🔍 **Type checking** obrigatório
- 📝 **Conventional commits** enforçado

## 🚨 Solução de Problemas

### **Se o commit falhar:**
1. **Verifique os erros** mostrados no terminal
2. **Execute** `npm run fix-all` para corrigir automaticamente
3. **Adicione as mudanças** `git add .`
4. **Tente o commit novamente**

### **Se houver erros de tipo:**
1. **Execute** `npm run type-check` para ver os erros
2. **Corrija os tipos** manualmente
3. **Tente o commit novamente**

### **Para bypass emergencial (não recomendado):**
```bash
# Apenas em emergências - pula as verificações
git commit -m "fix: correção urgente" --no-verify
```

## 📊 Exemplo de Fluxo

```bash
# 1. Desenvolvendo
npm run dev

# 2. Verificar durante desenvolvimento (opcional)
npm run check-all

# 3. Preparar commit
git add .

# 4. Commit (verificações automáticas)
git commit -m "feat: adicionar sistema de login"

# ✅ Se tudo estiver OK: commit realizado
# ❌ Se houver problemas: correções automáticas + novo commit necessário
```

---

**🎉 Agora seu projeto tem um sistema robusto de qualidade de código que roda automaticamente em cada commit!**
