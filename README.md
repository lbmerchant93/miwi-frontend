# MiWi - Frontend
#### Midwifery Application Prototype
This project is designed as a prototype for a midwifery application. The project is used by the developer to demonstrate and expand on his knowledge/use of React, TypeScript, GraphQL, Firebase, and Material-UI.

### Contributors
- Lucas Merchant - Software Developer: [github profile](https://github.com/lbmerchant93)
- Jennifer O'Briant - App Concept Creator

### Stack

**Build**: React, TypeScript, GraphQL, GraphQL-Request, Firebase, Material-UI, Moment

**Testing**: Cypress.js (Currently implementing)

**Deployment**: Vercel

## Table of Contents
1. [Introduction](#introduction)
2. [Instructions](#setup-instructions)
3. [How-To](#using-miwi)
4. [Challenges & Wins](#challenges-&-wins)

## Introduction
Currently the app's main feature is a journal that guides you through the daily activities that will have you ready to rock your birth. 

## Setup Instructions
To run the project locally:
- `git clone` this repo 
- `cd` into the miwi-frontend repo
- run `npm run start` to run the React App in your browser

OR

The App has been deployed using Vercel. This way you don't have to clone it locally in order to use it! To visit, click the link below!
- [https://miwi-frontend.vercel.app/](https://miwi-frontend.vercel.app/)

### Testing
#### *Currently working on fully testing all current features, then will utilize a more Test Driven Development approach*
Cypress.js is being used to implement end-to-end-tests of the user flow. To run these tests, `cd` into the project repository and install Cypress by typing `npm i -D cypress` on the command line and adding 
```
"scripts": {
    "cypress:open": "cypress open"
  }
  ```
 to your `package.json` file if it does not already contain the command.

 Then run `npm run cypress:open`

 Cypress.js should open a window with a list of test files. Click on a file name to run the tests in that file.
 
 

[Back to Top of Page](#table-of-contents)

---

## App Features

The features mentioned below are defined for their intended application use and for any clarity on how the app works.

### Login: 
*There is a Guest Account button to demonstrate login and there for experimental use.*

If you already have an account with us, you can login through the Login Form if you created your account by registering with us originally or sign in through your google account if you created your account by signing in with your google account originally.

### Pagination: 
Your dashboard's Home page will display the 15 most recent journal entries you have created. If you have more than 15 entries, you can view older journal entries by clicking the next button at the bottom of the Home page. The back button will return you to more recent entries.

### Profile Information: 
If you click the Profile tab you will see options to add an Expected due date, Edit your account, or Delete your account. Select either the Add button next to Expected due date or the Edit button next to Edit your account in order to be direct to a form in which you can edit/update your profile. Once you’ve completed the form, click submit to submit your changes. When your updates have been successfully stored to your account, a green success message will appear and you will be redirected back to the previous profile view which will include your newly updated information.

### Delete Journal Entry: 
If you select the delete button on a journal entry card, a warning modal will pop up asking if you are sure you would like to delete the selected journal entry because this action is irreversible. If you a certain you would like to delete the entry, click the YES, I'M SURE button. Once your entry is successfully delete the warning modal will close and your dashboard will update to exclude the deleted entry. The CANCEL button will return you to your dashboard without deleting the entry.

### Update Journal Entry: 
If you select the edit button on a journal entry card, an Update Journal Entry form will pop up that looks like the Create Journal Entry form but will be repopulated with the information from the journal entry you selected. Make changes to the form and click the UPDATE button. Once your information has been successfully stored, a green success message will briefly flash to alert you of the successful changes and the form will close which will return you to your dashboard that will show your updated changes. The CANCEL button will return you to your dashboard without updating the entry.

### Footer Content
Included in the footer are links to an About Us and How MiWi Works. These links provide some information on the developer that made the app, the app work flow for its features, and definitions for commonly used terms.

### Mobile Friendly Responsive Design

Currently working to make the application completely responsive for mobile, tablet and large screens. This will be achieved through the use of the useMediaQuery feature from Material-UI.

[Back to Top of Page](#table-of-contents)

---


### Future Features
- **One:** Additional journal sections including: Fetal Love Break, Self Care, Postpartum Prep, Childbirth Education, and Nourishment. Through these the design of the journal entry's card display will likely need to change. 
- **Two:** Better design/layout. Things such as adding images, color scheming, responsive design, and skeletal loading.


[Back to Top of Page](#table-of-contents)
