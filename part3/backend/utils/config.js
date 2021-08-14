require('dotenv').config();
const envo=process.env.NODE_ENV
const PORT=process.env.PORT
let MONGODB_URI
MONGODB_URI=process.env.MONGODB_URI2
/* if(envo==='test'){
    MONGODB_URI=process.env.MONGODB_URI2
}
else{
    MONGODB_URI=process.env.MONGODB_URI

}
console.log(envo)
 */

module.exports={
    PORT,
    MONGODB_URI
}