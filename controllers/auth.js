const express = require("express")
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get("/", async(req,res)=>{
    res.render("index.ejs")
  })

router.get("/sign-up",(req,res)=>{
    res.render("auth/sign-up.ejs")
})

router.post("/sign-up",async(req,res)=>{
  console.log(req.body)
  const userInDatabase = await User.findOne({username:req.body.username})

  // check if the username is already taken
  if(userInDatabase){
    return res.send("Username already taken")
  }

  // check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  console.log("OLD PASSWORD: ", req.body.password)

  const hashedPassword = bcrypt.hashSync(req.body.password,10)
  console.log("NEW PASSWORD: ",hashedPassword)
  req.body.password = hashedPassword

  const createdUser = await User.create(req.body)

  res.send(`thank you for signing up ${createdUser.username}`)

})

router.get('/sign-in',(req,res)=>{
  res.render("auth/sign-in.ejs")
})

  
  

module.exports = router