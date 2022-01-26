const express = require('express')
const app = express ()
const PORT = 8000
const methodOverride = require('method-override')

// controller import (along with the rest of my express imports)
const recipesController = require('./controllers/recipes')
const categoryController = require('./controllers/category')

const mongoose = require('mongoose')
const connectionString = "mongodb://127.0.0.1:27017/twoModelDB"

mongoose.connect(connectionString)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongoDB: '+connectionString.split('/').pop())
})


app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))

app.use("/recipes", recipesController)
app.use("/category", categoryController)

// home page
app.get('/', (req,res)=>{
    console.log('hitting home route')
    res.render('home.ejs')
})


app.listen(PORT, ()=>{
    console.log('Listening')
})

