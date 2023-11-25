const express = require('express');
const locationRouter = express.Router();
const { createLocation, getFilteredLocations, updateLocation, deleteLocation, getAllLocations } = require('../controller/locationController');

// Location CRUD routes
locationRouter.post('/location', createLocation);
locationRouter.put('/location/:id', updateLocation);
locationRouter.delete('/location/:id', deleteLocation);

// // Filtering routes
locationRouter.get('/location', getAllLocations);
locationRouter.get('/location/filter', getFilteredLocations);

module.exports = locationRouter;
