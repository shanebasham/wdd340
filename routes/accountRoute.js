const express = require('express');
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.loginAccount)
  )

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to post and process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Route to build management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Route to build update view
router.get("/update", utilities.handleErrors(accountController.buildUpdate))

// Route to post and process the update data
router.post(
    "/update",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.updateAccount)
  )

// Route to logout
router.post("/management", utilities.handleErrors(accountController.logoutAccount)
)

module.exports = router;

