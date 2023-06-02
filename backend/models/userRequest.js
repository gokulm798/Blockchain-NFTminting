const mongoose = require("mongoose");


const mintRequestSchema = mongoose.Schema(
  {
    request_to: { type: "String", required: true },
    isAccept : { type: "Boolean", default:false },
    isUserRead:{type:"Boolean",default:false},
    sender_username:{type:"String",required:true},
    Content:{type:"String",required:true},
    isSenderRead:{type:"Boolean",default:false},
    doc_name : { type: "String", required: true },
    diagnosis_code: { type: "String", required: true },
    account_address:{ type: "String", required: true },
    hospital_address:{ type: "String", required: true },
    diagnosis_disease:{ type: "String", required: true },
    sender_name:{type:"String",required:true},
   
  },
  { timestamps: true }
);


const nftRequest = mongoose.model("nftRequest",mintRequestSchema);


const licenseRequestSchema = mongoose.Schema(
  {
    request_to: { type: "String", required: true },
    isAccept : { type: "Boolean", default:false },
    isUserRead:{type:"Boolean",default:false},
    sender_username:{type:"String",required:true},
    time:{type:"String",required:true},
    token:{type:"String",required:true},
    account_address:{type:"String",required:true},
    researcher_address:{type:"String",required:true},
    isSenderRead:{type:"Boolean",default:false},
    sender_name:{type:"String",required:true},
    content:{ type: "String", required: true },
    diagnosis_disease:{ type: "String", required: true },
   
  },
  { timestamps: true }
);

const licenseRequest = mongoose.model("licenseRequest",licenseRequestSchema);

module.exports = {nftRequest,licenseRequest};