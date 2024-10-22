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
 *  Build inventory by inventory id?
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
// exports.getVehicleDetails = async (req, res) => {
//     const vehicleId = req.params.id;
//     try {
//         const vehicle = await inventoryModel.getDataByInventoryId(vehicleId);
//         if (vehicle) {
//             const vehicleHtml = wrapVehicleInHtml(vehicle);
//             res.send(vehicleHtml);
//         } else {
//             res.status(404).send('Vehicle not found');
//         }
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// };

module.exports = invCont