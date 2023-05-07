const asyncHandler = require("express-async-handler");

const generateToken = require("../config/generateToken");
const User = require("../models/user");
const data = require("../models/ipfs");

//@description     Get or Search all users
//@route           GET /api/user/search
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
   const keyword=req.body.keyword
   //console.log(keyword)
    
   // console.log(req.user)
   const users = await User.find({ $or: [ 
    { name: { $regex: keyword, $options: "i" } },
    { username: { $regex: keyword, $options: "i" } },]},{password:0})
    .find({ _id: { $ne: req.user._id } });
  res.send(users);


});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username|| !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    password,
    
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
//@description     Get Patient's History
//@route           GET /api/user/history
//@access          Public
const history = asyncHandler(async (req, res) => {
 
   
  //console.log(req.user)
  const historyData = await data.find({ patient_username :req.user.username })
res.send(historyData)


 
});


module.exports = { registerUser, authUser ,allUsers, history};