/// <reference types="cypress" />

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should successfully load page, containing an AppBar header, main content container, and an AppFooter footer.', () => {
    cy.get('header').contains('MiWi').should('be.visible')
    cy.get('main').contains('Welcome to MiWi').should('be.visible')
    cy.get('footer').contains('Support').should('be.visible')
  })

  it('Should contain welcome message and the app`s slogan.', () => {
    cy.get('h2').contains('Welcome to MiWi').should('be.visible')
    cy.get('h6').contains('*Your personal Midwifery App*').should('be.visible')
  })
})