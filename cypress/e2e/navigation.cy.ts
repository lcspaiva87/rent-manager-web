/// <reference types="cypress" />

describe('Rent Manager - Navigation and Layout', () => {
  it('should load the home page', () => {
    cy.visit('/', {
      failOnStatusCode: false,
      timeout: 30000,
    });
    cy.contains('Rent Manager', { timeout: 10000 }).should('be.visible');
  });

  it('should navigate to login page', () => {
    cy.visit('/', {
      failOnStatusCode: false,
      timeout: 30000,
    });
    cy.contains('Fazer Login / Cadastro', { timeout: 10000 }).should('be.visible');
    cy.contains('Fazer Login / Cadastro').click();
    cy.url().should('include', '/auth/signup');
  });

  it('should be responsive', () => {
    cy.visit('/', {
      failOnStatusCode: false,
      timeout: 30000,
    });

    // Test mobile viewport
    cy.viewport('iphone-6');
    cy.get('body').should('be.visible');

    // Test desktop viewport
    cy.viewport(1280, 720);
    cy.get('body').should('be.visible');
  });
});
