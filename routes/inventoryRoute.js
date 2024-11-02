// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to invcontroller to get vehicle details by ID
router.get('/detail/:inv_id', invController.getVehicleDetails);

// Route to inventory management
router.get('/', invController.inventoryManagement);

router.get('/add-classification', invController.buildAddNewClassification)

router.get('/add-inventory', invController.buildAddNewInventory)

// Route to handle form submission?
router.post('/add-classification', invController.addNewClassification);

// Post data and render result?
router.post('/add-inventory', invController.addNewInventory);


module.exports = router;