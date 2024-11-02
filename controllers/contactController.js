const utilities = require("../utilities/")
const contactModel = require("../models/contact-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver contact view
* *************************************** */
async function buildContact(req, res, next) {
    let nav = await utilities.getNav()
    res.render("contact/contact-us", {
      title: "Send us a Message!",
      nav,
      errors: null,
    })
  }

  /* ****************************************
*  Process Message
* *************************************** */
async function postMessage(req, res) {
    let nav = await utilities.getNav()
    const { contact_email, contact_message } = req.body
    const messageResult = await contactModel.postMessage(
        contact_email,
        contact_message
      )
    if (messageResult) {
      req.flash(
        "notice",
        `Your email was successfully sent!`
      )
      res.render("index", {title: "Home", nav})
    } else {
      req.flash("notice", "Sorry, the message failed to send, try again!")
    }
  }

  
  module.exports = { buildContact, postMessage }
