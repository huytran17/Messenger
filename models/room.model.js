const mongoose_delete = require("mongoose-delete");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [1, "Tên phòng tối thiểu 1 ký tự."],
      maxlength: [100, "Tên phòng tối đa 100 ký tự."],
      required: [true, "Tên phòng không được để trống"],
    },
    nspid: {
      type: Schema.Types.ObjectId,
      ref: "Space",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    head_photo_path: {
      type: String,
      trim: true,
      alias: "headphoto",
    },
    background_photo_path: {
      type: String,
      trim: true,
      alias: "bgphoto",
    },
  },
  { timestamp: true }
);

roomSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Room", roomSchema);
