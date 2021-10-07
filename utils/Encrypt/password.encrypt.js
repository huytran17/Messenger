const bcrypt = require("bcryptjs");

module.exports = async (value, round) => {
  try {
    const salt = await bcrypt.genSalt(round);
    const hashed = await bcrypt.hash(value, salt);
    return hashed;
  } catch (err) {
    throw new Error(err);
  }
};
