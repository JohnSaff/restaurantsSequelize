const {Sequelize, Model, DataTypes} = require("sequelize")
const sequelize = new Sequelize('sqlite::memory:')

class Restaurant extends Model{}

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
},{sequelize:sequelize,modelName:'restaurants'})

class Menu extends Model {}
Menu.init({
    title: DataTypes.STRING

},{sequelize})

class Item extends Model{}
Item.init({
    item: DataTypes.STRING,
    price: DataTypes.FLOAT
},{sequelize})


Restaurant.hasMany(Menu)
Menu.belongsTo(Restaurant)
Item.belongsTo(Menu)
Menu.hasMany(Item)


module.exports = {
    Restaurant,
    Menu,
    Item,
    sequelize
}
