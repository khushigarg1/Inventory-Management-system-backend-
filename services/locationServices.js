
const { stat } = require("fs");
const {
    Inventory,
    Location
} = require("../models/index");
const { log } = require("console");

class LocationServices {
    async createLocation(name, type, city, state) {
        const rslt = await Location.create({
            name: name,
            type: type,
            city: city,
            state: state
            // current_location_id: current_location_id
        })
        return rslt;
    }
    async updatedLocation(name, type, city, state, locatid) {
        const updatedlocations = await Location.update(
            {
                name,
                type,
                city,
                state
            },
            {
                where: { location_id: locatid }
            }
        );
        if (updatedlocations[0] === 0) {
            throw new Error('location not found or could not be updated');
        }
        const updatedItem = await Location.findByPk(locatid);
        return updatedItem;
    }
    async deleteLocationbyid(locatid) {
        try {
            const deletedCount = await Location.destroy({ where: { location_id: locatid } });

            if (deletedCount === 0) {
                throw new Error('location not found or could not be deleted');
            }

            return { message: 'location deleted successfully' };
        } catch (error) {
            throw error;
        }
    }
    async getAllLocations() {
        try {
            const allLocations = await Location.findAll();
            return allLocations;
        } catch (error) {
            throw error;
        }
    }
    async getFilteredlocation({ state, city }) {
        try {
            // Prepare options for filtering
            const filterOptions = {
                where: {}
            };

            // Apply filters based on provided query parameters
            if (state) {
                filterOptions.where.state = state;
            }
            if (city) {
                filterOptions.where.city = city;
            }

            // Fetch filtered inventory
            const filtereddata = await Location.findAll({
                where: filterOptions.where
            });

            return filtereddata;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LocationServices();