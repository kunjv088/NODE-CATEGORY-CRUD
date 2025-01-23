const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    subCatName: {
        type:String,
        required: true,
    },
    categoryId: {
        type:mongoose.Types.ObjectId,
        ref:"category",
        required:true,
    }, 
});

const subCategory = mongoose.model("subCategory",adminSchema);

module.exports = subCategory;