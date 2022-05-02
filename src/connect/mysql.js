const Sequelize = require('sequelize');
const { DATABASE } = require("../config");

const sequelize = new Sequelize(DATABASE.database, DATABASE.user, DATABASE.password, {
    ...DATABASE.options
});

module.exports = {
    sequelize: sequelize,
    Op: Sequelize.Op,
    DataTypes: Sequelize.DataTypes
}