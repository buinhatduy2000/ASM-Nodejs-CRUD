const express = require('express');

//bring in mongoose
const mongoose = require('mongoose');

//method-override
const methodOverride = require('method-override');

const Data = require('./models/Data');

const dataRouter = require('./routes/data');

const app = express();

//connect to mongodb
mongoose.connect('mongodb+srv://duybngch18459:123%40123a@cluster0.bdarh.mongodb.net/toysData?authSource=admin&replicaSet=atlas-mw6u7v-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//set template engine

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//route for main page

app.get('/', async (req, res) => {

    const products = [
        {
            name: 'AntiqueCavalryDagger',
            description: 'The Antique Cavalry Dagger is most likely based on an old Civil War cavalry dagger with slight Bowie knife features.',
        },
        {
            name: 'Machete',
            description: 'Americas West African arms trade isnt just about giving. Rediscover the simple life with this rusty cleaver',
        },
        {
            name: 'AssaultRifle',
            description: 'The Assault Rifle is a weapon that appeared in every Grand Theft Auto since Grand Theft Auto III, except Grand Theft Auto: Vice City',
        },
        {
            name: 'BullpupRifle',
            description: 'The most lightweight and compact of all assault rifles, without compromising accuracy and rate of fire.',
        },
        {
            name: 'CombatPistol',
            description: 'A compact, lightweight semi-automatic pistol designed for law enforcement and personal defense use. 12-round magazine with option to extend to 16 rounds',
        },
        {
            name: 'Grenade',
            description: 'Standard fragmentation grenade. Pull pin, throw, then find cover. Ideal for eliminating clustered assailants',
        },
        {
            name: 'Minigun',
            description: 'A devastating 6-barrel machine gun that features Gatling-style rotating barrels. Very high rate of fire (2000 to 6000 rounds per minute)',
        },
        {
            name: 'Musket',
            description: 'Armed wit nothing but muskets and a superiority complex, the Brits took over half the world. Own the gun that built an Empire',
        },
        {
            name: 'SniperRifle',
            description: 'Standard sniper rifle. Ideal for situations that require accuracy at long range. Limitations include slow reload speed and very low rate of fire',
        },
        {
            name: 'SNSPistol',
            description: 'Like condoms or hairspray, this fits in your pocket for a night on the town. The price of a bottle at a club, its half as accurate as a champagne cork, and twice as deadly',
        },
        {
            name: 'StunGun',
            description: 'Fires a projectile that administers a voltage capable of temporarily stunning an assailant. Takes approximately 4 seconds to recharge after firing',
        },
    ]

    let dataItem = await Data.find().sort({timeCreated: 'desc'}) ;

    res.render('index', { dataItem: dataItem, products: products });
});


app.use(express.static("public"));
app.use('/data', dataRouter);

app.listen(process.env.PORT || 5000);