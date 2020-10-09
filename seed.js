const { Restaurant, Menu, Item, Rating, sequelize } = require('./models')
const { restart } = require('nodemon')
const data = [
    {
        "name": "Bayroot",
        "image": "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/England/Brighton/brighton-restaurants-hotel-du-vin-bistro.jpg",
        "menus": [
            {
                "title": "Grill",
                "items": [
                    {
                        "name": "Houmous Shawarma Lamb",
                        "price": 6.50
                    },
                    {
                        "name": "Lamb Parcels",
                        "price": 5.70
                    },
                    {
                        "name": "Meat Balls (Kebbeh)",
                        "price": 6.50
                    },
                    {
                        "name": "Falafel (v)",
                        "price": 5.00
                    }
                ]
            },
            {
                "title": "Cold Mezza/Starters",
                "items": [
                    {
                        "name": "Houmous",
                        "price": 5.00
                    },
                    {
                        "name": "Baba Ganoush (Moutabal) (v)",
                        "price": 5.70
                    },
                    {
                        "name": "Stuffed Vine Leaves (Warak Enab)",
                        "price": 5.70
                    }
                ]
            }
        ]
    },
    {
        "name": "The Berkley",
        "image": "https://www.the-berkeley.co.uk/siteassets/restaurants--bars/the-garden-at-the-berkeley/the-garden-at-the-berkeley-teaser.jpg?w=620&h=560&scale=both&mode=crop",
        "menus": [
            {
                "title": "Afternoon tea",
                "items": [
                    {
                        "name": "Prêt-à-Portea",
                        "price": 60.00
                    },
                    {
                        "name": "High-Fashion Bakes and Biscuits",
                        "price": 70.00
                    }
                ]
            },
            {
                "title": "Breakfast Menu",
                "items": [
                    {
                        "name": "Berkeley Full English",
                        "price": 24.00
                    },
                    {
                        "name": "The Berkeley Breakfast",
                        "price": 38.00
                    },
                    {
                        "name": "Crushed Avocado on Toast",
                        "price": 13.00
                    },
                    {
                        "name": "Baked Eggs Shakshuka",
                        "price": 13.00
                    },
                    {
                        "name": "American Pancakes",
                        "price": 18.00
                    },
                    {
                        "name": "Coconut Chia Seed Pudding",
                        "price": 14.00
                    }
                ]
            }
        ]
    },
    {
        "name": "Balthazar",
        "image": "https://media.timeout.com/images/105034416/1372/772/image.jpg",
        "menus": [
            {
                "title": "Express Menu",
                "items": [
                    {
                        "name": "BASKET OF SOURDOUGH PARISIENNE BAGUETTE",
                        "price": 4.00
                    },
                    {
                        "name": "ROQUEFORT SALAD",
                        "price": 8.75
                    },
                    {
                        "name": "DUCK LIVER PARFAIT",
                        "price": 9.50
                    },
                    {
                        "name": "BUFFALO MOZZARELLA",
                        "price": 9.75
                    },
                    {
                        "name": "TUNA TARTARE",
                        "price": 11.50
                    },
                    {
                        "name": "BABY GEM SALAD ",
                        "price": 8.75
                    }
                ]
            },
            {
                "title": "Desserts",
                "items": [
                    {
                        "name": "Apple Tarte Fine",
                        "price": 9.00
                    },
                    {
                        "name": "Chocolate Profiteroles",
                        "price": 8.50
                    },
                    {
                        "name": "Mousse au Chocolat",
                        "price": 8.00
                    },
                    {
                        "name": "Crème Brûlée",
                        "price": 8.00
                    },
                    {
                        "name": "Raspberry Soufflé",
                        "price": 9.00
                    },
                    {
                        "name": "Sundae",
                        "price": 8.00
                    },
                    {
                        "name": "Le Colonel",
                        "price": 8.00
                    }
                ]
            },
            {
                "title": "A La Carte",
                "items": [
                    {
                        "name": "OYSTERS",
                        "price": 17.00
                    },
                    {
                        "name": "CHAMPAGNE & OYSTERS",
                        "price": 22.50
                    },
                    {
                        "name": "LOBSTER",
                        "price": 40.00
                    },
                    {
                        "name": "CAVIAR 30GM",
                        "price": 80.00
                    }
                ]
            }
        ]
    },
    {
        "name": "Berners Tavern",
        "image": "https://media.timeout.com/images/103495239/1372/772/image.jpg",
        "ratings": [{"ratings":5,}],
        "menus": [
            {
                "title": "Takeaway Menu",
                "items": [
                    {
                        "name": "Margherita pizza",
                        "price": 10.0
                    },
                    {
                        "name": "Pepperoni pizza",
                        "price": 10.0
                    },
                    {
                        "name": "Fungi pizza",
                        "price": 10.0
                    },
                    {
                        "name": "Hawaiian pizza",
                        "price": 10.0
                    },
                    {
                        "name": "Garlic bread pizza",
                        "price": 5.0
                    },
                    {
                        "name": "fish and chips ",
                        "price": 9.0
                    }
                ]
            },
            {
                "title": "Grill",
                "items": [
                    {
                        "name": "Sirloin steak",
                        "price": 16.0
                    },
                    {
                        "name": "ribeye steak",
                        "price": 18.0
                    },
                    {
                        "name": "Homemade beef burger",
                        "price": 10.95
                    },
                    {
                        "name": "Buttermilk fried chicken burger",
                        "price": 10.95
                    }
                ]
            },
            {
                "title": "Starters",
                "items": [
                    {
                        "name": "Soup of the day",
                        "price": 4.5
                    },
                    {
                        "name": "Tempura battered king prawns",
                        "price": 6.95
                    },
                    {
                        "name": "Mushrooms cooked in garlic cream sauce",
                        "price": 4.95
                    },
                    {
                        "name": "breaded wedge of brie",
                        "price": 4.95
                    }
                ]
            }
        ]
    },
    {
        "name": "Blanchette East",
        "image": "https://media.timeout.com/images/103717157/1372/772/image.jpg",
        "menus": [
            {
                "title": "Appetizers",
                "items": [
                    {
                        "name": "CHICKEN SATAY",
                        "price": 5.95
                    },
                    {
                        "name": " PO PEA GOONG ",
                        "price": 6.5
                    },
                    {
                        "name": "TALAY TORD ",
                        "price": 5.95
                    },
                    {
                        "name": "TORD MON PLA",
                        "price": 5.95
                    },
                    {
                        "name": "GAI BAI TOEY",
                        "price": 5.95
                    },
                    {
                        "name": "VEGETARIAN SATAY (V) ",
                        "price": 4.95
                    }
                ]
            },
            {
                "title": "Soup",
                "items": [
                    {
                        "name": "POA TAK",
                        "price": 6.5
                    },
                    {
                        "name": "TOM YUM",
                        "price": 5.95
                    },
                    {
                        "name": "TOM KHAR",
                        "price": 5.95
                    }
                ]
            },
            {
                "title": "Mains",
                "items": [
                    {
                        "name": "GAI PAD MED MA-MUANG HIM MA PARN ",
                        "price": 8.95
                    },
                    {
                        "name": " GAI PRIEW WARN",
                        "price": 8.95
                    },
                    {
                        "name": "MGAI PAD KHAO PODE ON",
                        "price": 8.95
                    },
                    {
                        "name": "NUA ROUL DANG ",
                        "price": 9.5
                    },
                    {
                        "name": "NUA PAD PRIK ",
                        "price": 9.5
                    },
                    {
                        "name": "KUNG PRIEW WARN",
                        "price": 10.5
                    },
                    {
                        "name": "PLA GIAN",
                        "price": 10.5
                    }
                ]
            }
        ]
    },
    {
        "name": "Bob Bob Ricard",
        "image": "https://media.timeout.com/images/103717078/1372/772/image.jpg"
    },
    {
        "name": "Cafe Monico",
        "image": "https://media.timeout.com/images/103720815/1372/772/image.jpg"
    },
    {
        "name": "Impact crator",
        "image": "https://media.timeout.com/images/103813580/1372/772/image.jpg"
    }
]


sequelize.sync().then(async () => {
    const taskQueue = data.map(async (_restaurant) => {
            const restaurant = await Restaurant.create({name: _restaurant.name, image: _restaurant.image})
            const menus = await Promise.all(_restaurant.menus.map(async (_menu) => {
                const items = await Promise.all(_menu.items.map(({name, price}) => Item.create({name, price})))
                const menu = await Menu.create({title: _menu.title})
                return menu.setItems(items)
            }))

            //const ratings = await Promise.all(_restaurant.ratings.map(({ratings}) => Rating.create({ratings})))
            //await restaurant.setRatings(ratings)
            return await restaurant.setMenus(menus)
        })
    await Promise.all(taskQueue).then(restaurants => {
        console.log(JSON.stringify(restaurants, null, 2))
    }).catch(console.error)
})

// async ()=>{
//     console.log('assigning rating')
//     const rating = await Rating.create({rating:5})
//     const restaurant = await Restaurant.findByPk(1)
//     return restaurant.setRatings(rating)
// }
