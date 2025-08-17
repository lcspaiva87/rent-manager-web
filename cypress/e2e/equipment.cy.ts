/// <reference types="cypress" />

describe('Equipamentos - Busca e Filtros', () => {
  beforeEach(() => {
    cy.visit('/equipment');
    // @ts-ignore
    if (cy.waitForPageLoad) cy.waitForPageLoad();
  });

  it('exibe barra de busca e resultados iniciais', () => {
    cy.get('[data-testid="equipment-search"]').should('exist');
    cy.get('[data-testid="equipment-card"], [data-testid="equipment-row"]').should(
      'have.length.at.least',
      1
    );
  });

  it('mostra sugestões ao digitar', () => {
    cy.get('[data-testid="equipment-search"]').type('Note');
    cy.get('[data-testid="suggestions"]').should('exist');
  });

  it('aplica filtro avançado de status', () => {
    cy.get('[data-testid="advanced-toggle"]').click();
    cy.contains('Status').parent().find('[role="combobox"]').click();
    cy.contains('Manutenção').click();
    cy.get('[data-testid="results-wrapper"]')
      .find('[data-testid="equipment-card"]')
      .each(($el) => {
        cy.wrap($el).contains('Manutenção');
      });
  });

  it('alternar visualização lista', () => {
    cy.get('[data-testid="toggle-view"]').click();
    cy.get('[data-testid="results-wrapper"]')
      .find('[data-testid="equipment-row"]')
      .should('have.length.at.least', 1);
  });

  it('estado vazio oferece sugestões', () => {
    cy.get('[data-testid="equipment-search"]').type('zzzzzz');
    cy.get('[data-testid="empty-state"]').should('exist');
  });
});
