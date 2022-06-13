/// <reference types="cypress" />

import { hasOperationName, aliasQuery, aliasMutation } from '../../utils/graphql-test-utils'


describe('Login Modal', () => {
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
        cy.get('header .login-button button').contains('Log In').click()
    })

    it('Should contain a login form which logs in a user with email and password.', () => {
        cy.get('.login-modal').should('be.visible')
        cy.get('.login-modal-title').contains('Welcome back!').should('be.visible')
        cy.get('.login-modal-title').contains('Please log in to access your dashboard! You can log in through your Google account or enter your email/password to access your dashboard.').should('be.visible')
        cy.get('.login-form .login-form-input').should('have.length', 2)
        cy.get('.login-form #Email').eq(0).type('guest@guest.com')
        cy.get('.login-form #Email').eq(0).should('have.attr', 'value', 'guest@guest.com')
        cy.get('.login-form #Password').eq(0).type('guestviewer')
        cy.get('.login-form #Password').eq(0).should('have.attr', 'value', 'guestviewer')
        cy.get('.login-form-button button').click()
        cy.wait('@gqlloginUserMutation').its('response.body.data.loginUser').should((loginUser) => {
          expect(loginUser.displayName).to.be.equal('Guest Viewer')
          expect(loginUser.email).to.be.equal('guest@guest.com')
          expect(loginUser.expectedDueDate).to.be.equal('2022-07-01T00:00:00.000-06:00')
        })
        cy.wait('@gqlUserQuery').its('response.body.data.user').should((user) => {
          expect(user.displayName).to.be.equal('Guest Viewer')
          expect(user.email).to.be.equal('guest@guest.com')
          expect(user.expectedDueDate).to.be.equal('2022-07-01T00:00:00.000-06:00')
        })
        cy.wait('@gqlAggregateJournalEntryQuery').its('response.body.data.aggregateJournalEntry').should((aggregateJournalEntry) => {
          expect(aggregateJournalEntry._count._all).to.be.equal(6)
        })
        cy.wait('@gqlJournalEntriesQuery').its('response.body.data.journalEntries').should((journalEntries) => {
          expect(journalEntries).to.have.lengthOf(6)
          expect(journalEntries[0].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
          expect(journalEntries[1].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
          expect(journalEntries[2].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
          expect(journalEntries[3].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
          expect(journalEntries[4].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
          expect(journalEntries[5].authorId).to.be.equal("opov7wBC6RPiEnJP6hB8iiCtPeq1")
        })
    })

    it('Should have a register button which directs the user to a create account form.', () => {
        cy.get('.login-form-container').children().eq(1).contains('Need an account?')
        cy.get('.login-form-container').children().eq(1).children().contains('Register').click()
        cy.get('.login-modal-title').contains('Create an account').should('be.visible')
        cy.get('.login-modal-title').contains('Please fill out this form so we can create a dashboard for you or register an account through your google account.').should('be.visible')
    })

    it('Should have a create account form with inputs for First Name, Last Name, Email, and Password, and a button to submit creating an account.', () => {
        cy.get('.login-form-container').children().eq(1).children().contains('Register').click()
        cy.get('.create-account-form .create-account-form-input').should('have.length', 4)
        cy.get('.create-account-form #FirstName')
        cy.get('.create-account-form #LastName')
        cy.get('.create-account-form #Email')
        cy.get('.create-account-form #Password')
        cy.get('.create-account-form').children().eq(4).contains('Create Account')
    })

    it('Should navigate the user back to the log in form if on the create account form.', () => {
        cy.get('.login-form-container').children().eq(1).children().contains('Register').click()
        cy.get('.create-account-form-container').children().eq(1).contains('Already have an account?')
        cy.get('.create-account-form-container').children().eq(1).children().contains('Log in').click()
        cy.get('.login-modal-title').contains('Welcome back!').should('be.visible')
    })
  
})