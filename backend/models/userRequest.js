const mongoose = require("mongoose");


const requestSchema = mongoose.Schema(
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


const nftRequest = mongoose.model("nftRequest", requestSchema);

module.exports = nftRequest;