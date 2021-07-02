const User = require("../models/users");

const usersInDb=async()=>{
  const users= await User.find();
  console.log(users);
  return users.map(user=>user.json);

}
usersInDb();
module.exports = {

  usersInDb
};
