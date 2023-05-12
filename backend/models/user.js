const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    username: { type: "String", unique: true, required: true, },
    password: { type: "String", required: true },
    
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const detailSchema = mongoose.Schema(
  {
    username: { type: "String", unique: true, required: true, },
    dateOfBirth: { type: "Date", required: true },
    bloodGroup: { type: "String", required: true },
    gender: { type: "String", required: true },
   
  },
  { timestamps: true }
);



const User = mongoose.model("User", userSchema);
const detail = mongoose.model("detail", detailSchema);




module.exports = {User,detail};