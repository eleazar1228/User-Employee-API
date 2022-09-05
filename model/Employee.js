const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('Employee', employeeSchema)
//Mongoose automatically looks for the plural, lowercased cersion of your model name