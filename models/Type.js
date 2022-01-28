const mongoose = require ('mongoose')

const typeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    recipes: [{
        type: mongoose.Schema.Types.String,
        ref: 'Recipe'
    }]

})

const Type = mongoose.model('Type', typeSchema)

module.exports = Type
