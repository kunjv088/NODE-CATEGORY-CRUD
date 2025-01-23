const mongoose = require("mongoose");

const url = "mongodb+srv://kunjpatel088:Kunj123456@cluster0.alwum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
.then(()=> console.log("conneted"))
.catch((error)=> console.log("error"));