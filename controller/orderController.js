const {
    Inventory,
    Location,
    Order
} = require("../models/index");
const OrderServices = require("../services/orderServices");

async function createOrder(req, res, next) {
    try {
        const {
            date,
            status,
            selling_price,
            inventory_id,
            from_location_id,
            to_location_id,
        } = req.body;
        const rslt = await OrderServices.createOrder(
            date,
            status,
            selling_price,
            inventory_id,
            from_location_id,
            to_location_id,
        );
        return res
            .status(201)
            .json({ message: "order created successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function updatedOrder(req, res, next) {
    try {
        const orderidd = req.params.id;
        const {
            date,
            status,
            selling_price,
            inventory_id,
            from_location_id,
            to_location_id,
        } = req.body;
        const rslt = await OrderServices.updateOrder(
            date,
            status,
            selling_price,
            inventory_id,
            from_location_id,
            to_location_id,
            orderidd
        );
        return res
            .status(201)
            .json({ message: "order created successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function deleteOrder(req, res, next) {
    try {
        const orderid = req.params.id;
        const rslt = await OrderServices.deleteOrder(orderid);
        return res
            .status(201)
            .json({ message: "order deleted successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getAllOrders(req, res, next) {
    try {
        // const invenid = req.params.id;
        const rslt = await OrderServices.getAllorders();
        return res
            .status(201)
            .json({ message: "fetched successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getFilteredOrders(req, res, next) {
    try {
        const { startDate, endDate, minPrice, maxPrice } = req.query;
        // console.log(state, city);
        const filteredOrder = await OrderServices.getFilteredorders({
            startDate, endDate, minPrice, maxPrice
        });
        return res.status(200).json(filteredOrder);
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = { createOrder, updatedOrder, deleteOrder, getAllOrders, getFilteredOrders }
// const orderController = {
//     createOrder: async (req, res) => {
//         try {
//             const newOrder = await Order.create(req.body);
//             res.status(201).json(newOrder);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     updateOrder: async (req, res) => {
//         try {
//             const updatedOrder = await Order.update(req.body, {
//                 where: { id: req.params.id }
//             });
//             res.status(200).json(updatedOrder);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     deleteOrder: async (req, res) => {
//         try {
//             await Order.destroy({ where: { id: req.params.id } });
//             res.sendStatus(204);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getAllOrders: async (req, res) => {
//         try {
//             const allOrders = await Order.findAll();
//             res.status(200).json(allOrders);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getFilteredOrders: async (req, res) => {
//         // Implement filtering based on query parameters (selling price range, date of sale, etc.)
//         try {
//             const filteredOrders = await Order.findAll({ where: req.query });
//             res.status(200).json(filteredOrders);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };

// module.exports = orderController;