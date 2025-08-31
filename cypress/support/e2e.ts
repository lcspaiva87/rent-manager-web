// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'cypress-plugin-tab';

// Configure viewport for consistent testing
Cypress.config('viewportWidth', 1280);
Cypress.config('viewportHeight', 720);

// Global error handling
Cypress.on('uncaught:exception', (_err, _runnable) => {
  return false;
});
