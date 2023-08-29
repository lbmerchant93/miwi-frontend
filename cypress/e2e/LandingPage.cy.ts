describe('Landing page / baseUrl', () => {
    it('Visits baseUrl, which contains a welcome message to the user and the app description.', () => {
      cy.visit('/');
      cy.get('[data-cy="welcome-message"]').contains('Welcome to MiWi!');
      cy.get('[data-cy="app-description"]').contains('*Your personal Midwifery App*');
    });
});