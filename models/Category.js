const mongoose = require ('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },

})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category