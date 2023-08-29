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

    it('Displays 3 LandingPage description sections, each with a section title and description.', () => {
        cy.get('[data-cy="LandingPage-description-section"]').should('have.length', '3');
        cy.get('[data-cy="LandingPage-description-section"]').eq(0).children('[data-cy="LandingPage-description-section-title"]').should('be.visible');
        cy.get('[data-cy="LandingPage-description-section"]').eq(1).children('[data-cy="LandingPage-description-section-title"]').should('be.visible');
        cy.get('[data-cy="LandingPage-description-section"]').eq(2).children('[data-cy="LandingPage-description-section-title"]').should('be.visible');
        cy.get('[data-cy="LandingPage-description-section"]').eq(0).children('[data-cy="LandingPage-description-section-description"]').should('be.visible');
        cy.get('[data-cy="LandingPage-description-section"]').eq(1).children('[data-cy="LandingPage-description-section-description"]').should('be.visible');
        cy.get('[data-cy="LandingPage-description-section"]').eq(2).children('[data-cy="LandingPage-description-section-description"]').should('be.visible');
    });

    it('Displays the AppFooter', () => {
        cy.get('[data-cy="AppFooter"]').should('be.visible');
    });

    it.skip('Allows a user to navigate to the AboutPage.', () => {

    });

    it.skip('Allows a user to navigate to the HowMiWiWorksPage.', () => {

    });

    it.skip('Allows a user to login and then is directed to their DashboardPage.', () => {

    });
});