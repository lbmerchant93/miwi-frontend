/* eslint-disable no-undef */
import { hasOperationName, aliasQuery, aliasMutation } from '../utils/graphql-test-utils';

Cypress.Commands.add('login', () => {
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

    cy.get('header .login-button button').click()
    cy.get('.login-form #Email').eq(0).type('guest@guest.com')
    cy.get('.login-form #Password').eq(0).type('guestviewer')
    cy.get('.login-form-button button').click()
    
})

Cypress.Commands.add('logout', () => {
    cy.get('#menu-button').click()
    cy.get('.logout-link').click()
})