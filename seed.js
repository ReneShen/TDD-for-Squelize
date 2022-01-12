const { db } = require("./db");
const { Restaurant } = require("./Models/Restaurant");
const { Menu } = require("./Models/Menu");
const {MenuItem} = require("./Models/Menu_item")

// Create association
Menu.hasMany(MenuItem);
MenuItem.belongsTo(Menu)

module.exports = {Menu,MenuItem}