const mongoose = require ('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]

})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category

