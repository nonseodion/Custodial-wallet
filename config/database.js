const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {

  mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to database successfully"))
    .catch(err => {
      console.log("Failed to connect to database")
      console.error(err)
      process.exit(1);
    });
    
}