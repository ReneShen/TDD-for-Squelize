const {Sequelize, DataTypes, Model} = require("sequelize");

const db = new Sequelize({
    dialect:"sqlite",
    storage:"./inventory.sqlite",
    logging: false
})

module.exports = {db, DataTypes, Model};