const mongoose = require("mongoose");


const ipfsSchema = mongoose.Schema(
  {
    cid: { type: "String", required: true },
    patient_username: { type: "String", required: true, },
    meta : { type: "String", required: true },
    owner:{type:"String",required:true},
    hospital_username:{type:"String",required:true},
   
  },
  { timestamps: true }
);


const data = mongoose.model("data", ipfsSchema);

module.exports = data;