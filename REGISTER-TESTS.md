# Testes do Formulário de Registro

## Visão Geral

Este documento descreve os testes implementados para o formulário de registro (`RegisterForm`). Os testes cobrem funcionalidades desde validações básicas até cenários complexos de uso.

## Estrutura dos Testes

### 1. Testes E2E (`cypress/e2e/register-form.cy.ts`)

Os testes End-to-End verificam o comportamento completo do formulário no navegador.

#### Categorias de Teste:

**Elementos da Interface**
- ✅ Verifica se todos os campos estão presentes
- ✅ Valida placeholders corretos
- ✅ Testa presença de labels e botões

**Funcionalidade de Visibilidade de Senha**
- ✅ Alterna visibilidade da senha principal
- ✅ Alterna visibilidade da confirmação de senha
- ✅ Testa funcionamento independente dos dois campos

**Validações de Campo**
- ✅ Nome vazio ou muito curto
- ✅ Email vazio ou formato inválido
- ✅ Senha vazia, muito curta ou fraca
- ✅ Senhas não coincidem
- ✅ Confirmação de senha vazia

**Fluxo de Preenchimento Válido**
- ✅ Preenchimento com dados válidos
- ✅ Uso de fixtures de teste
- ✅ Chamada de API simulada

**Estados de Loading**
- ✅ Exibição de estado de carregamento
- ✅ Desabilitação de campos durante loading

**Navegação**
- ✅ Link para página de login

**Acessibilidade**
- ✅ Labels associados aos campos
- ✅ Navegação por teclado
- ✅ Atributos ARIA

**Cenários Edge Cases**
- ✅ Caracteres especiais
- ✅ Emails longos
- ✅ Limites de caracteres

### 2. Fixtures de Teste (`cypress/fixtures/register-form.json`)

Dados estruturados para testes consistentes:

```json
{
  "validUser": {
    "name": "João Silva Santos",
    "email": "joao.silva@example.com", 
    "password": "MinhaSenh@123",
    "confirmPassword": "MinhaSenh@123"
  },
  "invalidUsers": {
    "shortName": { "name": "A", ... },
    "invalidEmail": { "email": "email-invalido", ... },
    "weakPassword": { "password": "senhafraca", ... },
    "mismatchedPasswords": { ... }
  },
  "specialCaseUsers": {
    "withSpecialCharacters": { ... },
    "withAccents": { ... }
  }
}
```

### 3. Comandos Customizados (`cypress/support/commands.ts`)

Comandos reutilizáveis para facilitar os testes:

```typescript
// Preencher formulário de registro
cy.fillRegisterForm(userData)

// Submeter formulário
cy.submitRegisterForm()

// Verificar mensagens de erro
cy.checkErrorMessage('Email é obrigatório')

// Verificar ausência de erros
cy.checkNoErrors()

// Fluxo completo de registro
cy.registerUser(userData)
```

## Cenários de Teste

### Cenário 1: Registro Bem-Sucedido
```javascript
it('deve permitir registro com dados válidos', () => {
  cy.fixture('register-form').then((data) => {
    cy.fillRegisterForm(data.validUser);
    cy.submitRegisterForm();
    cy.checkNoErrors();
  });
});
```

### Cenário 2: Validação de Email
```javascript
it('deve exibir erro para email inválido', () => {
  cy.get('#email').type('email-invalido');
  cy.get('#email').blur();
  cy.checkErrorMessage('Email deve ter um formato válido');
});
```

### Cenário 3: Senhas Não Coincidem
```javascript
it('deve exibir erro quando senhas não coincidem', () => {
  cy.get('#password').type('MinhaSenh@123');
  cy.get('#confirmPassword').type('SenhaDiferente123');
  cy.get('#confirmPassword').blur();
  cy.checkErrorMessage('Senhas não coincidem');
});
```

## Validações Implementadas

### Nome
- ✅ Mínimo 2 caracteres
- ✅ Máximo 50 caracteres
- ✅ Não pode estar vazio

### Email
- ✅ Formato válido de email
- ✅ Campo obrigatório

### Senha
- ✅ Mínimo 6 caracteres
- ✅ Máximo 50 caracteres
- ✅ Deve conter: maiúscula, minúscula e número

### Confirmação de Senha
- ✅ Campo obrigatório
- ✅ Deve coincidir com a senha

## Casos de Teste Especiais

### Caracteres Especiais
- Nomes com acentos: "José da Silva-Ñoño Jr."
- Emails complexos: "user.name+tag@sub.domain.co.uk"

### Limites de Tamanho
- Nome muito longo (>50 caracteres)
- Senha muito longa (>50 caracteres)
- Email muito longo

### Estados de Loading
- Simulação de requisições lentas
- Desabilitação de campos durante loading
- Prevenção de múltiplas submissões

## Executando os Testes

### Interface Gráfica
```bash
npm run test:e2e:open
```

### Modo Headless
```bash
npm run test:e2e
```

### Apenas Testes de Registro
```bash
npx cypress run --spec "cypress/e2e/register-form.cy.ts"
```

## Cobertura de Testes

| Funcionalidade | E2E | Component | Status |
|---------------|-----|-----------|--------|
| Renderização de elementos | ✅ | 🚧 | Completo |
| Validações de campo | ✅ | 🚧 | Completo |
| Visibilidade de senha | ✅ | 🚧 | Completo |
| Estados de loading | ✅ | 🚧 | Completo |
| Navegação | ✅ | N/A | Completo |
| Acessibilidade | ✅ | 🚧 | Completo |
| Casos extremos | ✅ | 🚧 | Completo |

## Próximos Passos

1. **Testes de Component**: Configurar Cypress Component Testing
2. **Testes de API**: Implementar testes de integração com backend
3. **Testes de Performance**: Adicionar métricas de performance
4. **Testes Visuais**: Implementar screenshot testing

## Troubleshooting

### Problemas Comuns

**Erro: "Element not found"**
- Verificar se o servidor está rodando
- Aguardar elementos aparecerem com `cy.wait()`

**Erro: "chai-json-schema not found"**
- Remover import desnecessário do arquivo `e2e.ts`

**Testes falhando em CI**
- Usar modo headless: `npm run test:e2e:ci`
- Aumentar timeouts se necessário

### Configuração do Ambiente

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm run dev

# Executar testes
npm run test:e2e:open
```

## Contribuindo

Para adicionar novos testes:

1. Adicionar fixtures em `register-form.json`
2. Criar comandos customizados se necessário
3. Implementar testes seguindo padrões existentes
4. Atualizar esta documentação

## Recursos

- [Cypress Documentation](https://docs.cypress.io/)
- [React Hook Form Testing](https://react-hook-form.com/advanced-usage#Testing)
- [Zod Validation](https://zod.dev/)
