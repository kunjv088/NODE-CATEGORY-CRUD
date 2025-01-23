const mongoose = require("mongoose");

const pschema = new mongoose.Schema({
    productName: {
        type:String,
        required: true,
    },
    image: {
        type:String,
        required: true,
    },
    productId: {
        type:mongoose.Types.ObjectId,
        ref:"subCategory",
        required:true,
    }, 
});

const product = mongoose.model("product",pschema);

module.exports = product;