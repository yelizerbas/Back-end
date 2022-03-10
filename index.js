const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const exphbs = require("express-handlebars");
const path = require("path"); 

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const db  = require('./utils/db');


require('dotenv').config();

app.use(express.static(path.join(__dirname, "static")));

db.connectDb();

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
