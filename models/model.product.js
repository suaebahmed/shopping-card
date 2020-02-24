const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    imgPath: {
        type: String,
        require: true,
    },

})
module.exports = mongoose.model('Product',productSchema);
