# 🧪 Cypress - Testes End-to-End

## 📋 Visão Geral

Este projeto utiliza o **Cypress** para testes end-to-end (E2E), garantindo que a aplicação funcione corretamente do ponto de vista do usuário final.

## 🚀 Como usar

### **Executar testes em modo interativo**
```bash
# Abre a interface gráfica do Cypress
npm run test:e2e:open
# ou
npm run cypress:open
```

### **Executar testes em modo headless**
```bash
# Executa todos os testes sem interface gráfica
npm run test:e2e
# ou
npm run cypress:run
```

### **Executar testes para CI/CD**
```bash
# Executa testes otimizados para CI
npm run test:e2e:ci
```

## 📁 Estrutura de Arquivos

```
cypress/
├── e2e/                    # Testes end-to-end
│   ├── auth.cy.ts         # Testes de autenticação
│   ├── navigation.cy.ts   # Testes de navegação
│   └── login-form.cy.ts   # Testes do formulário de login
├── fixtures/              # Dados de teste
│   └── data.json         # Dados mockados
├── support/               # Configurações e comandos
│   ├── commands.ts       # Comandos customizados
│   ├── e2e.ts           # Configuração E2E
│   └── component.ts     # Configuração de componentes
└── tsconfig.json         # TypeScript config para Cypress
```

## 🎯 Testes Implementados

### **1. Testes de Autenticação (auth.cy.ts)**
- ✅ Carregamento da página inicial
- ✅ Navegação para página de login
- ✅ Validação de formulário vazio
- ✅ Validação de email inválido
- ✅ Interação com formulário
- ✅ Toggle de visibilidade de senha
- ✅ Verificações de acessibilidade

### **2. Testes de Navegação (navigation.cy.ts)**
- ✅ Estrutura adequada da página
- ✅ Responsividade (mobile, tablet, desktop)
- ✅ Navegação entre páginas
- ✅ Carregamento de assets
- ✅ Ausência de erros no console
- ✅ Tratamento de páginas 404

### **3. Testes do Formulário de Login (login-form.cy.ts)**
- ✅ Renderização correta do formulário
- ✅ Validação de campos
- ✅ Validação de formato de email
- ✅ Validação de senha
- ✅ Toggle de visibilidade de senha
- ✅ Envio do formulário
- ✅ Estado de loading
- ✅ Acessibilidade por teclado

## 🛠️ Comandos Customizados

### **cy.login(email, password)**
```typescript
// Faz login completo na aplicação
cy.login('user@example.com', 'password123');
```

### **cy.fillLoginForm(email, password)**
```typescript
// Preenche apenas o formulário de login
cy.fillLoginForm('user@example.com', 'password123');
```

### **cy.waitForPageLoad()**
```typescript
// Aguarda o carregamento completo da página
cy.waitForPageLoad();
```

### **cy.checkA11y()**
```typescript
// Verifica acessibilidade básica
cy.checkA11y();
```

## 📊 Dados de Teste (Fixtures)

### **Usuários de teste**
```json
{
  "users": {
    "validUser": {
      "email": "admin@rentmanager.com",
      "password": "Admin123!",
      "name": "Admin User"
    },
    "testUser": {
      "email": "test@example.com", 
      "password": "Test123!",
      "name": "Test User"
    }
  }
}
```

### **Propriedades de teste**
```json
{
  "properties": {
    "apartment": {
      "title": "Apartamento Moderno",
      "type": "apartment",
      "bedrooms": 2,
      "rent": 1500
    }
  }
}
```

## ⚙️ Configuração

### **cypress.config.ts**
```typescript
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  }
});
```

## 🔄 Integração com CI/CD

### **GitHub Actions**
O projeto inclui workflow automático que:
- ✅ Executa testes em cada push/PR
- ✅ Executa em ambiente Ubuntu com Chrome
- ✅ Gera screenshots em caso de falhas
- ✅ Gera vídeos de todos os testes
- ✅ Faz upload dos artefatos

### **Executar localmente antes do commit**
```bash
# 1. Iniciar aplicação
npm run dev

# 2. Em outro terminal, executar testes
npm run test:e2e

# 3. Verificar resultados
```

## 📋 Boas Práticas

### **1. Nomenclatura de Testes**
```typescript
describe('Feature Name - Specific Area', () => {
  it('should perform expected behavior when condition', () => {
    // Test implementation
  });
});
```

### **2. Seletores**
```typescript
// ✅ Bom - usando atributos específicos
cy.get('[data-testid="login-button"]');
cy.get('input[type="email"]');

// ❌ Evitar - seletores frágeis
cy.get('.css-class-123');
cy.get('div > span > button');
```

### **3. Organização**
```typescript
beforeEach(() => {
  // Setup comum para todos os testes
  cy.visit('/auth/signup');
  cy.waitForPageLoad();
});
```

### **4. Assertions**
```typescript
// ✅ Assertions específicas
cy.get('button').should('be.visible').and('not.be.disabled');
cy.url().should('include', '/dashboard');
```

## 🚨 Solução de Problemas

### **Testes falhando localmente**
1. Certifique-se que a aplicação está rodando em `http://localhost:3000`
2. Execute `npm run dev` em um terminal
3. Execute `npm run test:e2e` em outro terminal

### **Timeout errors**
```typescript
// Aumentar timeout para elementos específicos
cy.get('[data-testid="slow-element"]', { timeout: 15000 });
```

### **Debug de testes**
```typescript
// Adicionar debug
cy.debug();
cy.pause();
```

## 📈 Relatórios

### **Screenshots e Vídeos**
- Screenshots automáticos em falhas: `cypress/screenshots/`
- Vídeos de todos os testes: `cypress/videos/`

### **Análise de Resultados**
- Interface gráfica mostra resultados detalhados
- CI/CD gera artefatos para download
- Logs detalhados para debugging

---

**🎉 Sistema de testes E2E completo e pronto para garantir a qualidade da aplicação!**
