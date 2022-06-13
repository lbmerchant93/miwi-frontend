/// <reference types="cypress" />

import { hasOperationName, aliasQuery, aliasMutation } from '../../utils/graphql-test-utils'

describe('AppBar', () => {
    beforeEach(() => {
      cy.intercept('POST', 'http://localhost:9000/graphql', (req) => {
        // Queries
        aliasQuery(req, 'User')
        aliasQuery(req, 'AggregateJournalEntry')
        aliasQuery(req, 'JournalEntries')
  
        // Mutations
        aliasMutation(req, 'loginUser')
  
        if (hasOperationName(req, 'User')) {
          req.alias = 'gqlUserQuery'
  
          req.reply((res) => {
            res.body.data.user.id = "opov7wBC6RPiEnJP6hB8iiCtPeq1"
            res.body.data.user.displayName = "Guest Viewer"
            res.body.data.user.email = "guest@guest.com"
            res.body.data.user.expectedDueDate = '2022-07-01T00:00:00.000-06:00'
          })
        }
  
        if(hasOperationName(req, 'AggregateJournalEntry')) {
          req.alias = 'gqlAggregateJournalEntryQuery'
  
          req.reply((res) => {
            res.body.data.aggregateJournalEntry._count._all = 6
          })
        }
  
        if(hasOperationName(req, 'JournalEntries')) {
          req.alias = 'gqlJournalEntriesQuery'
  
          req.reply((res) => {
            res.body.data.journalEntries = [
              {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-01T00:00:00.000-06:00",
                exercise: 1,
                garlandPose: 1,
                id: 1,
                kegels: 1,
                prenatalVitamins: true,
                probiotics: true,
                proteinIntake: 1,
                waterIntake: 1
              }, {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-02T00:00:00.000-06:00",
                exercise: 2,
                garlandPose: 2,
                id: 2,
                kegels: 2,
                prenatalVitamins: false,
                probiotics: false,
                proteinIntake: 2,
                waterIntake: 2
              }, {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-03T00:00:00.000-06:00",
                exercise: 3,
                garlandPose: 3,
                id: 3,
                kegels: 3,
                prenatalVitamins: true,
                probiotics: true,
                proteinIntake: 3,
                waterIntake: 3
              }, {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-04T00:00:00.000-06:00",
                exercise: 4,
                garlandPose: 4,
                id: 4,
                kegels: 4,
                prenatalVitamins: false,
                probiotics: true,
                proteinIntake: 4,
                waterIntake: 4
              }, {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-05T00:00:00.000-06:00",
                exercise: 5,
                garlandPose: 5,
                id: 5,
                kegels: 5,
                prenatalVitamins: true,
                probiotics: false,
                proteinIntake: 5,
                waterIntake: 5
              }, {
                authorId: "opov7wBC6RPiEnJP6hB8iiCtPeq1",
                date: "2022-05-06T00:00:00.000-06:00",
                exercise: 6,
                garlandPose: 6,
                id: 6,
                kegels: 6,
                prenatalVitamins: true,
                probiotics: true,
                proteinIntake: 6,
                waterIntake: 6
              },
            ]
          })
        }
  
        if (hasOperationName(req, 'loginUser')) {
          req.alias = 'gqlloginUserMutation'
  
          req.reply((res) => {
            res.body.data.loginUser.id = "opov7wBC6RPiEnJP6hB8iiCtPeq1"
            res.body.data.loginUser.displayName = "Guest Viewer"
            res.body.data.loginUser.email = "guest@guest.com"
            res.body.data.loginUser.expectedDueDate = '2022-07-01T00:00:00.000-06:00'
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
  
    // Test for Registering navigation, don't need to click. only exist on registration spec
    // Test for require email and require password
    // Test for requires valid username and password
    // Redirects to dashboard on success
    // Error handling

    it('Should have a login button which opens a login modal.', () => {
      cy.get('header .login-button button').contains('Log In').click()
      cy.get('.login-modal').should('be.visible')
      cy.get('.login-modal-title').contains('Welcome back!').should('be.visible')
      cy.get('.login-modal-title').contains('Please log in to access your dashboard! You can log in through your Google account or enter your email/password to access your dashboard.').should('be.visible')
    })
  
    // Photo url not currently integrated into app, will have to circle back once added
    it('Should display the user\'s photo url or first initial on the app menu once the user is logged in, and menu icon.', () => {
      cy.get('header .login-button button').click()
      cy.get('.login-form #Email').eq(0).type('guest@guest.com')
      cy.get('.login-form #Password').eq(0).type('guestviewer')
      cy.get('.login-form-button button').click()
      cy.get('#menu-button div').contains('G')
      cy.get('#menu-button [data-testid=MenuIcon]').should('be.visible')
    })
  
    it('Should have two menu options, Dashboard or Log out.', () => {
      cy.get('header .login-button button').click()
      cy.get('.login-form #Email').eq(0).type('guest@guest.com')
      cy.get('.login-form #Password').eq(0).type('guestviewer')
      cy.get('.login-form-button button').click()
      cy.get('#menu-button').click()
      cy.get('#app-menu ul li').should('have.length', 2)
      cy.get('#app-menu ul li').eq(0).contains('My Dashboard').should('be.visible')
      cy.get('#app-menu ul li').eq(1).contains('Log out').should('be.visible')
    })
  
    it('Should navigate the user to the Dashboard Page once clicking the My Dashboard menu item in the app menu.', () => {
      cy.get('header .login-button button').click()
      cy.get('.login-form #Email').eq(0).type('guest@guest.com')
      cy.get('.login-form #Password').eq(0).type('guestviewer')
      cy.get('.login-form-button button').click()
      cy.get('header h1').click()
      cy.url().should('equal', 'http://localhost:3000/')
      cy.get('#menu-button').click()
      cy.get('#app-menu ul li').eq(0).click()
      cy.url().should('equal', 'http://localhost:3000/dashboard')
    })
  
    // check url is landing page
    it('Should change back to LOG IN once a user logs out.', () => {
      cy.get('header .login-button button').click()
      cy.get('.login-form #Email').eq(0).type('guest@guest.com')
      cy.get('.login-form #Password').eq(0).type('guestviewer')
      cy.get('.login-form-button button').click()
      cy.get('#menu-button').click()
      cy.get('.logout-link').click()
      cy.get('header .login-button button').contains('Log In')
    })
  })