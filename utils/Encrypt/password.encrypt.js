const bcrypt = require("bcryptjs");

module.exports = async (value, round) => {
  try {
    let salt = await bcrypt.genSalt(round);
    let hashed = await bcrypt.hash(value, salt);
    return hashed;
  } catch (err) {
    throw new Error(err);
  }
};
