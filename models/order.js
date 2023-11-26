const { sequelize, DataTypes } = require('../config/db');
const { Inventory } = require('./inventory')
const { Location } = require('./location')

const Order = sequelize.define('order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selling_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});


Order.belongsTo(Inventory, { foreignKey: 'inventory_id' });
Order.belongsTo(Location, { foreignKey: 'from_location_id' });
Order.belongsTo(Location, { foreignKey: 'to_location_id' });
// Order.sync({ force: true })

module.exports = { Order };