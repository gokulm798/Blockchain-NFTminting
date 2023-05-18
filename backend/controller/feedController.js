const asyncHandler = require("express-async-handler");


const {dupdata} = require("../models/ipfs");
const diagnosis = require("../models/diagnosis");
//@description     Get the feed to users
//@route           GET /api/feed/
//@access          Public
const feed = asyncHandler(async (req, res) => {
   
   //console.log(keyword)
    
   // console.log(req.user)

  const feeds = await dupdata.aggregate([
    { $sample: { size: 10 } }
])
res.send(feeds)


});


//@description     Get the disease detail to users
//@route           GET /api/feed/diagnosis
//@access          Public
const displayDisease = asyncHandler(async (req, res) => {
   
  //console.log(keyword)
   
  // console.log(req.user)

 const diseases = await diagnosis.find()

res.send(diseases)


});



//@description     To  search feed to users
//@route           POST /api/feed/
//@access          Public
const feedSearch = asyncHandler(async (req, res) => {
  const keyword=req.body.keyword
  //console.log(keyword)
   
  // console.log(req.user)
  const feeds = await dupdata.find( 
    { diagnosis_disease: { $regex: keyword, $options: "i" } },{})
    
  
res.send(feeds);


});


module.exports = { feed ,feedSearch,displayDisease};