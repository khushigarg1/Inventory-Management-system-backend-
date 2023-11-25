
const { stat } = require("fs");
const {
    Inventory,
    Location,
    Order
} = require("../models/index");
const { log } = require("console");

class OrderServices {
    async createOrder(date,
        status,
        selling_price,
        inventory_id,
        from_location_id,
        to_location_id,) {
        const inventory = await Inventory.findByPk(inventory_id);

        // Get from_location_id and to_location_id using location names
        const fromLocation = await Location.findOne({ where: { location_id: from_location_id } });
        const toLocation = await Location.findOne({ where: { location_id: to_location_id } });

        if (!inventory || !fromLocation || !toLocation) {
            return res.status(404).json({ message: 'Inventory or location not found' });
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
        const updatedItem = await Location.findByPk(orderidd);
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
}
module.exports = new OrderServices();