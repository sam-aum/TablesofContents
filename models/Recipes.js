const mongoose = require ('mongoose')

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: {
        type: [String],
        lowercase: true
    },
    instructions: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    time: {
        type: String
    },
    foodType: {
        type: mongoose.Schema.Types.String,
        ref: "Type"
    }
})

const Recipe = mongoose.model('Recipe', recipesSchema)

module.exports = Recipe

//enum