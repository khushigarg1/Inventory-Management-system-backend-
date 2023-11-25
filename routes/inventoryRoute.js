const express = require('express');
const inventoryRouter = express.Router();
const { createInventory, updateInventory, deleteInventory, getAllInventory, getFilteredInventory } = require('../controller/inventoryController');

// Inventory CRUD routes
inventoryRouter.post('/inventory', createInventory);
inventoryRouter.put('/inventory/:id', updateInventory);
inventoryRouter.delete('/inventory/:id', deleteInventory);

// // Transfer order route
// inventoryRouter.post('/inventory/transfer', inventoryController.transferInventory);

// // Filtering routes
inventoryRouter.get('/inventory', getAllInventory);
inventoryRouter.get('/inventory/filter', getFilteredInventory);

module.exports = inventoryRouter;
