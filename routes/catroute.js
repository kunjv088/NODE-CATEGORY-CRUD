const express = require("express");
const router = express.Router();
const ctl = require("../controller/catctl");
const passport = require("passport");
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

router.get("/addcat", passport.checkAuth, ctl.addcat); 
router.post("/addcat", uploads, ctl.addcategory); 
router.get("/viewcat", passport.checkAuth, ctl.viewCat); 
router.get("/delete", ctl.delete);
router.get("/edit", ctl.edit);
router.post("/update",uploads, ctl.update);
// router.post("/update", ctl.updateCatData);

module.exports = router;
