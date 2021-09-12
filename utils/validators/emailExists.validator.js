const User = require("../../models/user.model");

module.exports = async (email) => {
  let u = await User.emailExists(email);
  return u;
};
