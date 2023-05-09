const mongoose = require("mongoose");


const accountSchema = mongoose.Schema(
  {
    
    owner_username: { type: "String", required: true, },
    address: { type: "String", required: true },
       
  },
  { timestamps: true }
);


const account = mongoose.model("account", accountSchema);

module.exports = account;