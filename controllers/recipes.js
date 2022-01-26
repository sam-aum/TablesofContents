const express = require('express')
const Recipes = require('../models/Recipes')
const Category = require('../models/Category')

// router stores an instance of the express router class

const router = express.Router()
// router intercepts the request object and checks all routes beneath it



// index route
router.get('/', (req, res) => {
        Recipes.find({}, (err, foundRecipes) => {       
        res.render('recipes/index.ejs', {recipes: foundRecipes})
    })
})

// new route
router.get('/new', (req, res) => {
    Category.find({}, (err, foundCategory)=>{
        if(err){
            res.send(err)
        }else {
            res.render('recipes/new.ejs', {category: foundCategory})            
        }
    })
})

// show route
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Recipes.findById(id, (err, foundRecipes) => {
        console.log(foundRecipes)
        res.render('recipes/show.ejs', {recipes: foundRecipes})        
    })
})

// create route
router.post('/', (req, res) => {
    console.log('hitting post route')
    console.log(req.body)
    Category.findById(req.body.category, (err, foundCategory)=>{

        Recipes.create(req.body, (err, createdRecipe) => {
            console.log(req.body.category)
            console.log(createdRecipe)
            foundCategory.recipes.push(createdRecipe)
            foundCategory.save()
            console.log(foundCategory)
            
        })
        res.redirect('/recipes')
    })
  
})

// edit route
router.get('/:id/edit', (req, res) => {
 
    Recipes.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            return res.send(err)
        } else {
            console.log(foundRecipe)
            res.render('recipes/edit.ejs', 
            {recipe: foundRecipe, id: req.params.id })
        }
    })
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