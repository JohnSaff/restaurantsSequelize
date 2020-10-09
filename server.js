const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { response } = require('express')
const app = express()
const {Restaurant,Menu,Item, Rating,sequelize} = require("./models")
const { restart } = require('nodemon')

const handlebars = expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

//--------Setting up the server-----------
const name = {first:"john",last:'safrany'}
app.use(express.static('public'))
app.engine('handlebars', handlebars)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//-------------about page---------------

app.get('/', (request, response) => {
    response.render('home', {date: new Date()})
})
app.get('/about/',(request,response) =>{
    response.render('about',{date: new Date,name,place:"wolverhampton"})
})

//---rendering /restaurants page from restaurants view, giving it the restaurants in the db---

app.get('/restaurants',async (req,res) =>{
    const restaurants = await Restaurant.findAll({
        include: [{model:Menu, as: 'menus'}],
        nest : true
    })
    const restaurantsRatings = await Restaurant.findAll({
        group:['restaurants.id'],
        include: [{model:Menu, as: 'menus'},{model:Rating}],
        attributes:[
            "name",
            [sequelize.fn('AVG',sequelize.col('rating')),'averageRating'],
        ],
        nest : true
    })
    console.log(restaurantsRatings)
    console.log(restaurants)
    res.render('restaurants',{restaurants,restaurantsRatings})
})

//----rendering each individual restaurant page from restaurant view, now with an average rating

app.get('/restaurants/:id', async (req,res) =>{
    const restaurant = await Restaurant.findByPk(req.params.id)
    const ratings = await restaurant.getRatings()

    let i =0
    let totalRating = 0
    for (i=0;i<ratings.length;i++){
         totalRating = totalRating + ratings[i].rating
    }
    let aveRating = 0
    if (totalRating === 0){
        aveRating = 0
        console.log(aveRating)
    }else{
        aveRating = totalRating/ratings.length
        aveRating = aveRating.toPrecision(2);
        console.log(aveRating)
    }
    const menus = await restaurant.getMenus({
        include:['items'],
        nest:true
    })
    res.render('restaurant',{restaurant,menus, aveRating})
})

//=========CREATING==============

//---creating menu and items---

app.post('/restaurants/:id', async(req,res)=>{
    console.log(req.body)
    if(req.body.method ==="addMenu"){
        await Menu.create({title:req.body.name,restaurantId:req.body.restaurantID})
        res.redirect(`/restaurants/${req.body.restaurantID}`)
    }else if(req.body.method === "addItem"){
        await Item.create({name:req.body.name,MenuId:req.body.menuID,price:req.body.price})
        res.redirect(`/restaurants/${req.body.restaurantID}`)
    }
    else{
        await Rating.create({rating:req.body.rating,restaurantId:req.params.id})
        res.redirect(`/restaurants/${req.params.id}`)
    }
})


//---creating restaurant----

app.post('/restaurants', async (req, res) => {
    console.log(req.body) // {name: "Pandas Lunchbox Garden", image: "https://pandas.org/pack-shot.jpg"}
    await Restaurant.create({name:req.body.name,image:req.body.image})
    res.redirect('/restaurants')
})

//==============DELETING================

//--------deleting restaurant-----------

app.get('/restaurants/:id/delete',(req,res)=>{
    Restaurant.findByPk(req.params.id)
    .then(restaurant=>{
        restaurant.destroy()
        res.redirect('/restaurants')
    })
})

//--------deleting menu-----------

app.get('/restaurants/:restaurantid/menus/:menuid/delete', async (req,res)=>{
    Menu.findByPk(req.params.menuid).then(menu=>{
        menu.destroy()
        res.redirect(`/restaurants/${req.params.restaurantid}`)
    })
})

//--------deleting item-----------

app.get('/restaurants/:restaurantid/menus/:menuid/items/:itemid/delete', async (req,res)=>{
    Item.findByPk(req.params.itemid).then(item=>{
        item.destroy()
        res.redirect(`/restaurants/${req.params.restaurantid}`)
    })
})

//-------deleting ratings--------
app.get('/restaurants/:id/rate/:rateid/delete',async (req,res) =>{
    Rating.findByPk(req.params.rateid).then(rating=>{
        rating.destroy()
        res.redirect(`/restaurants/${req.params.id}/rate/edit`)
    })
})


//==============EDITING================

//--------rendering edit pages-----------

//restaurant
app.get('/restaurants/:id/edit', async (req,res)=>{
    const restaurant = await Restaurant.findByPk(req.params.id)
    res.render('editRestaurant',{restaurant})
})

//menu
app.get('/restaurants/:restaurantid/menus/:menuid/edit', async (req,res)=>{
    const menu = await Menu.findByPk(req.params.menuid)
    const restaurant = await Restaurant.findByPk(req.params.restaurantid)
    res.render('editMenu',{restaurant, menu})
})

//item
app.get('/restaurants/:restaurantid/menus/:menuid/items/:itemid/edit', async (req,res)=>{
    const item = await Item.findByPk(req.params.itemid)
    const menu = await Menu.findByPk(req.params.menuid)
    const restaurant = await Restaurant.findByPk(req.params.restaurantid)
    res.render('editItem',{item,restaurant, menu})
})

//rating
app.get('/restaurants/:restaurantid/rate/edit',async (req,res)=>{
    const restaurant = await Restaurant.findByPk(req.params.restaurantid)
    const ratings = await restaurant.getRatings()
    res.render('editRatings',{restaurant,ratings})
})

//--------commiting edits to the db and returning to restaurant page----

//menu
app.post('/restaurants/:restaurantid/menus/:menuid/edit', async (req,res)=>{
    const menu = await Menu.findByPk(req.params.menuid)
    await menu.update({title:req.body.name})
    res.redirect(`/restaurants/${req.params.restaurantid}`)
})

//item
app.post('/restaurants/:restaurantid/menus/:menuid/items/:itemid/edit', async (req,res)=>{
    const item = await Item.findByPk(req.params.itemid)
    await item.update({name:req.body.name,price:req.body.price})
    res.redirect(`/restaurants/${req.params.restaurantid}`)
})

//restaurant
app.post('/restaurants/:id/edit', async (req,res)=>{
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update({name:req.body.name,image:req.body.image})
    res.redirect(`/restaurants/${req.params.id}`)
})





app.listen(3000, () => console.log('web server running on port 3000'))
