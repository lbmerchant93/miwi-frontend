describe('Landing page / baseUrl', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Displays the AppBar.', () => {
        cy.get('[data-cy="AppBar"]').should('be.visible');
    });

    it('Displays a welcome message to the user and the app description.', () => {
      cy.get('[data-cy="welcome-message"]').contains('Welcome to MiWi!');
      cy.get('[data-cy="app-description"]').contains('*Your personal Midwifery App*');
    });
});