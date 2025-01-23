const category = require("../model/category");
const fs = require("fs");

module.exports.addcat = (req, res) => {
    res.render("addcat"); 
};

module.exports.viewCat = async(req, res) => {
    let data = await category.find({});
    data && res.render("viewcat" , {data});
};



module.exports.addcategory = async (req, res) => {
        req.body.image = req.file.path;
        let data = await category.create(req.body);
         data &&  res.redirect("/category/viewcat");
       
};

module.exports.delete = async (req,res) =>{
    let singleRecord = await category.findById(req.query.id);
    // fs.unlinkSync(singleRecord.image);
    let data = await category.findByIdAndDelete(req.query.id)
    data && res.redirect("/category/viewcat");
};

module.exports.edit = async (req,res) =>{
    let data = await category.findById(req.query.id);
    data && res.render("editCat" , {data});
};

module.exports.update = async(req,res)=>{
    let img = "";
    let SingleData = await category.findById(req.body.id)
    req.file ? img = req.file.path : img = SingleData.image
    req.file && fs.unlinkSync(SingleData.image)
    req.body.image = img
    let data = await category.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/category/viewcat");
}