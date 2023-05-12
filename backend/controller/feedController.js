const asyncHandler = require("express-async-handler");


const data = require("../models/ipfs");
//@description     Get the feed to users
//@route           GET /api/feed/
//@access          Public
const feed = asyncHandler(async (req, res) => {
   
   //console.log(keyword)
    
   // console.log(req.user)

  const feeds = await data.aggregate([
    { $sample: { size: 5 } }
])
res.send(feeds)


});



//@description     Get the feed to users
//@route           GET /api/feed/
//@access          Public
const feedSearch = asyncHandler(async (req, res) => {
  const keyword=req.body.keyword
  //console.log(keyword)
   
  // console.log(req.user)
  const feeds = await data.find({ $or: [ 
    { name: { $regex: keyword, $options: "i" } },
    { username: { $regex: keyword, $options: "i" } },]},{password:0})
    .find({ _id: { $ne: req.user._id } });
  
res.send(feeds);


});


module.exports = { feed ,feedSearch};