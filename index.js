
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const exphbs = require("express-handlebars");
const path = require("path"); 

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const {utilsDB}  = require('./utils/db')

require('dotenv').config();
const { MongoClient, ServerApiVersion, Db } = require('mongodb');
const { runInNewContext } = require('vm');
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gymbuddy.ejaie.mongodb.net/gymbuddy?retryWrites=true&w=majority`; 
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

utilsDB(client).then(data => { console.log(data)})
require('dotenv').config();
app.use(express.static(path.join(__dirname, "static")));

// middleware om omtegaan met incoming data in de body van een request. In dit geval POST
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", async(req, res) => {

  // data uit de database wat in een array is gestopt wordt nu in de constante dieren gezet.
  const persoon = await utilsDB(client); 

  // ophalen personen database
  res.render("filteren", {
    persoon: persoon
  });
});


app.post("/formulier", async(req, res) => {

  const persoon = await utilsDB(client); 

  console.log(req.body);
  // filter personen
  const filteredPersoon = persoon.filter((persoon) => {
    // stop het item alleen in de array wanneer onderstaande regel 'true' is, dus als de doelen overeen komen met de radiobutton
    return persoon.doelen == req.body.doelen;
  });
  //render zelfde pagina, maar met de gefilterde personen
  res.render("filteren", {
    persoon: filteredPersoon
  });
});


app.post("/delete", async(req, res) => {

  await client.connect()

  console.log(req.body)
  client.db('gymbuddy-db').collection('users').deleteOne({ name: req.body.gymbuddy }).then(buddy => {
    console.log(req.body.gymbuddy)
  })

  res.redirect('/')
});


//hbs connecten
app.get('/', function(req, res){
   res.render('filteren.hbs');
});

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(bodyParser.json()); 


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 

app.post('/', function(req, res){
   console.log(req.body);
   res.send(req.body);
});
 
app.engine(
  "hbs",
    exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);


//error scherm
app.use((req, res, next) => {
  res.status(404).send('geprankt ooooooh')
})




//port connecten
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
