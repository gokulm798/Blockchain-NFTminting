const mongoose = require("mongoose");


const ipfsSchema = mongoose.Schema(
  {
    token_id:{ type: "String", required: true },
    cid: { type: "String", required: true },
    patient_username: { type: "String", required: true, },
    doc_name : { type: "String", required: true },
    diagnosis_disease:{type:"String",required:true},
    hospital_username:{type:"String",required:true},
    account_address:{type:"String",required:true},
    gender:{type:"String",required:true},
    dateOfBirth:{type:"String",required:true},
    bloodGroup:{type:"String",required:true},
   
  },
  { timestamps: true }
);
const ipfsDupSchema = mongoose.Schema(
  {
    token_id:{ type: "String", required: true },
    cid: { type: "String", required: true },
    patient_username: { type: "String", required: true, },
    doc_name : { type: "String", required: true },
    diagnosis_disease:{type:"String",required:true},
    hospital_username:{type:"String",required:true},
    account_address:{type:"String",required:true},
    gender:{type:"String",required:true},
    dateOfBirth:{type:"String",required:true},
    bloodGroup:{type:"String",required:true},
    mint:{type:"Boolean",required:true},
   
  },
  { timestamps: true }
);



const data = mongoose.model("data", ipfsSchema);

const dupdata = mongoose.model("dupdata", ipfsDupSchema);

module.exports = {data,dupdata};