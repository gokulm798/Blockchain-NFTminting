const asyncHandler = require("express-async-handler");


const data = require("../models/ipfs");
//@description     Get the feed to users
//@route           GET /api/feed/
//@access          Public
const feed = asyncHandler(async (req, res) => {
   
   //console.log(keyword)
    
   // console.log(req.user)

  const feeds = await data.aggregate([
    { $sample: { size: 10 } }
])
res.send(feeds)


});



//@description     To  search feed to users
//@route           POST /api/feed/
//@access          Public
const feedSearch = asyncHandler(async (req, res) => {
  const keyword=req.body.keyword
  //console.log(keyword)
   
  // console.log(req.user)
  const feeds = await data.find( 
    { diagnosis_disease: { $regex: keyword, $options: "i" } },{})
    
  
res.send(feeds);


});


module.exports = { feed ,feedSearch};