/// <reference types="cypress" />

describe('AppFooter', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should have a links for About Us and How it works', () => {
    cy.get('footer a').should('have.length', 2)
    cy.get('footer a').eq(0).contains('About Us').should('be.visible')
    cy.get('footer a').eq(1).contains('How MiWi Works').should('be.visible')
  })

  it('Should navigate to the About Us page on About Us link click', () => {
    cy.get('footer a').eq(0).click()
    cy.url().should('equal', 'http://localhost:3000/about')
  })

  it('Should navigate to the How MiWi Works page on How MiWi Works link click', () => {
    cy.get('footer a').eq(1).click()
    cy.url().should('equal', 'http://localhost:3000/how_miwi_works')
  })
})