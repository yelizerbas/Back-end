
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const exphbs = require("express-handlebars");
const path = require("path"); 

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// const db  = require('./utils/db');
const {utilsDB}  = require('./utils/db')

require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gymbuddy.ejaie.mongodb.net/gymbuddy?retryWrites=true&w=majority`; 
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

utilsDB(client).then(data => { console.log(data)})


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
  // filter animals
  const filteredPersoon = persoon.filter((persoon) => {
    // stop het item alleen in de array wanneer onderstaande regel 'true' is
    return persoon.doelen == req.body.doelen;
  });
  //render same page with filtered animals
  res.render("filteren", {
    persoon: filteredPersoon
  });
});


app.delete("/delete", async(req, res) => {

  const persoon = await utilsDB(client); 

  console.log(req.body);
});





require('dotenv').config();

app.use(express.static(path.join(__dirname, "static")));

// db.connectDb();

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

app.set("view engine", "hbs");


app.get('/', (req, res) => {
  res.render("filteren");
});


app.get('/', onhome)
app.get('/login', onlogin)





function onhome(req, res){
res.send('Hellow World!')
}

function onlogin(req, res){
res.send('log in je account dan >:(')
}

app.use((req, res, next) => {
  res.status(404).send('geprankt ooooooh')
})





// app.get('', (req,res) => {
//   res.render('index', {text: 'dit is ejssss'})
// })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
