const express = require('express')
const app = express ()
const PORT = 8000

const mongoose = require('mongoose')
const URI = 'mongodb://127.0.0.1:27017/recipes'

mongoose.connect(URI, ()=>{
    console.log('mongoose connectedat ' + URI)
})




app.listen(PORT, ()=>{
    console.log('Listening')
})

