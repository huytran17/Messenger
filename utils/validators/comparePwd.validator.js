const bcrypt = require("bcryptjs");

module.exports = async (pwd, hpwd) => {
  try {
    const isPassed = await bcrypt.compare(pwd, hpwd);
    return isPassed;
  } catch (err) {
    return new Error(err);
  }
};
