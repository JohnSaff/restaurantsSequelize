const { TestScheduler } = require("jest")
const {Restaurant,Menu,Item,Rating,sequelize} = require('./models')


describe('restaurant',()=>{
    beforeAll(async ()=>{
        await sequelize.sync()
    })
    test('when a restaurant is added it is added to db',async () =>{
        const restaurant = await Restaurant.create({name:'the foo bar',image:'image.url'})
        expect(restaurant.id).toBeTruthy()
        expect(restaurant.createdAt).toBeTruthy()
    })
    test('can add menu to restaurant',async()=>{
        const restaurant = await Restaurant.create({name:'boho social', image:'ghreuijwk.url'})
        const menu = await Menu.create({title:'brunch'})
        await restaurant.addMenu(menu)
        const menus  = await restaurant.getMenus()
        //console.log(menus)
        expect(menus.length).toBe(1)
    })
    test('can add item to db',async()=>{
        const item = await Item.create({item:'neck oil',price:4.1})
        expect(item.id).toBeTruthy()
    })
    test('can add item to menu to restaurant', async()=>{
        const restaurant = await Restaurant.create({name:"presuming ed's",image:'wdkjlfn.png'})
        const menu = await Menu.create({title:"coffee"})
        const item = await Item.create({item:'flat white'})
        await restaurant.addMenu(menu)
        await menu.addItem(item)
        const menus = await restaurant.getMenus()
        const items = await menus[0].getItems()
        expect(items.length).toBe(1)


    })
    test('can add rating to restaurant',async()=>{
        const restaurant = await Restaurant.create({name:"presuming ed's",image:'wdkjlfn.png'})
        const rating = await Rating.create({rating:5})
        await restaurant.addRating(rating)
        const ratings = await restaurant.getRatings()
        expect(ratings.length).toBe(1)
    })
})
