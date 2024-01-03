const mongoose = require("mongoose");


const Signup = new mongoose.Schema({
  name: { type: String },
  email: { type: String , index: true},
  mobile:{type:Number},
  password:{type:String}
});


const musicApplications = new mongoose.Schema({
    headphoneBrandName:{type:String},
     headphoneProductName:{type:String},
     headphoneType:{type:String},
     headphoneColor:{type:String},
     headphonePrice:{type:String},
     headphoneAvailable:{type:String},
     headphoneDescription:{type:String},
     headphoneImages: [{ type: String }],
     headphoneRating:{type:Number},
     headphoneHeaderData:{type:String}
});

const signup = mongoose.model("signup", Signup);
const musicapplications = mongoose.model("application",musicApplications )

var my_schemas = {
    signup: signup,
    musicapplications:musicapplications,
};

module.exports = my_schemas;