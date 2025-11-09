const mongoose = require("mongoose");


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URL); // use DB_URL directly
     
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = connectDB;