require('dotenv').config();

const PORT=process.env.PORT
const ENV=process.env.NODE_ENV
const MONGODB_URI=ENV==='test'?process.env.MONGO_TEST_URI:process.env.MONGODB_URI
console.log(MONGODB_URI)
module.exports={
    PORT,
    MONGODB_URI
}