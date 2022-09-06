const express = require('express');
const rout = express.Router("");
const userData = require('../Schema/mongodb')

// Register API

rout.post("/register", async (req,res) => {
    try {
            const User = userData.find({ username: req.body.username }, async (err, data) => {
                if (data) {
                    const Getter = data
                    if (Getter == "") {
                        const Person = userData.find({ email: req.body.email }, async (err, edata) => {
                            const Active = edata;
                            if (Active == "") {
                                const register = new userData({
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password
                                })
                                await register.save();
                                res.json({
                                    status : 1,
                                    message: "Registered Successfully ! please Login..."
                                });
                            }
                            else {
                                res.json({
                                    status : 0,
                                    error: "email already exist ! Please use another mail Id"
                                })
                            }
                        })
                    }
                    else {
                        res.json({
                            status : 0,
                            error: "Username Already exist ! Please use another mail Id"
                        })
                    }
                }
            })       

    } catch (error) {
        res.json({
            status : 0,
            message : "Server Error"
        })
        console.log(error)
    }
})


// Login API

rout.post("/login" , async (req,res) => {
    try {
        
            const Us = userData.find({ email: req.body.email }, (err, data) => {
                if (data) {
                    const UDatas = data
                    if (UDatas == "") {
                        res.json({
                            status: 0,
                            error: "Email Not Registered with us ! please try again"
                        })
                    } else {
                        userData.findOne({ email: req.body.email }, (err, data) => {
                            if (data.password == req.body.password) {
                                res.json({
                                    status : 1,
                                    message : "Login Successfully",
                                })
                            }
                            else {
                                res.json({
                                    status: 0,
                                    error: "Invalid password ! try again..."
                                })
                            }
                        })
                    }
                }
            })

    } catch (error) {
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})

//Apply Leave API

rout.post("/leave/:id",async (req,res) => {
    try {
        
        const id = req.params.id;

        await userData.findOneAndUpdate({_id : id},{
            $set :req.body
        }).then((data) => {
            res.json({
                status : 1,
                message : "Successfully Applied"
            })
        }).catch((err) => {
            console.log(err);
            res.json({
                status : 0,
                message : "Do Not Appiled"
            })
        })

    } catch (error) {
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})

//Get Leave Data

rout.post("/getleave", async (req,res) => {
    try {
        
        const email = req.body.email;

        if(email === "" || email === null){
            res.json({
                status : 0,
                message : "Email is required"
            })
        }else{
          const result = await userData.findOne({email : email})

          if(result != null){
            res.json({
                status : 1,
                message : "Success",
                result
            })
          }else{
            res.json({
                status : 0,
                message : "Data Not Found"
            })
          }
        }

    } catch (error) {
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})

module.exports = rout