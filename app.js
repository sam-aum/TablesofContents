const express = require('express')
const methodOverride = require('method-override')
const app = express ()
const PORT = 8000

const mongoose = require('mongoose')
const URI = 'mongodb://127.0.0.1:27017/recipes'
app.set('view engine','ejs')
mongoose.connect(URI, ()=>{
    console.log('mongoose connectedat ' + URI)
})
//middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))





app.listen(PORT, ()=>{
    console.log('Listening',PORT)
})

