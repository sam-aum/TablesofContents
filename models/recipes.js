const mongoose = require ('mongoose')

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: {
        type: [String]
    },
    instructions: {
        type: String
    },
    category: {
        type: String
    },
    time: {
        type: String
    }
})

const Recipe = mongoose.model('Recipe', recipesSchema)

module.exports = Recipe

//enum