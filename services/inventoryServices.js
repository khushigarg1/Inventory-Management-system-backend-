
const {
    Inventory,
    Location
} = require("../models/index");
const { log } = require("console");

async function createUniqueSKU() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sku = '';
    for (let i = 0; i < 10; i++) {
        sku += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const existingSKU = await Inventory.findOne({ where: { sku: sku } });
    if (existingSKU) {
        return createUniqueSKU(); // SKU exists, generate a new one
    }
    return sku; // Unique SKU generated
}
class InventoryServices {
    async createInventoryservice(make, model, quantity, status, location_id) {
        const sku = await createUniqueSKU();
        const rslt = await Inventory.create({
            make: make,
            model: model,
            quantity: quantity,
            sku: sku,
            status: status,
            location_id: location_id
        })
        return rslt;
    }
    async updateInventory(make, model, quantity, sku, status, location_id, invenid) {
        const updatedInventory = await Inventory.update(
            {
                make,
                model,
                quantity,
                sku,
                status,
                location_id
            },
            {
                where: { inventory_id: invenid }
            }
        );
        if (updatedInventory[0] === 0) {
            throw new Error('Inventory item not found or could not be updated');
        }
        const updatedItem = await Inventory.findByPk(invenid);
        return updatedItem;
    }
    async deleteInventoryById(inventoryId) {
        try {
            const deletedCount = await Inventory.destroy({ where: { inventory_id: inventoryId } });

            if (deletedCount === 0) {
                throw new Error('Inventory item not found or could not be deleted');
            }

            return { message: 'Inventory item deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
    async getInventory() {
        try {
            const allInventory = await Inventory.findAll({
                include: [{
                    model: Location,
                    attributes: ['location_id', 'name', 'type', 'city', 'state']
                }]
            });
            return allInventory;
        } catch (error) {
            throw error;
        }
    }
    async getFilteredInventory({ make, model, location, status }) {
        try {
            // Prepare options for filtering
            const filterOptions = {
                where: {}
            };

            // Apply filters based on provided query parameters
            if (make) {
                filterOptions.where.make = make;
            }
            if (model) {
                filterOptions.where.model = model;
            }
            if (status) {
                filterOptions.where.status = status;
            }
            if (location) {
                // If filtering by location, retrieve the location_id based on the location name
                const locationData = await Location.findOne({ where: { name: location } });

                if (locationData) {
                    filterOptions.where.location_id = locationData.location_id;
                }
            }
            // Fetch filtered inventory
            const filteredInventory = await Inventory.findAll({
                where: filterOptions.where,
                include: [{ model: Location }] // Include Location details if needed
            });

            return filteredInventory;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new InventoryServices();