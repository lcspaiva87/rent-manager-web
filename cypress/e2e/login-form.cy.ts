/// <reference types="cypress" />

describe('Rent Manager - Login Form Component', () => {
  beforeEach(() => {
    cy.visit('/auth/signup');
    cy.waitForPageLoad();
  });

  it('should render login form correctly', () => {
    // Check form elements
    cy.get('form').should('be.visible');
    
    // Check email field
    cy.get('input[type="email"]')
      .should('be.visible')
      .and('have.attr', 'placeholder')
      .and('have.attr', 'id');
    
    // Check password field
    cy.get('input[type="password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder')
      .and('have.attr', 'id');
    
    // Check submit button
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain.text', 'Entrar');
    
    // Check labels exist
    cy.get('label[for="email"]').should('be.visible').and('contain.text', 'Email');
    cy.get('label[for="password"]').should('be.visible').and('contain.text', 'Senha');
  });

  it('should handle form validation', () => {
    // Test empty form submission
    cy.get('button[type="submit"]').click();
    
    // Email field should be focused or show validation
    cy.get('input[type="email"]').should('be.focused');
  });

  it('should validate email format', () => {
    // Test invalid email formats
    const invalidEmails = ['invalid', 'test@', '@domain.com', 'test.domain.com'];
    
    invalidEmails.forEach((email) => {
      cy.get('input[type="email"]').clear().type(email);
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      
      // Should not proceed with invalid email
      cy.url().should('include', '/auth/signup');
    });
  });

  it('should validate password requirements', () => {
    cy.get('input[type="email"]').type('test@example.com');
    
    // Test short password
    cy.get('input[type="password"]').type('123');
    cy.get('button[type="submit"]').click();
    
    // Should show validation error or not proceed
    cy.url().should('include', '/auth/signup');
  });

  it('should toggle password visibility', () => {
    const password = 'mySecretPassword123';
    
    // Type password
    cy.get('input[type="password"]').type(password);
    
    // Find and click password toggle button
    cy.get('button[type="button"]').contains('Eye').click();
    
    // Password should be visible
    cy.get('input[type="text"]').should('have.value', password);
    
    // Toggle back to hidden
    cy.get('button[type="button"]').contains('EyeOff').click();
    cy.get('input[type="password"]').should('have.value', password);
  });

  it('should handle form submission with valid data', () => {
    cy.fixture('data').then((data) => {
      // Fill form with valid data
      cy.get('input[type="email"]').type(data.users.testUser.email);
      cy.get('input[type="password"]').type(data.users.testUser.password);
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should attempt to submit (may show loading state)
      cy.get('button[type="submit"]').should('be.visible');
    });
  });

  it('should disable form during submission', () => {
    cy.fixture('data').then((data) => {
      // Fill form
      cy.get('input[type="email"]').type(data.users.testUser.email);
      cy.get('input[type="password"]').type(data.users.testUser.password);
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Form elements should be disabled during submission
      cy.get('button[type="submit"]').should('have.attr', 'disabled');
      cy.get('input[type="email"]').should('have.attr', 'disabled');
      cy.get('input[type="password"]').should('have.attr', 'disabled');
    });
  });

  it('should show loading state during submission', () => {
    cy.fixture('data').then((data) => {
      // Fill form
      cy.get('input[type="email"]').type(data.users.testUser.email);
      cy.get('input[type="password"]').type(data.users.testUser.password);
      
      // Submit form
      cy.get('button[type="submit"]').click();
      
      // Should show loading text or spinner
      cy.get('button[type="submit"]').should('contain.text', 'Entrando');
    });
  });

  it('should be keyboard accessible', () => {
    // Test tab navigation
    cy.get('input[type="email"]').focus().type('{tab}');
    cy.get('input[type="password"]').should('be.focused');
    
    cy.get('input[type="password"]').type('{tab}');
    cy.get('button[type="submit"]').should('be.focused');
    
    // Test form submission with Enter key
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123').type('{enter}');
    
    // Form should submit
    cy.get('button[type="submit"]').should('be.visible');
  });
});
