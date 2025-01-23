const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport ({
    service: "gmail" , 
    auth:{
        user:"kunjpatel088@gmail.com" ,
        pass: "hptbgrbszqfwwvys"
    },
});

module.exports.sendOtp = (to,otp) => {
    let mailOption ={
        from: "kunjpatel088@gmail.com",
        to:to,
        subject: "Your OTP is Here",
        text: `Your OTP is ${otp}`,
    };

    transport.sendMail(mailOption,(err)=>{
        err && console.log(err);
        
    });
};