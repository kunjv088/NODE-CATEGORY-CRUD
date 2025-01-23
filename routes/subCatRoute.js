const express = require("express");
const route = express.Router();
const ctl = require("../controller/subCatCtl");
const passport = require("passport");
const passportSt = require("../middleware/passport");

route.get("/addSubCat" , ctl.addSubCat); 
route.post("/addSubCat" , ctl.subCat); 
route.get("/viewSubCat" , ctl.viewSubCat); 
route.get("/delete" , ctl.delete); 
route.get("/edit" , ctl.edit); 
route.get("/editSubCat" , ctl.editdata); 
route.post("/editSubCat" , ctl.update); 

module.exports = route; 