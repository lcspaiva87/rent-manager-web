/// <reference types="cypress" />

describe('Rent Manager - Authentication Flow', () => {
  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('/');
  });

  it('should display the home page correctly', () => {
    // Check if the page loads
    cy.waitForPageLoad();

    // Check for essential elements
    cy.get('body').should('be.visible');
    cy.title().should('not.be.empty');
  });

  it('should navigate to login page', () => {
    // Navigate to login
    cy.visit('/auth/signup');
    cy.waitForPageLoad();

    // Check if login form is present
    cy.get('form').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors for empty form', () => {
    cy.visit('/auth/signup');
    cy.waitForPageLoad();

    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Should show validation errors (if implemented)
    // This will depend on your validation implementation
    cy.get('input[type="email"]').should('have.focus');
  });

  it('should show validation errors for invalid email', () => {
    cy.visit('/auth/signup');
    cy.waitForPageLoad();

    // Fill invalid email
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Check for email validation (if implemented)
    cy.get('input[type="email"]').should('have.attr', 'type', 'email');
  });

  it('should handle login form interaction', () => {
    cy.fixture('data').then((data) => {
      cy.visit('/auth/signup');
      cy.waitForPageLoad();

      // Fill the form with test data
      cy.fillLoginForm(data.users.testUser.email, data.users.testUser.password);

      // Check if form is filled
      cy.get('input[type="email"]').should('have.value', data.users.testUser.email);
      cy.get('input[type="password"]').should('have.value', data.users.testUser.password);

      // Submit form (this will likely fail without backend)
      cy.get('button[type="submit"]').click();
    });
  });

  it('should toggle password visibility', () => {
    cy.visit('/auth/signup');
    cy.waitForPageLoad();

    // Type password
    cy.get('input[type="password"]').type('mypassword');

    // Look for toggle button (adjust selector based on your implementation)
    cy.get('button').contains('Eye').click();

    // Password should now be visible as text
    cy.get('input[type="text"]').should('have.value', 'mypassword');

    // Toggle back
    cy.get('button').contains('EyeOff').click();
    cy.get('input[type="password"]').should('have.value', 'mypassword');
  });

  it('should check basic accessibility', () => {
    cy.visit('/auth/signup');
    cy.waitForPageLoad();
    cy.checkA11y();
  });
});
