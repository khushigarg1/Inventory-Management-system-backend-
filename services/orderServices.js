const { Op } = require('sequelize');
const { stat } = require("fs");
const {
    Inventory,
    Location,
    Order
} = require("../models/index");
const { log } = require("console");
const { ApiBadRequestError } = require('../errors');

class OrderServices {
    async createOrder(date,
        status,
        selling_price,
        inventory_id,
        from_location_id,
        to_location_id,) {
        const inventory = await Inventory.findByPk(inventory_id);

        const fromLocation = await Location.findOne({ where: { location_id: from_location_id } });
        const toLocation = await Location.findOne({ where: { location_id: to_location_id } });

        if (!inventory || !fromLocation || !toLocation) {
            // return ({ message: 'Inventory or location not found' });
            throw new ApiBadRequestError("Inventory or location not found");

        }

        // Create the order
        const order = await Order.create({
            date: date,
            status: status,
            selling_price: selling_price,
            inventory_id: inventory_id,
            from_location_id: fromLocation.location_id,
            to_location_id: toLocation.location_id
        });

        return order;
    }
    async updateOrder(date,
        status,
        selling_price,
        inventory_id,
        from_location_id,
        to_location_id, orderidd) {
        const updatedOrders = await Order.update(
            {
                date,
                status,
                selling_price,
                inventory_id,
                from_location_id,
                to_location_id,
            },
            {
                where: { order_id: orderidd }
            }
        );
        if (updatedOrders[0] === 0) {
            throw new Error('order not found or could not be updated');
        }
        const updatedItem = await Order.findByPk(orderidd);
        return updatedItem;
    }
    async deleteOrder(orderid) {
        try {
            const deletedCount = await Order.destroy({ where: { order_id: orderid } });

            if (deletedCount === 0) {
                throw new Error('order not found or could not be deleted');
            }

            return { message: 'order deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
    async getAllorders() {
        try {
            const allLocations = await Order.findAll();
            return allLocations;
        } catch (error) {
            throw error;
        }
    }
    async getFilteredorders({ startDate, endDate, minPrice, maxPrice }) {
        const filter = {};
        console.log(startDate, endDate);
        if (startDate && endDate) {
            filter.date = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }
        if (minPrice && maxPrice) {
            filter.selling_price = {
                [Op.between]: [+minPrice, +maxPrice],
            };
        }

        // Fetch orders using the applied filters
        const orders = await Order.findAll({ where: filter });

        return orders;
    }
}
module.exports = new OrderServices();