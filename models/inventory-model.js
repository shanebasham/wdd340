const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

// get data from pool based on the inventory id?
async function getDataByInventoryId(inv_id) {
  try {
    const query = 'SELECT * FROM inventory i JOIN classification c ON i.classification_id = c.classification_id WHERE inv_id = $1';
    const data = await pool.query(query, [inv_id]) 
    return data.rows
  } catch (error) {
    console.error("getinventorybyid error " + error)
    throw error
  }
}

module.exports = {getClassifications, getInventoryByClassificationId, getDataByInventoryId};