const {
    Location
} = require("../models/index");
const LocationServices = require("../services/locationServices");

async function createLocation(req, res, next) {
    try {
        // console.log("reqqqqqqqqqq", req);
        const { name, type, city, state } = req.body;
        const rslt = await LocationServices.createLocation(
            name, type, city, state
        );
        return res
            .status(201)
            .json({ message: "location created successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function updateLocation(req, res, next) {
    try {
        const locatid = req.params.id;
        // console.log(locatid);
        // console.log(req.body);
        const { name, type, city, state } = req.body;
        const rslt = await LocationServices.updatedLocation(
            name, type, city, state, locatid
        );
        return res
            .status(201)
            .json({ message: "location updated successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function deleteLocation(req, res, next) {
    try {
        const locatid = req.params.id;
        const rslt = await LocationServices.deleteLocationbyid(locatid);
        return res
            .status(201)
            .json({ message: "location deleted successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getAllLocations(req, res, next) {
    try {
        // const invenid = req.params.id;
        const rslt = await LocationServices.getAllLocations();
        return res
            .status(201)
            .json({ message: "fetched successfully", user: rslt });
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function getFilteredLocations(req, res, next) {
    try {
        const { state, city } = req.query;
        console.log(state, city);
        const filteredLocation = await LocationServices.getFilteredlocation({
            state,
            city
        });
        return res.status(200).json(filteredLocation);
    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = { createLocation, getAllLocations, updateLocation, deleteLocation, getFilteredLocations }

// const locationController = {
//     createLocation: async (req, res) => {
//         try {
//             const newLocation = await Location.create(req.body);
//             res.status(201).json(newLocation);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     updateLocation: async (req, res) => {
//         try {
//             const updatedLocation = await Location.update(req.body, {
//                 where: { id: req.params.id }
//             });
//             res.status(200).json(updatedLocation);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     deleteLocation: async (req, res) => {
//         try {
//             await Location.destroy({ where: { id: req.params.id } });
//             res.sendStatus(204);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getAllLocations: async (req, res) => {
//         try {
//             const allLocations = await Location.findAll();
//             res.status(200).json(allLocations);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getFilteredLocations: async (req, res) => {
//         // Implement filtering based on query parameters (state, city, etc.)
//         try {
//             const filteredLocations = await Location.findAll({ where: req.query });
//             res.status(200).json(filteredLocations);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };

// module.exports = locationController;
