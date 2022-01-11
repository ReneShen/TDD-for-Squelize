const{db, DataTypes, Model} = require("../db.js");

class Menu extends Model{};

Menu.init({
    type: DataTypes.ENUM("Breakfast","Brunch","Lunch","Dinner","Dessert"),
    happyHour: DataTypes.TIME
},{
    sequelize: db
});

module.exports= {Menu};