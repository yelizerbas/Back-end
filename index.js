// console.log("hello world");

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require("express-handlebars");
const path = require("path"); 

app.engine(
  "hbs",
    exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("filteren");
});



app.use(express.static(path.join(__dirname, "static")));




app.get('/', onhome)
app.get('/login', onlogin)


app.get('', (req, res) => {
  res.render('index', {text: 'this is ejs'})
})


function onhome(req, res){
res.send('Hellow World!')
}

function onlogin(req, res){
res.send('log in je account dan >:(')
}

app.use((req, res, next) => {
  res.status(404).send('geprankt ooooooh')
})






app.get('', (req,res) => {
  res.render('index', {text: 'dit is ejssss'})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})