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


module.exports = { feed };