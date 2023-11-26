const { Op } = require('sequelize')
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
            const filterOptions = {
                where: {}
            };

            if (state) {
                filterOptions.where.state = {
                    [Op.substring]: state
                };
            }
            if (city) {
                filterOptions.where.city = {
                    [Op.substring]: city
                };
            }
            const filteredData = await Location.findAll({
                where: filterOptions.where
            });
            // const filterOptions = {
            //     where: {}
            // };
            // if (state) {
            //     filterOptions.where.state = state;
            // }
            // if (city) {
            //     filterOptions.where.city = city;
            // }
            // const filtereddata = await Location.findAll({
            //     where: filterOptions.where
            // });

            return filteredData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LocationServices();