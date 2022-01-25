const express = require('express')
const Recipes = require('../models/Recipes')
// router stores an instance of the express router class

const router = express.Router()
// router intercepts the request object and checks all routes beneath it



// index route
router.get('/', (req, res) => {
        Recipes.find({}, (err, foundRecipes) => {       
        res.render('index.ejs', {recipes: foundRecipes})
    })
})

// new route
router.get('/new', (req, res) => res.render('new.ejs'))

// show route
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Recipes.findById(id, (err, foundRecipes) => {
        console.log(foundRecipes)
        res.render('show.ejs', {recipes: foundRecipes})        
    })
})

// create route
router.post('/', (req, res) => {
    console.log('hitting post route')
    console.log(req.body)
    
    Recipes.create(req.body, (err, createdRecipe) => {
        console.log(req.body)
        console.log(createdRecipe)
        res.redirect('/recipes')
    })
})

// edit route
router.get('/:id/edit', (req, res) => {
 
    // Recipes.findById(req.params.id, (err, foundRecipe) => {
    //     if (err) {
    //         return res.send(err)
    //     } else {
    //         console.log(foundRecipe)
            res.render('edit.ejs', )
            // { id: req.params.id })
        // }
//     })
})


// Delete Route
router.delete('/:id', (req, res)=>{
    Recipes.findByIdAndDelete({_id : req.params.id}, (err, deleteMsg)=>{
        console.log(deleteMsg)
        res.redirect('/recipes')
    })
})


// update route
router.put('/:id', (req, res) => {
    Recipes.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRecipe)=>{
        if(err){
          return  res.send(err)
        }
        console.log(updatedRecipe)
        res.redirect('/recipes/'+req.params.id)
    })
    // res.send(req.body)
})

module.exports = router