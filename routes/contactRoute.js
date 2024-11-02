const express = require('express');
const router = new express.Router();
const contactController = require("../controllers/contactController");
const utilities = require("../utilities/")

// Route to build contact us view
router.get("/contact-us", utilities.handleErrors(contactController.buildContact))


// Route to post and process the contact message
router.post(
    "/contact-us",
    utilities.handleErrors(contactController.postMessage)
  )

module.exports = router;

