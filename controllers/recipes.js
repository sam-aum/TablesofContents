const express = require('express')
const Recipes = require('../models/Recipes')
const Category = require('../models/Category')
const Type = require('../models/Type')

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
    // Recipes.findById(id, (err, foundRecipes) => {
    //     console.log(foundRecipes)
    //     res.render('recipes/show.ejs', {recipes: foundRecipes})        
    // })
    Recipes.findById(id).populate('category').exec(
        (err, foundRecipes) => {
            if(err){
                res.send(err)
            }else {
                res.render('recipes/show.ejs', {recipes: foundRecipes}) 
            } 
        }
    )        
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
            console.log(foundCategory)
            foundCategory.save()
            
        })
        res.redirect('/recipes')
    })
  
})

router.post('/', (req, res) => {
    Type.findById(req.body.type, (err, foundType)=>{

        Recipes.create(req.body, (err, createdRecipe) => {
            console.log(req.body.category)
            console.log(createdRecipe)
            foundType.recipes.push(createdRecipe)
            foundType.save()
            console.log(foundType)
            
        })
        res.redirect('/recipes')
    }) 
})

// edit route
router.get('/:id/edit', (req, res) => {
    Recipes.findById(req.params.id).populate('category').exec(
        (err, foundRecipe) => {
        if (err) {
            return res.send(err)
        } 
        else {
            Category.find({}, (err, foundCategory)=>{
                console.log(foundRecipe)
                res.render('recipes/edit.ejs', 
                {recipe: foundRecipe, category: foundCategory, id: req.params.id })
            })
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

// Update route
router.put('/:id', (req, res) => {
    Recipes.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRecipe)=>{
        if(err){
          res.send(err)
        }else{
            console.log(updatedRecipe)
            res.redirect(`/recipes/${updatedRecipe.id}`)
        }
    })
})

module.exports = router