const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function postMessage(contact_email, contact_message){
    try {
      const sql = "INSERT INTO contact (contact_email, contact_message) VALUES ($1, $2) RETURNING *"
      return await pool.query(sql, [contact_email, contact_message])
    } catch (error) {
      return error.message
    }
  }

  module.exports = {postMessage};