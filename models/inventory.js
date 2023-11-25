const { sequelize, DataTypes } = require('../config/db');
const { Location } = require('./location');
// Define Inventory model
const Inventory = sequelize.define('inventory', {
    inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});


Inventory.belongsTo(Location,
    { foreignKey: 'location_id' }
);
// Inventory.sync({ alter: true })
module.exports = { Inventory };