const {Sequelize, Model, DataTypes} = require("sequelize")
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory:', null, null, {dialect: 'sqlite'})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})


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
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
},{sequelize})

class Rating extends Model{}
Rating.init({
    rating:DataTypes.INTEGER
},{sequelize})

Restaurant.hasMany(Menu,{as: 'menus'})
Menu.belongsTo(Restaurant)
Item.belongsTo(Menu)
Menu.hasMany(Item,{as: 'items'})
Restaurant.hasMany(Rating)
Rating.belongsTo(Restaurant)

module.exports = {
    Restaurant,
    Menu,
    Item,
    Rating,
    sequelize
}
