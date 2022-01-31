const express = require('express')
const app = express ()
const PORT = process.env.PORT || 8000
const methodOverride = require('method-override')

// controller import (along with the rest of my express imports)
const recipesController = require('./controllers/recipes')
const categoryController = require('./controllers/category')

const mongoose = require('mongoose')
const connectionString = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recipes"

mongoose.connect(connectionString)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongoDB: '+connectionString.split('/').pop())
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))


app.use("/recipes", recipesController)
app.use("/category", categoryController)



// about us page
app.get('/aboutus', (req,res)=>{
    console.log('aboutus online')
    res.render('navbar/aboutus.ejs')
})

// overview
app.get('/overview', (req,res)=>{
    res.render('navbar/overview.ejs')
})

// contact
app.get('/contact', (req,res)=>{
    res.render('navbar/contact.ejs')
})

// home page
app.get('/', (req,res)=>{
    console.log('hitting home route')
    res.render('home.ejs')
})



app.listen(PORT, ()=>{
    console.log('Listening')
})

