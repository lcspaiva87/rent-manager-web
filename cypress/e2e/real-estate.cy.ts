/// <reference types="cypress" />

// Testes E2E da página de Imóveis

describe('Imóveis - Lista, Filtros e Modal', () => {
  beforeEach(() => {
    cy.visit('/real-estate');
    // @ts-ignore
    if (cy.waitForPageLoad) cy.waitForPageLoad();
  });

  it('exibe header e cards iniciais', () => {
    cy.contains('Imóveis').should('be.visible');
    cy.get('[data-testid="property-card"]').should('have.length.at.least', 1);
  });

  it('filtra por status alugados', () => {
    cy.get('[data-testid="status-filter-rented"]').click();
    cy.get('[data-testid="property-card"]').each(($el) => {
      cy.wrap($el).contains('Alugado');
    });
  });

  it('filtra por status vazio', () => {
    cy.get('[data-testid="status-filter-vacant"]').click();
    cy.get('[data-testid="property-card"]').each(($el) => {
      cy.wrap($el).contains('Vazio');
    });
  });

  it('filtra por status atrasados', () => {
    cy.get('[data-testid="status-filter-overdue"]').click();
    cy.get('[data-testid="property-card"]').each(($el) => {
      cy.wrap($el).contains('Atrasado');
    });
  });

  it('busca por endereço ou título', () => {
    cy.get('[data-testid="real-estate-search"]').type('Centro');
    cy.get('[data-testid="property-card"]').should('have.length', 1);
    cy.get('[data-testid="property-card"]').contains('Apartamento Centro');
  });

  it('estado vazio ao buscar termo inexistente', () => {
    cy.get('[data-testid="real-estate-search"]').type('zzzzzzzz');
    cy.get('[data-testid="empty-state"]').should('exist');
  });

  it('abre e fecha modal de propriedade', () => {
    cy.get('[data-testid="property-card"]').first().click();
    cy.get('[data-testid="property-modal"]').should('be.visible');
    cy.contains('Fechar').click();
    cy.get('[data-testid="property-modal"]').should('not.exist');
  });
});
