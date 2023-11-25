const express = require('express');
const orderRouter = express.Router();
const { createOrder, updatedOrder, deleteOrder, getAllOrders } = require('../controller/orderController');

// Order CRUD routes
orderRouter.post('/orders', createOrder);
orderRouter.put('/orders/:id', updatedOrder);
orderRouter.delete('/orders/:id', deleteOrder);

// // Filtering routes
orderRouter.get('/orders', getAllOrders);
// orderRouter.get('/orders/filter', orderController.getFilteredOrders);

module.exports = orderRouter;
