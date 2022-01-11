const{db, DataTypes, Model} = require("../db.js");

class MemuItems extends Model{};

MemuItems.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    calories: DataTypes.NUMBER
},{
    sequelize: db
});

module.exports= {MemuItems};