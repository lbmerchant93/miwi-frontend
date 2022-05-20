/// <reference types="cypress" />
import { hasOperationName, aliasQuery, aliasMutation } from '../utils/graphql-test-utils'

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

describe('AppBar', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:9000/graphql', (req) => {
      // Queries
      aliasQuery(req, 'User')
      aliasQuery(req, 'AggregateJournalEntry')
      aliasQuery(req, 'JournalEntries')

      // Mutations
      aliasMutation(req, 'loginUser')
      const { body } = req
      if (hasOperationName(req, 'loginUser')) {
        req.alias = 'gqlloginUserMutation'

        req.reply((res) => {
          res.body.data.loginUser.displayName = "Lucas Merch"
        })
      }
    })
    cy.visit('/')
  })

  it('Should have an app title containing MiWi that is also a navigation link to the landing page', () => {
    cy.get('header h1').contains('MiWi').should('be.visible')
    cy.get('footer a').eq(0).click()
    cy.url().should('equal', 'http://localhost:3000/about')
    cy.get('header h1').click()
    cy.url().should('equal', 'http://localhost:3000/')
  })

  it.only('Should have a login button which opens a login modal containing a login form which logs in a user with email and password.', () => {
    cy.get('header .login-button button').contains('Log In').click()
    cy.get('.login-modal').should('be.visible')
    cy.get('.login-modal-title').contains('Welcome back!').should('be.visible')
    cy.get('.login-modal-title').contains('Please log in to access your dashboard! You can log in through your Google account or enter your email/password to access your dashboard.').should('be.visible')
    cy.get('.login-form .login-form-input').should('have.length', 2)
    cy.get('.login-form #Email').eq(0).type('guest@guest.com')
    cy.get('.login-form #Email').eq(0).should('have.attr', 'value', 'guest@guest.com')
    cy.get('.login-form #Password').eq(0).type('guestviewer')
    cy.get('.login-form #Password').eq(0).should('have.attr', 'value', 'guestviewer')
    cy.get('.login-form-button button').click()
    cy.wait('@gqlUserQuery')
    cy.wait('@gqlloginUserMutation').its('response.body.data.loginUser').should((loginUser) => {
      // Add other response property test here
      expect(loginUser.displayName).to.be.equal('Lucas Merch')
    })
    cy.wait('@gqlAggregateJournalEntryQuery')
    cy.wait('@gqlJournalEntriesQuery')
  })
})

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