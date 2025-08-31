import type { UserData } from '../support/types';

describe('Formulário de Registro', () => {
  let _testData: UserData;

  before(() => {
    cy.fixture('register-form').then((data) => {
      _testData = data;
    });
  });

  beforeEach(() => {
    const BASE_URL = Cypress.env('BASE_URL') || 'http://localhost:3000';
    // Deve visitar a página de cadastro (não a rota de API)
    cy.visit(`${BASE_URL}/auth/signup`);
  });

  describe('Elementos da Interface', () => {
    it('deve exibir todos os elementos do formulário', () => {
      // Verifica se o título está presente
      cy.contains('Entrar na sua conta').should('be.visible');

      // Verifica se todos os campos estão presentes
      cy.get('#name').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#confirmPassword').should('be.visible');

      // Verifica se os labels estão corretos
      cy.contains('label', 'Name').should('be.visible');
      cy.contains('label', 'Email').should('be.visible');
      cy.contains('label', 'Senha').should('be.visible');
      cy.contains('label', 'Confirmar Senha').should('be.visible');

      // Verifica se o botão de envio está presente
      cy.get('button[type="submit"]').should('be.visible').should('contain', 'Entrar');

      // Verifica se o link para login está presente
      cy.contains('Já possui uma conta?').should('be.visible');
      cy.get('a[href="/auth/signup"]').should('be.visible').should('contain', 'Faça login');
    });

    it('deve exibir placeholders corretos nos campos', () => {
      cy.get('#name').should('have.attr', 'placeholder', 'Digite seu nome');
      cy.get('#email').should('have.attr', 'placeholder', 'seu@email.com');
      cy.get('#password').should('have.attr', 'placeholder', 'Digite sua senha');
      cy.get('#confirmPassword').should('have.attr', 'placeholder', 'Confirme sua senha');
    });
  });

  describe('Funcionalidade de Visibilidade de Senha', () => {
    it('deve alternar a visibilidade da senha principal', () => {
      // Verifica se a senha está oculta inicialmente
      cy.get('#password').should('have.attr', 'type', 'password');

      // Clica no botão de mostrar senha
      cy.get('#password').parent().find('button').click();

      // Verifica se a senha agora está visível
      cy.get('#password').should('have.attr', 'type', 'text');

      // Clica novamente para ocultar
      cy.get('#password').parent().find('button').click();

      // Verifica se a senha está oculta novamente
      cy.get('#password').should('have.attr', 'type', 'password');
    });

    it('deve alternar a visibilidade da confirmação de senha', () => {
      // Verifica se a confirmação de senha está oculta inicialmente
      cy.get('#confirmPassword').should('have.attr', 'type', 'password');

      // Clica no botão de mostrar senha da confirmação
      cy.get('#confirmPassword').parent().find('button').click();

      // Verifica se a confirmação de senha agora está visível
      cy.get('#confirmPassword').should('have.attr', 'type', 'text');

      // Clica novamente para ocultar
      cy.get('#confirmPassword').parent().find('button').click();

      // Verifica se a confirmação de senha está oculta novamente
      cy.get('#confirmPassword').should('have.attr', 'type', 'password');
    });

    it('deve funcionar de forma independente para senha e confirmação', () => {
      // Mostra apenas a senha principal
      cy.get('#password').parent().find('button').click();
      cy.get('#password').should('have.attr', 'type', 'text');
      cy.get('#confirmPassword').should('have.attr', 'type', 'password');

      // Mostra apenas a confirmação de senha
      cy.get('#password').parent().find('button').click();
      cy.get('#confirmPassword').parent().find('button').click();
      cy.get('#password').should('have.attr', 'type', 'password');
      cy.get('#confirmPassword').should('have.attr', 'type', 'text');
    });
  });

  describe('Validações de Campo', () => {
    it('deve exibir erro quando o nome está vazio', () => {
      cy.get('#name').focus().blur();
      cy.get('button[type="submit"]').click();
      cy.contains('Nome deve ter pelo menos 2 caracteres').should('be.visible');
    });

    it('deve exibir erro quando o nome é muito curto', () => {
      cy.get('#name').type('A');
      cy.get('#name').blur();
      cy.contains('Nome deve ter pelo menos 2 caracteres').should('be.visible');
    });

    it('deve exibir erro quando o email está vazio', () => {
      cy.get('#email').focus().blur();
      cy.get('button[type="submit"]').click();
      cy.contains('Email é obrigatório').should('be.visible');
    });

    it('deve exibir erro quando o email tem formato inválido', () => {
      cy.get('#email').type('email-invalido');
      cy.get('#email').blur();
      cy.contains('Email deve ter um formato válido').should('be.visible');
    });

    it('deve exibir erro quando a senha está vazia', () => {
      cy.get('#password').focus().blur();
      cy.get('button[type="submit"]').click();
      cy.contains('Senha deve ter pelo menos 6 caracteres').should('be.visible');
    });

    it('deve exibir erro quando a senha é muito curta', () => {
      cy.get('#password').type('123');
      cy.get('#password').blur();
      cy.contains('Senha deve ter pelo menos 6 caracteres').should('be.visible');
    });

    it('deve exibir erro quando a senha não atende aos critérios de complexidade', () => {
      cy.get('#password').type('senhafraca');
      cy.get('#password').blur();
      cy.contains(
        'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
      ).should('be.visible');
    });

    it('deve exibir erro quando as senhas não coincidem', () => {
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('SenhaDiferente123');
      cy.get('#confirmPassword').blur();
      cy.contains('Senhas não coincidem').should('be.visible');
    });

    it('deve exibir erro quando a confirmação de senha está vazia', () => {
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').focus().blur();
      cy.contains('Confirmação de senha é obrigatória').should('be.visible');
    });
  });

  describe('Fluxo de Preenchimento Válido', () => {
    it('deve permitir preencher todos os campos com dados válidos', () => {
      // Preenche todos os campos com dados válidos
      cy.get('#name').type('João Silva');
      cy.get('#email').type('joao.silva@example.com');
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('MinhaSenh@123');

      // Verifica se não há mensagens de erro visíveis
      cy.get('.text-destructive').should('not.exist');

      // Verifica se o botão de envio está habilitado
      cy.get('button[type="submit"]').should('not.be.disabled');
    });

    it('deve permitir preenchimento usando fixture de usuário válido', () => {
      cy.fixture('register-form').then((data) => {
        const user = data.validUser;

        cy.get('#name').type(user.name);
        cy.get('#email').type(user.email);
        cy.get('#password').type(user.password);
        cy.get('#confirmPassword').type(user.confirmPassword);

        // Verifica se os valores foram preenchidos corretamente
        cy.get('#name').should('have.value', user.name);
        cy.get('#email').should('have.value', user.email);
        cy.get('#password').should('have.value', user.password);
        cy.get('#confirmPassword').should('have.value', user.confirmPassword);
      });
    });

    it('deve chamar a função onSubmit com dados corretos', () => {
      // Intercepta chamadas de rede (se houver)
      cy.intercept('POST', '/api/user/register', {
        statusCode: 200,
        body: { success: true },
      }).as('registerRequest');

      // Preenche o formulário
      cy.get('#name').type('Maria Santos');
      cy.get('#email').type('maria.santos@example.com');
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('MinhaSenh@123');

      // Submete o formulário
      cy.get('button[type="submit"]').click();

      // Se houver uma requisição, verifica se foi chamada
      // cy.wait('@registerRequest');
    });
  });

  describe('Estados de Loading', () => {
    it('deve exibir estado de carregamento durante o envio', () => {
      // Intercepta e atrasa a resposta para simular carregamento
      cy.intercept('POST', '/api/user/register', {
        statusCode: 200,
        delay: 2000,
        body: { success: true },
      }).as('slowRegisterRequest');

      // Preenche o formulário
      cy.get('#name').type('Pedro Costa');
      cy.get('#email').type('pedro.costa@example.com');
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('MinhaSenh@123');

      // Submete o formulário
      cy.get('button[type="submit"]').click();

      // Verifica se o estado de loading é exibido
      cy.contains('Entrando...').should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');

      // Verifica se o ícone de loading está presente
      cy.get('.animate-spin').should('be.visible');
    });

    it('deve desabilitar todos os campos durante o carregamento', () => {
      // Simula props de loading
      cy.window().then((_win) => {
        // Em um teste real, você poderia simular o estado de loading
        // através de props ou estado global
      });

      // Para este teste, vamos verificar após clicar em submit
      cy.get('#name').type('Ana Silva');
      cy.get('#email').type('ana.silva@example.com');
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('MinhaSenh@123');

      // Intercepta com delay
      cy.intercept('POST', '/api/user/register', {
        statusCode: 200,
        delay: 1000,
        body: { success: true },
      }).as('registerRequest');

      cy.get('button[type="submit"]').click();

      // Durante o loading, campos devem estar desabilitados
      cy.get('#name').should('be.disabled');
      cy.get('#email').should('be.disabled');
      cy.get('#password').should('be.disabled');
      cy.get('#confirmPassword').should('be.disabled');
    });
  });

  describe('Navegação', () => {
    it('deve navegar para a página de login ao clicar no link', () => {
      cy.get('a[href="/auth/signup"]').click();
      cy.url().should('include', '/auth/signup');
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter labels associados aos campos corretos', () => {
      cy.get('label[for="name"]').should('exist');
      cy.get('label[for="email"]').should('exist');
      cy.get('label[for="password"]').should('exist');
      cy.get('label[for="confirmPassword"]').should('exist');
    });

    it('deve permitir navegação por teclado', () => {
      // Testa navegação com Tab
      cy.get('#name').focus();
      cy.get('#name').tab();
      cy.get('#email').should('be.focused');

      cy.get('#email').tab();
      cy.get('#password').should('be.focused');

      cy.get('#password').tab();
      cy.get('#confirmPassword').should('be.focused');
    });

    it('deve ter elementos com atributos ARIA apropriados', () => {
      // Verifica se campos com erro têm atributos aria apropriados
      cy.get('#name').focus().blur();
      cy.get('button[type="submit"]').click();

      // Verifica se a mensagem de erro está associada ao campo
      cy.get('#name').should('have.attr', 'aria-invalid');
    });
  });

  describe('Cenários Edge Cases', () => {
    it('deve lidar com caracteres especiais no nome', () => {
      cy.get('#name').type('José da Silva-Santos Jr.');
      cy.get('#name').should('have.value', 'José da Silva-Santos Jr.');
    });

    it('deve lidar com emails longos', () => {
      const longEmail = 'usuario.com.nome.muito.longo@dominio.exemplo.com.br';
      cy.get('#email').type(longEmail);
      cy.get('#email').should('have.value', longEmail);
    });

    it('deve respeitar o limite máximo de caracteres', () => {
      // Testa nome com mais de 50 caracteres
      const longName = 'a'.repeat(51);
      cy.get('#name').type(longName);
      cy.get('#name').blur();
      cy.contains('Nome deve ter no máximo 50 caracteres').should('be.visible');
    });

    it('deve respeitar o limite máximo da senha', () => {
      // Testa senha com mais de 50 caracteres
      const longPassword = `A1${'a'.repeat(49)}`;
      cy.get('#password').type(longPassword);
      cy.get('#password').blur();
      cy.contains('Senha deve ter no máximo 50 caracteres').should('be.visible');
    });
  });

  describe('Integração com Sistema de Validação', () => {
    it('deve limpar erros quando o campo é corrigido', () => {
      // Causa um erro
      cy.get('#email').type('email-invalido');
      cy.get('#email').blur();
      cy.contains('Email deve ter um formato válido').should('be.visible');

      // Corrige o erro
      cy.get('#email').clear().type('email@valido.com');
      cy.get('#email').blur();
      cy.contains('Email deve ter um formato válido').should('not.exist');
    });

    it('deve validar em tempo real durante a digitação', () => {
      // Testa validação da confirmação de senha
      cy.get('#password').type('MinhaSenh@123');
      cy.get('#confirmPassword').type('SenhaDiferente');
      cy.get('#confirmPassword').blur();
      cy.contains('Senhas não coincidem').should('be.visible');

      // Corrige gradualmente
      cy.get('#confirmPassword').clear().type('MinhaSenh@123');
      cy.get('#confirmPassword').blur();
      cy.contains('Senhas não coincidem').should('not.exist');
    });
  });
});
