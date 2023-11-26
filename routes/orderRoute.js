const express = require('express');
const orderRouter = express.Router();
const { createOrder, updatedOrder, deleteOrder, getAllOrders, getFilteredOrders } = require('../controller/orderController');

// Order CRUD routes
orderRouter.post('/orders', createOrder);
orderRouter.put('/orders/:id', updatedOrder);
orderRouter.delete('/orders/:id', deleteOrder);

// // Filtering routes
orderRouter.get('/orders', getAllOrders);
orderRouter.get('/orders/filter', getFilteredOrders);   //startDate, endDate, minPrice, maxPrice

module.exports = orderRouter;
