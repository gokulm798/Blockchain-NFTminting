
const express = require('express')
const dotenv = require("dotenv");
const path = require("path");
var cors=require('cors');





const {createIPFSNode}= require("./config/ipfsConnect.cjs")
const connectDB = require("./config/db");
const userRoutes =require('./routes/userRoutes');
const ipfsRoutes =require('./routes/ipfsRoutes');
const reqRoutes =require('./routes/reqRoutes');
const feedRoutes =require('./routes/feedRoutes');
var request = require('request-promise');
const {notFound,errorHandler}  = require('./middleware/errorMiddleware')


//const { protect } = require('./middleware/authMiddleware');
//const { authUser } = require('./controller/userController');

dotenv.config();
connectDB();

const app = express()

// const cors = require('cors')
const http = require('http').createServer(app)

app.use(express.json());
app.use(cors());

//app.use("/home",protect)
//app.use("/home/code/",protect)

app.use("/api/user",userRoutes);

app.use("/api/upload",ipfsRoutes);

app.use("/api/request",reqRoutes);

app.use("/api/feed",feedRoutes);






const PORT = process.env.PORT || 8000

//  app.use(express.static(__dirname + ''))
// app.options('*', cors())
// app.use(cors())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
/*app.use(express.static(path.join( __dirname,"../frontend/build")));
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','build','index.html'))
})*/



app.use(notFound)
app.use(errorHandler)

http.listen(PORT, () => {
    console.log(`Listening on  http://localhost:${PORT}`)
})