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

    let dataItem = await Data.find().sort({timeCreated: 'desc'}) ;

    res.render('index', { dataItem: dataItem });
});


app.get('/search', async (req, res)=>{
    var q = req.query.q;

    let Item = await Data.find().sort({timeCreated: 'desc'})

    var matchItem = Item.filter((item)=>{
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('index', { dataItem: matchItem});
    console.log(req.query);
});


app.use(express.static("public"));
app.use('/data', dataRouter);

app.listen(process.env.PORT || 5000);