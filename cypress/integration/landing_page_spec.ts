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
  
  it('Should contain sections including why to use MiWi, reminder message, and login directions.', () => {
    cy.get('.landing-page-description-container h5').should('have.length', 3)
    cy.get('.landing-page-description-container h5').eq(0).contains('Why MiWi?')
    cy.get('.landing-page-description-container h5').eq(1).contains('Remember to allow yourself grace!')
    cy.get('.landing-page-description-container h5').eq(2).contains(`Whenever you're ready`)
    cy.get('.landing-page-description-container p').should('have.length', 3)
  })
})

describe('AppFooter', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Have a links for About Us and How it works', () => {
    cy.get('footer a').should('have.length', 2)
    cy.get('footer a').eq(0).contains('About Us').should('be.visible')
    cy.get('footer a').eq(1).contains('How MiWi Works').should('be.visible')
  })

  it('Navigate to the About Us page on About Us link click', () => {
    cy.get('footer a').eq(0).click()
    cy.url().should('equal', 'http://localhost:3000/about')
  })
})