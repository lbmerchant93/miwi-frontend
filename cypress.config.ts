import { defineConfig } from "cypress";
import * as serviceAccount from "./serviceAccount.json";
const admin = require("firebase-admin");
const cypressFirebasePlugin = require("cypress-firebase").plugin;


export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin, {
        credential: admin.credential.cert(serviceAccount)
      });
    },
    baseUrl: 'http://localhost:3000',
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false
  },

  component: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
