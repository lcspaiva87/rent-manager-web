/// <reference types="cypress" />

describe('Inquilinos - Lista e Filtros', () => {
  beforeEach(() => {
    cy.visit('/tenants');
    // helper custom se existir
    // @ts-ignore
    if (cy.waitForPageLoad) cy.waitForPageLoad();
  });

  it('deve exibir header e linhas iniciais', () => {
    cy.contains('Gestão de Inquilinos').should('be.visible');
    cy.get('[data-testid="tenant-row"]').should('have.length.at.least', 1);
  });

  it('deve filtrar por nome', () => {
    cy.get('[data-testid="tenant-search"]').type('Maria');
    cy.contains('Maria Santos').should('be.visible');
    cy.contains('João Silva').should('not.exist');
  });

  it('deve filtrar por status inativo', () => {
    cy.get('[data-testid="status-filter"]').click();
    cy.contains('Inativo').click();
    cy.get('[data-testid="tenant-row"]').should('have.length', 1);
    cy.contains('Ana Oliveira').should('be.visible');
  });

  it('abre modal e valida campos obrigatórios', () => {
    cy.get('[data-testid="add-tenant-button"]').click();
    cy.contains('Novo Inquilino').should('be.visible');
    cy.get('button[type="submit"]').click();
    cy.contains('Nome inválido').should('exist');
    cy.contains('Email inválido').should('exist');
    cy.contains('Telefone inválido').should('exist');
    cy.contains('Imóvel obrigatório').should('exist');
  });

  it('cria novo inquilino com sucesso', () => {
    cy.get('[data-testid="tenant-row"]').then((listBefore) => {
      const count = listBefore.length;
      cy.get('[data-testid="add-tenant-button"]').click();
      cy.get('#name').type('Carlos Teste');
      cy.get('#email').type('carlos@teste.com');
      cy.get('#phone').type('11999998888');
      // Seleciona adicionar novo imóvel
      cy.get('[data-testid="property-select"]').click();
      cy.contains('Adicionar novo').click();
      cy.get('#newProperty').type('Rua Nova 123');
      cy.get('#contractStart').type('2025-01-01');
      cy.get('#contractEnd').type('2025-12-31');
      cy.get('#rent').clear().type('3500');
      cy.get('button[type="submit"]').click();
      cy.contains('Novo Inquilino').should('not.exist');
      cy.get('[data-testid="tenant-row"]').should('have.length', count + 1);
      cy.contains('Carlos Teste').should('exist');
    });
  });
});
