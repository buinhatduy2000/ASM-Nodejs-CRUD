const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    amount: {
        type: String ,
        required: true
    },
    made: {
        type: String,
    },
    description: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    img: {
        type: String,
        default: "bien.png"
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
        slug_padding_size: 2
    }
});


module.exports = mongoose.model('Data', dataSchema);