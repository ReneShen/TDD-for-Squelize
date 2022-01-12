// Import dependencies that will help parse my json file
const path = require("path");
const fs = require("fs").promises; // Help resolve or reject the Promises as we use sequelize methods

// Import our database
const { db } = require("./db");
const { Restaurant } = require("./Models/Restaurant");
const { Menu } = require("./Models/Menu");
const {MenuItem} = require("./Models/Menu_item")

// Define the seed function
const seed = async () =>{
    // Clear out our tables => prevents us from making duplicates
    await db.sync({force: true});

    // Find our .json file then parse the data into javascript object in order for us to access them in the future using javascript object methods.
    const seedPathRestaurants = path.join(__dirname,"restaurants.json");
    const seedPathMenus = path.join(__dirname,"menus.json");
    const seedPathMenuItems = path.join(__dirname,"menu_items.json")

    // In order to access the data:
    const bufferRestaurants = await fs.readFile(seedPathRestaurants);
    const {dataRestaurants} = JSON.parse(String(bufferRestaurants));
    
    const bufferMenus = await fs.readFile(seedPathMenus);
    const {dataMenus} = JSON.parse(String(bufferMenus));
    
    const bufferMenuItems = await fs.readFile(seedPathMenuItems);
    const {dataMenuItems} = JSON.parse(String(bufferMenuItems));

    // 1. Iterate through our array
    // 2. Sequelize method: Model.create(row);
    const restaurantPromises = dataRestaurants.map(rest => Restaurant.create(rest));
    const menuPromises = dataMenus.map(menu => Menu.create(menu));
    const menuItemPromises = dataMenuItems.map(item => MenuItem.create(item));

    // 3. Resolve or reject using .all()
   Promise.all(restaurantPromises);
   Promise.all(menuPromises);
   Promise.all(menuItemPromises);

    console.log(`All of our Games and Users have been successfully populated into our database!`)
}

// Invoke our seed function
seed();

// Create association
Menu.hasMany(MenuItem);
MenuItem.belongsTo(Menu)

module.exports = {Menu,MenuItem},seed;