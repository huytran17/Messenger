const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const roomSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [1, "Tối thiểu 1 ký tự."],
      maxlength: [100, "Tối đa 100 ký tự."],
      required: [true, "Không được để trống."],
    },
    nspid: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: [true, "Không được để trống."],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    head_photo_path: {
      type: String,
      trim: true,
      alias: "headphoto",
      default: "",
    },
    background_photo_path: {
      type: String,
      trim: true,
      alias: "bgphoto",
      default: "",
    },
  },
  { timestamps: true }
);

mongoose_delete(userSchema);

module.exports = mongoose.model("Room", roomSchema);
