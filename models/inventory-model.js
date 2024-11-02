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

// insert classification into database
async function insertClassification(classification_name) {
    try {
      const query = 'INSERT INTO classifications (name) VALUES ($1)';
      pool.query(query, [classification_name], (results) => {resolve(results);})
    } catch (error) {
      console.error("addnewclassification error " + error)
      throw error
    }
};

// insert inventory into database
async function insertInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id) {
  try {
    const query = 'INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    pool.query(query, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id], (results) => {resolve(results);})
  } catch (error) {
    console.error("addnewinventory error " + error)
    throw error
  }
};

module.exports = {getClassifications, getInventoryByClassificationId, getDataByInventoryId, insertClassification, insertInventory};