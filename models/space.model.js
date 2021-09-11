const mongoose_delete = require("mongoose-delete");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceShema = new Schema(
  {
    path: {
      type: String,
      trim: true,
      min: [1, "Tên space tối thiểu 1 ký tự."],
      max: [100, "Tên space tối đa 100 ký tự."],
    },
  },
  { timestamp: true }
);

spaceShema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Space", spaceShema);
