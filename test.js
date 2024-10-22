
// //  route
// const express = require('express');
// const router = express.Router();
// const inventoryController = require('../controllers/inventoryController');

// // Route to get specific vehicle details
// router.get('/vehicles/:id', inventoryController.getVehicleDetails);

// module.exports = router;

// const inventoryModel = require('../models/inventoryModel');


// //  controller
// exports.getVehicleDetails = async (req, res) => {
//     const vehicleId = req.params.id;
//     try {
//         const vehicle = await inventoryModel.getVehicleById(vehicleId);
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

// //  model
// const vehicles = [
//     { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 24000, mileage: 15000, imageUrl: 'fullsize.jpg', description: 'A reliable sedan.' },
//     { id: 2, make: 'Honda', model: 'Accord', year: 2021, price: 26000, mileage: 12000, imageUrl: 'fullsize.jpg', description: 'A spacious sedan.' },
//     // Add more vehicles as needed
// ];

// exports.getVehicleById = (id) => {
//     return vehicles.find(vehicle => vehicle.id === parseInt(id));
// };

// //  utilities
// exports.wrapVehicleInHtml = (vehicle) => {
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${vehicle.make} ${vehicle.model}</title>
//         <link rel="stylesheet" href="/path/to/your/styles.css">
//     </head>
//     <body>
//         <div class="vehicle-detail">
//             <div class="vehicle-image">
//                 <img src="${vehicle.imageUrl}" alt="${vehicle.make} ${vehicle.model}">
//             </div>
//             <div class="vehicle-info">
//                 <h1>${vehicle.make} ${vehicle.model}</h1>
//                 <p><strong>Year:</strong> ${vehicle.year}</p>
//                 <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
//                 <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
//                 <p><strong>Description:</strong> ${vehicle.description}</p>
//             </div>
//         </div>
//     </body>
//     </html>
//     `;
// };

// //  styles
// .vehicle-detail {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     padding: 20px;
// }

// .vehicle-image img {
//     max-width: 100%;
//     height: auto;
// }

// .vehicle-info {
//     margin-left: 20px;
// }

// @media (max-width: 768px) {
//     .vehicle-detail {
//         flex-direction: column;
//     }
// }