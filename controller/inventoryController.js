// Assume 'Inventory' model is already defined
const {
    Inventory
} = require("../models/index");
const InventoryServices = require("../services/inventoryServices");

async function createInventory(req, res, next) {
    try {
        // console.log("reqqqqqqqqqq", req);
        // console.log("reqqqqqqqqqqbopdyu", req);
        const { make, model, quantity, status, location_id } = req.body;
        const rslt = await InventoryServices.createInventoryservice(
            make, model, quantity, status, location_id
        );
        return res
            .status(201)
            .json({ message: "inventory created successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function updateInventory(req, res, next) {
    try {
        const invenid = req.params.id;
        const { make, model, quantity, sku, status, location_id } = req.body;
        const rslt = await InventoryServices.updateInventory(
            make, model, quantity, sku, status, location_id, invenid
        );
        return res
            .status(201)
            .json({ message: "inventory updated successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function deleteInventory(req, res, next) {
    try {
        const invenid = req.params.id;
        const rslt = await InventoryServices.deleteInventoryById(invenid);
        return res
            .status(201)
            .json({ message: "inventory deleted successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getAllInventory(req, res, next) {
    try {
        // const invenid = req.params.id;
        const rslt = await InventoryServices.getInventory();
        return res
            .status(201)
            .json({ message: "fetched successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getFilteredInventory(req, res, next) {
    try {
        const { make, model, location, status } = req.query;
        const filteredInventory = await InventoryServices.getFilteredInventory({
            make,
            model,
            location,
            status
        });
        return res.status(200).json(filteredInventory);
    } catch (error) {
        console.log(error);
        next(error)
    }
}



module.exports = { createInventory, updateInventory, deleteInventory, getAllInventory, getFilteredInventory };
// const inventoryController = {
//     createInventory: async (req, res, next) => {
//         try {
//             // console.log(req);
//             console.log(req.body.make);
//             const newInventory = await Inventory.create(req.body);
//             res.status(201).json(newInventory);
//         } catch (error) {
//             // res.status(500).json({ error: error.message });
//             console.log(error);
//             next(error);
//         }
//     },

//     updateInventory: async (req, res) => {
//         try {
//             const updatedInventory = await Inventory.update(req.body, {
//                 where: { id: req.params.id }
//             });
//             res.status(200).json(updatedInventory);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     deleteInventory: async (req, res) => {
//         try {
//             await Inventory.destroy({ where: { id: req.params.id } });
//             res.sendStatus(204);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     transferInventory: async (req, res) => {
//         // Implement logic for transferring inventory between locations
//         // This will involve updating the 'current_location_id' of inventory items
//         // based on the 'from_location_id' and 'to_location_id' in the request body
//         try {
//             // Example logic - Update inventory location
//             // Your logic will depend on your specific system requirements
//             // const { from_location_id, to_location_id, inventory_ids } = req.body;
//             // Implement your transfer logic here

//             res.status(200).json({ message: 'Inventory transferred successfully' });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getAllInventory: async (req, res) => {
//         try {
//             const allInventory = await Inventory.findAll();
//             res.status(200).json(allInventory);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getFilteredInventory: async (req, res) => {
//         // Implement filtering based on query parameters (make, model, location, status, etc.)
//         // Example: /inventory/filter?make=XYZ&location=123&status=Available
//         try {
//             const filteredInventory = await Inventory.findAll({ where: req.query });
//             res.status(200).json(filteredInventory);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };

// module.exports = inventoryController;
