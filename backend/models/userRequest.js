const mongoose = require("mongoose");


const mintRequestSchema = mongoose.Schema(
  {
    request_to: { type: "String", required: true },
    isAccept : { type: "Boolean", default:false },
    isUserRead:{type:"Boolean",default:false},
    sender_username:{type:"String",required:true},
    Content:{type:"String",required:true},
    isSenderRead:{type:"Boolean",default:false},
   
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
    Content:{type:"String",required:true},
    isSenderRead:{type:"Boolean",default:false},
   
  },
  { timestamps: true }
);

const licenseRequest = mongoose.model("licenseRequest",licenseRequestSchema);

module.exports = {nftRequest,licenseRequest};