const product = require("../model/productSchema");
const fs = require("fs");
const subCategory = require("../model/subCatSchema");



module.exports.product = async (req,res) =>{
    let  data = await subCategory.find({});
    res.render("addProduct" , {data});
};

module.exports.productData = async (req,res) =>{
    req.body.image = req.file.path;
    await product.create(req.body).then(()=>{
        res.redirect("/product/addProduct");
    });
};

module.exports.viewProduct = async (req,res) =>{
    let data = await product.find({}).populate("productId");
    data && res.render("viewProduct" , {data});
};

module.exports.delete = async (req,res) =>{
    let singleRecord = await product.findById(req.query.id);
    fs.unlinkSync(singleRecord.image);
    let data = await product.findByIdAndDelete(req.query.id)
    data && res.redirect("/product/viewProduct");
};

module.exports.editdata = async (req,res) =>{
    let  data = await subCategory.find({});
    res.render("editProduct" , {data});
}

module.exports.edit = async (req,res) =>{
    let data = await product.findById(req.query.id);
    data && res.redirect("/product/editProduct");
};



module.exports.update = async(req,res)=>{
    let img = "";
    let SingleData = await product.findById(req.body.id)
    req.file ? img = req.file.path : img = SingleData.image
    req.file && fs.unlinkSync(SingleData.image)
    req.body.image = img
    let data = await product.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/product/viewProduct");
}