const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  try{
    const token = req.header("access-token");

    if(!token){
      return res.status(403).send("A token is required")
    }

    const decoded = jsonwebtoken.verify(token, process.env.PRIVATE_TOKEN, {
      maxAge: "2 days"
    })
    req.user = decoded;

  }catch(err){
    console.error(err.message);
    return res.status(401).send("Invalid token");
  }
  
  return next();
}