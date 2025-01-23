const express = require("express");
const admin = require("../model/schema");
const fs = require("fs");
const mailer = require("../middleware/nodemailer");



module.exports.Login = (req,res) => {
    res.render("Login");
};

module.exports.HomePage = async(req,res) =>{
    res.render("admin");
};
     
module.exports.userLogin = async (req, res) =>{
    // console.log(req.body);     
    let admindata = await admin.findOne({email: req.body.email});
    // console.log(admindata);
    res.redirect("/dashBoard");
};

module.exports.Addadmin =async(req,res) => {
    res.render("formbasic");   
};

module.exports.logout = (req,res)=>{
    req.session.destroy();
    // res.clearCookie("local");
    res.redirect("/");
};


module.exports.viewAdmin = async (req, res) => {     
    let data = await admin.find({});
    res.render("table", { data });
};

module.exports.AddAdminData = async(req,res)=>{
    // console.log(req.body); 
    let data = await admin.create(req.body)
    data && res.redirect("/tableData")
}
module.exports.DeleteData = async(req,res)=>{
    let data = await admin.findByIdAndDelete(req.query.id)
    data && res.redirect("/tableData");
}
module.exports.EditData = async(req,res)=>{
    let data = await admin.findById(req.query.id)
    data && res.render("edit",{data})
}
module.exports.UpdateData = async(req,res)=>{
    let data = await admin.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/tableData");
}

module.exports.profile = (req,res) => {
    res.render("profile");
};

module.exports.changePassword  = (req,res) =>{
    res.render("changepass");
};

module.exports.changePass = async (req,res) =>{
    let user = req.user;

    if (req.body.oldPass == user.password) {
        if (req.body.newPass != user.password) {
            if (req.body.newPass == req.body.confirmPass) {
                await admin.findByIdAndUpdate(user.id , {password:req.body.newPass});
                res.redirect("/logout")
            } else {
                console.log("new Password amd confirm Password are not same");
                
            }
        } else {
            console.log("new Password and old Password must be different");
            
        }
    } else {
        console.log("old password is wrong");
        
    }
};

module.exports.forgotpass = async (req,res) => {
    console.log(req.body)
    let forgot = await admin.findOne({ email: req.body.email });
    if(!forgot){
        console.log("Email not found");
        return res.redirect("/")
    }
    let otp = Math.floor(Math.random() * 1000 + 9000);

    mailer.sendOtp(req.body.email,otp);

    req.session.otp = otp;
    req.session.adminData = forgot;

    res.redirect("/checkpass");
};

module.exports.checkpassword = (req,res) => {
    res.render("checkpass");
};

module.exports.checkpass = async(req,res)=>{
    let otp = req.session.otp;
    let adminData = req.session.adminData;
    if (req.body.otp == otp) {
        if (req.body.newPass == req.body.confirmPass) {
            console.log(adminData._id);

            let change = await admin.findByIdAndUpdate(adminData._id,{
                password:req.body.newPass,
                
            });
          
            change && res.redirect("/");
            
        }else{
            console.log("password must be same");
            res.redirect("/checkpass")
        }
    }else{
        console.log("otp is wrong");
        res.redirect("/checkpass");
    }

};