const{db, DataTypes, Model} = require("../db.js");

class Restaurant extends Model{};

Restaurant.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
},{
    sequelize: db
});

module.exports= {Restaurant};