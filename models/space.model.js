const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const spaceShema = new Schema(
  {
    path: {
      type: String,
      trim: true,
      min: [1, "Tên space tối thiểu 1 ký tự."],
      max: [100, "Tên space tối đa 100 ký tự."],
    },
  },
  { timestamps: true }
);

mongoose_delete(userSchema);

module.exports = mongoose.model("Space", spaceShema);
