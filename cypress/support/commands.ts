/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login user
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;
      
      /**
       * Custom command to fill login form
       * @example cy.fillLoginForm('user@example.com', 'password123')
       */
      fillLoginForm(email: string, password: string): Chainable<void>;
      
      /**
       * Custom command to wait for page load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>;
      
      /**
       * Custom command to check accessibility
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>;
    }
  }
}

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/auth/signup');
  cy.fillLoginForm(email, password);
  cy.get('button[type="submit"]').click();
  cy.waitForPageLoad();
});

// Fill login form command
Cypress.Commands.add('fillLoginForm', (email: string, password: string) => {
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
});

// Wait for page load command
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(1000); // Wait for any animations/transitions
});

// Basic accessibility check
Cypress.Commands.add('checkA11y', () => {
  // Check for basic accessibility requirements
  cy.get('main').should('exist');
  cy.get('h1, h2, h3, h4, h5, h6').should('exist');
  
  // Check for form labels
  cy.get('input').each(($input) => {
    const id = $input.attr('id');
    if (id) {
      cy.get(`label[for="${id}"]`).should('exist');
    }
  });
});

export {};
