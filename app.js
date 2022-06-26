require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const User = require("./models/User");
const auth = require("./middleware/auth");
const {PRIVATE_TOKEN} = process.env

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  try{
    const {firstName, lastName, email, password} = req.body;

    if(!(firstName && lastName && email && password)){
      res.status(400).send("All details should be provided");
      return;
    }

    const oldUser = await User.findOne({ email });
    if(oldUser){
      res.status(400).send("User already exists");
      return;
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

    res.status(201).send("User created successfully");
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("An error occured")
  }
})

app.post("/login", async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!(email && password)){
      res.status(400).send("All details should be provided");
      return;
    }

    const user = await User.findOne({email});
    if(!user.email){
      res.status(400).send("User does not exist");
      return;
    }

    const validUser = bcrypt.compareSync(password, user.password)
    if(!validUser) {
      res.status(400).send("Invalid credentials");
      return;
    }

    const jwt = jsonwebtoken.sign({ email }, PRIVATE_TOKEN, {
      expiresIn: "2 days",
    });

    user.token = jwt;

    if(validUser){
      res.status(200).send({token: user.token});
    }
  } 
  catch(err){
    console.error(err.message);
    res.status(500).send("An error occured")
  }
})

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;
