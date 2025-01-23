const express = require("express");
const route = express.Router();
const ctl = require("../controller/productCtl");
const passport = require("passport");
const passportSt = require("../middleware/passport");
const multer = require("multer");

const Storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null , "uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now());
    }
});

const uploads = multer({storage:Storage}).single("image");

route.get("/addProduct" , ctl.product);
route.post("/addProduct" ,uploads ,  ctl.productData);
route.get("/viewProduct"  ,  ctl.viewProduct);
route.get("/delete"  ,  ctl.delete);
route.get("/edit" ,  ctl.edit);
route.get("/editProduct" ,  ctl.editdata);
route.post("/editProduct" ,uploads,  ctl.update);


module.exports = route ;