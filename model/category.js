const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    categoryname: {
        type:String,
        required: true,
    },
    image: {
        type:String,
        required: true,
    }
});

const category = mongoose.model("category",adminSchema);

module.exports = category;