const User = require("../../models/user.model");

module.exports = async (email) => {
  const u = await User.exists({ email });
  return u;
};
