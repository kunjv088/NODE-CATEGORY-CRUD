const subCategory = require("../model/subCatSchema");
const fs = require("fs");
const category = require("../model/category");


module.exports.addSubCat = async (req,res) =>{
    let  data = await category.find({});
    res.render("addSubCat" , {data});
};

module.exports.subCat = async (req,res) =>{
    await subCategory.create(req.body).then(()=>{
        res.redirect("/subCategory/viewSubCat");
    });
};

module.exports.viewSubCat = async (req,res) =>{
    let data = await subCategory.find({}).populate("categoryId");
    data && res.render("viewSubCat" , {data});
};

module.exports.delete = async (req,res) =>{
    let data = await subCategory.findByIdAndDelete(req.query.id);
    data && res.redirect("/subCategory/viewSubCat");
};

module.exports.editdata = async (req,res) =>{
    let  data = await category.find({});
    res.render("editSubCat" , {data});
}

module.exports.edit = async(req,res)=>{
    let data = await subCategory.findById(req.query.id)
    data && res.redirect("/subCategory/editSubCat")
};

module.exports.update = async(req,res)=>{
    let data = await subCategory.findByIdAndUpdate(req.body.id,req.body);
    data && res.redirect("/subCategory/viewSubCat");
};