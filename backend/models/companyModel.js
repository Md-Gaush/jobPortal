const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         unique: true,
    },
    description:{
        type:String
    },
    website:{
        type:String
      
    },
    location:{
        type:String
    },
    file:{
        type:String //url to comapny logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

const Company = mongoose.model("Company",companySchema)

module.exports = Company