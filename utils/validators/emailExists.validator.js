const User = require("../../models/user.model");

module.exports = async (email) => {
  const u = await User.findOne({ email }, "_id").exec();
  return u;
};
