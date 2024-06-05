const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    image:String,
    name:String,
    description:String,
    duration:Number,
    rating:String,

})

const movieModel = mongoose.model('movie', movieSchema);

module.exports =movieModel 