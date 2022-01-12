const { db } = require("./db");
const { Restaurant } = require("./Models/Restaurant");
const { Menu } = require("./seed");
const {MenuItem} = require("./seed")

describe("Restaurants, menus, and menu items database", () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  test("Restaurant has a name, type, location, and happyhour", async () => {
    const restaurant1 = await Restaurant.create({
      name: "Cafe Mei",
      type:"Taiwanese Breakfast Place",
      location: "Taiwan",
      happyHour: false
    });

    expect(restaurant1.name).toBe("Cafe Mei");
    expect(restaurant1.type).toBe("Taiwanese Breakfast Place")
    expect(restaurant1.location).toBe("Taiwan");
    expect(restaurant1.happyHour).toBeFalsy;
  });

  test("Menu has a type", async()=>{
    const testMenu = await Menu.create({
        type:"Breakfast"
    })
    expect(testMenu.type).toBe("Breakfast")
  })
  
  test("Menu item has a name, description, price, and seasonal", async()=>{
    const testMenuItem = await MenuItem.create({
        name:"Pork burger",
        price:7.50,
        description:"Includes pork patty, onion, tomato, and cucumber.",
        seasonal:false
    })

    expect(testMenuItem.name).toBe("Pork burger")
    expect(testMenuItem.description).toBe("Includes pork patty, onion, tomato, and cucumber.")
    // expect(testMenuItem.calories).toBe(1000)
    expect(testMenuItem.price).toBe(7.50)
    expect(testMenuItem.seasonal).toBeFalsy
  })

  //Testing association:
  test("A menu has many menu items", async()=>{
    const testMenu = await Menu.create({
        type:"Breakfast"
    })
    const testMenuItem1 = await MenuItem.create({
        name:"Pork burger",
        price:7.50,
        description:"Includes pork patty, onion, tomato, and cucumber.",
        seasonal:false
    })
    const testMenuItem2 = await MenuItem.create({
        name:"Cheese pancake",
        price:6.50,
        seasonal:false
    })
    const testMenuItem3 = await MenuItem.create({
        name:"Toasted signature pork sandwich",
        price:9.00,
        description:"Includes pork, ham, egg, onion, tomato, and cucumber.",
        seasonal:false
    })

    await testMenu.addMenuItem(testMenuItem1)
    await testMenu.addMenuItem(testMenuItem2)
    await testMenu.addMenuItem(testMenuItem3)

    const menuItems = await testMenu.getMenuItems();
    console.log("menu items:",menuItems)

    expect(menuItems.length).toBe(3)
  })

});
