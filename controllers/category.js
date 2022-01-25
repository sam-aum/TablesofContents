const express = require('express')
const Category = require('../models/Category')
// router stores an instance of the express router class

const router = express.Router()
// router intercepts the request object and checks all routes beneath it



// Index route
router.get('/', (req, res) => {
        Category.find({}, (err, foundCategory) => {       
        res.render('category/index.ejs', {category: foundCategory})
    })
})

// New route
router.get('/new', (req, res) => res.render('new.ejs'))

// Show route
router.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id, (err, foundCategory) => {
        res.render('show.ejs', {category: foundCategory})        
    })
})

// Create route
router.post('/', (req, res) => {
    Category.create(req.body, (err, createdCategory) => {
        res.redirect('/category')
    })
})

// Edit route
router.get('/:id/edit', (req, res) => {
    Category.findById(req.params.id, (err, foundCategory) => {
        if (err) {
            return res.send(err)
        } else {
            res.render('edit.ejs', 
            {category: foundCategory, id: req.params.id })
        }
    })
})

// Delete Route
router.delete('/:id', (req, res)=>{
    Category.findByIdAndDelete({_id : req.params.id}, (err, deleteMsg)=>{
        res.redirect('/category')
    })
})

// Update route
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCategory)=>{
        if(err){
          return  res.send(err)
        }
        res.redirect('/category/'+req.params.id)
    })
    // res.send(req.body)
})

module.exports = router