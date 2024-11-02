const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}


/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by inventory id
 * ************************** */
invCont.getVehicleDetails = async function (req, res, next) {
    const inv_id = req.params.inv_id
    const data = await invModel.getDataByInventoryId(inv_id)
    const grid = await utilities.buildDetailedView(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  }

/* ***************************
 *  Build inventory management
 * ************************** */
invCont.inventoryManagement  = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Inventory Management",
        nav,
      })
}

/* ***************************
 *  Build new classification 
 * ************************** */
invCont.buildAddNewClassification  = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Inventory Management",
        nav,
      })
}

/* ***************************
 *  Build new inventory 
 * ************************** */
invCont.buildAddNewInventory  = async function (req, res, next) {
    let nav = await utilities.getNav()
    let classification_list = await utilities.buildClassificationList()
    res.render("./inventory/add-inventory", {
        title: "Inventory Management",
        nav,
        classification_list,
      })
}

/* ***************************
 *  Insert classification into database
 * ************************** */
invCont.addNewClassification = async (req, res) => {
    const classification_name = req.body.classification_name;
    try {
        const result = await invModel.insertClassification(classificationName);
        req.flash('message', 'Classification added successfully!');
        // update the navigation bar here
        return res.redirect('/management'); // redirect to management view
    } catch (error) {
        req.flash('errors', [error.message]);
        return res.redirect('/classifications/add');
    }
};

/* ***************************
 *  Insert inventory into database
 * ************************** */
invCont.addNewInventory = async (req, res) => {
    const {inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id} = req.body;
    try {
        const result = await invModel.insertInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id);
        req.flash('message', 'Vehicle added successfully!');
        // update the navigation bar here
        return res.redirect('/management'); // redirect to management view
    } catch (error) {
        req.flash('errors', [error.message]);
        let nav = await utilities.getNav()
        return res.render('./inventory/add-inventory', {title:"Add Inventory", nav, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_color, inv_miles, classification_id});
    }
};
  

module.exports = invCont