require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const User = require("./models/User");
const {PRIVATE_TOKEN} = process.env

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  const {firstName, lastName, email, password} = req.body;

  if(!(firstName && lastName && email && password)){
    res.status("400").send("All details should be provided");
  }

  const oldUser = await User.findOne({ email });
  if(oldUser){
    res.status("400").send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const jwt = jsonwebtoken.sign({email}, PRIVATE_TOKEN, {expiresIn: "2 days"});

  User.create(
    {
      first_name: firstName, last_name: lastName, 
      password: hashedPassword, email: email,
      token: jwt
    }
  );

  res.status(200).send("User created successfully");
})

app.post("/login", () => {
  
})

module.exports = app;

