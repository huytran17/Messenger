const User = require("../models/user.model");

module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    if (users.length) return res.status(200).json(users);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
