# MiWi - Frontend
#### Midwifery Application Prototype
This project is designed as a prototype for a midwifery application. The project is used by the developer to demonstrate and expand on his knowledge/use of React, TypeScript, GraphQL, Firebase, Material-UI and testing using Cypress.io and Jest/React Testing Library.

### Contributors
- Lucas Merchant - Software Developer: [github profile](https://github.com/lbmerchant93)
- Jennifer O'Briant - App Concept Creator

### Stack

**Build**: React, TypeScript, GraphQL, GraphQL-Request, Firebase, Material-UI, Styled Components, React Circular Progressbar

**Testing**: Cypress.js, Jest/React Testing Library

**Deployment**: Vercel

## Table of Contents
1. [Introduction](#introduction)
2. [App Features](#app-features)

## Introduction
Currently the app's main feature is a journal that guides you through the daily activities that will have you ready to rock your birth.  

To visit, click the link below!
- [https://miwi-frontend.vercel.app/](https://miwi-frontend.vercel.app/)

---

## App Features

The features mentioned below are defined for their intended application use and for any clarity on how the app works.

### Login: 
*There is a Guest Account button to demonstrate login and there for experimental use.*

If you already have an account with us, you can login through the Login Form if you created your account by registering with us originally or you can Sign In With Google if you created your account by signing in with your google account originally. Once you have logged in, you will be directed to today's journal entry.

### Pagination: 
Your Journal page will display the 15 most recent journal entries you have created. If you have more than 15 entries, you can view older journal entries by clicking the next button at the bottom of the Journal page. The back button will return you to more recent entries.

### Profile Page: 
The Profile tab you will direct you to your Profile page. Once your information is retrieved from the backend, you will first see your personal information including your Display Name, Expected Due Date, and Location. Below that is a section containing your goals for Water Intake, Protein Intake, Exercise, Kegels, and Garland Pose. These goals are assigned with default suggested values upon creating an account. You may update your profile by clicking on your personal information or a specific goal. When your updates have been successfully stored, a green success message will appear and you will be redirected back to your profile which will include your newly updated information. At the bottom of your profile, there is an option to delete your account. This can be done by clicking the Delete Account button and following the prompts. (Note: this action is irreversible.)

### Journal Entry: 
To update a journal entry, you need to select the section you're wanting to update which will open a modal for you to perform your input. You can submit your updates by clicking the Update button. If you wish to delete a journal entry, click the Delete Entry at the bottom of the journal entry page. (Note: Deleting a journal entry is irreversible.)

### Footer Content
Included in the footer are links to an About Us and How MiWi Works. These links provide some information on the developer that made the app, the app work flow for its features, and definitions for commonly used terms.

### Mobile Friendly Responsive Design

Currently working to make the application completely responsive for mobile, tablet and large screens. This will be achieved through the use of the useMediaQuery feature from Material-UI and Styled Components

[Back to Top of Page](#table-of-contents)
