/// <reference types="cypress" />

// Testes E2E básicos da página de Pagamentos e modal de Registro

describe('Pagamentos - Registro de Pagamento', () => {
  beforeEach(() => {
    cy.visit('/payments');
    cy.waitForPageLoad();
  });

  it('deve exibir cards de estatísticas', () => {
    cy.contains('Gestão de Pagamentos').should('be.visible');
    cy.contains('Recebido').should('be.visible');
    cy.contains('Pendente').should('be.visible');
    cy.contains('Atrasado').should('be.visible');
    cy.contains('Total Esperado').should('be.visible');
  });

  it('deve abrir e fechar o modal de novo pagamento', () => {
    cy.contains('Registrar Pagamento').click();
    cy.contains('Novo Pagamento').should('be.visible');
    cy.get('button').contains('Cancelar').click();
    cy.contains('Novo Pagamento').should('not.exist');
  });

  it('deve validar campos obrigatórios', () => {
    cy.contains('Registrar Pagamento').click();
    cy.get('button[type="submit"]').click();
    cy.contains('Nome muito curto').should('exist');
    cy.contains('Imóvel obrigatório').should('exist');
    cy.contains('Valor deve ser > 0').should('exist');
    cy.contains('Vencimento obrigatório').should('exist');
  });

  it('deve aceitar dados válidos e fechar modal ao salvar', () => {
    cy.contains('Registrar Pagamento').click();
    cy.get('#tenantName').type('Novo Inquilino');
    cy.get('#property').type('Apartamento 800');
    cy.get('#amount').clear().type('3500');
    cy.get('#dueDate').type('2025-12-10');
    cy.get('button[type="submit"]').click();
    cy.contains('Novo Pagamento').should('not.exist');
  });

  it('deve filtrar lista por nome do inquilino', () => {
    cy.get('input[placeholder*="inquilino"]').type('João');
    cy.contains('João Silva').should('exist');
    cy.contains('Maria Santos').should('not.exist');
  });
});
