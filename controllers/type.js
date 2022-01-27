const express = require('express')
const Recipes = require('../models/Recipes')
const Category = require('../models/Category')
const Type = require('../models/Type')
// router stores an instance of the express router class

const router = express.Router()
// router intercepts the request object and checks all routes beneath it



// Index route
router.get('/', (req, res) => {
        Type.find({}, (err, foundCategory) => {       
        res.render('type/index.ejs', {category: foundCategory})
    })
})

// New route
router.get('/new', (req, res) => res.render('type/new.ejs'))

// Show route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Type.findById(id).populate('recipes').exec( (err, foundCategory) => {
        res.render('type/show.ejs', {category: foundCategory}) 
        console.log(foundCategory)       
    })
})

// Create route
router.post('/', (req, res) => {
  
    Type.create(req.body, (err, createdCategory) => {
        console.log(createdCategory)
        res.redirect('/type')
    })
})

// Edit route
router.get('/:id/edit', (req, res) => {
    Type.findById(req.params.id, (err, foundCategory) => {
        if (err) {
            return res.send(err)
        } else {
            res.render('type/edit.ejs', 
            {category: foundCategory, id: req.params.id })
        }
    })
})

// Delete Route
router.delete('/:id', (req, res)=>{
    Type.findByIdAndDelete({_id : req.params.id}, (err, deleteMsg)=>{
        res.redirect('/type')
    })
})

// Update route
router.put('/:id', (req, res) => {
    Type.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCategory)=>{
        if(err){
          return  res.send(err)
        }
        res.redirect('/type/'+req.params.id)
        console.log(updatedCategory)
    })
    // res.send(req.body)
})

module.exports = router