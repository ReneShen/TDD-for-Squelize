const { db, DataTypes, Model } = require("../db.js");

class MenuItem extends Model {}

MenuItem.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    calories: DataTypes.NUMBER,
  },
  {
    sequelize: db,
  }
);

module.exports = { MenuItem };
