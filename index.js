const express = require("express");
const port = 3211;
const db = require("./config/db");
const app = express();
const fs = require("fs");
const passport = require("passport");
const flash = require("connect-flash")
const session = require("express-session");
const passportst = require("./middleware/passport");
const connectFlash = require("./middleware/flash");
const path = require("path");

app.set("view engine" , "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use("/public",express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use("/", express.static(path.join(__dirname,"public")));
app.use(flash());

app.use(
    session({
        name:"local",
        secret:"local",
        resave:true,
        saveUninitialized:false,
        cookie:{maxAge: 100* 100 * 60 , httpOnly:true},
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(connectFlash.setFlash);

app.use("/" , require("./routes/route"));
app.use("/category" , require("./routes/catroute"));
app.use("/subCategory" , require("./routes/subCatRoute"));
app.use("/product" , require("./routes/productRoute"));
app.listen(port , (err)=>{
    err ? console.log(err) : console.log("server strted on port " + port);
})


