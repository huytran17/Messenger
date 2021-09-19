const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const groupSchema = new Schema(
  {
    mems: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Không được để trống."],
      },
    ],
    name: {
      type: String,
      trim: true,
      min: [1, "Tối thiểu 1 ký tự."],
      max: [255, "Tối thiểu 255 ký tự."],
      required: [true, "Không được để trống."],
    },
    color: {
      type: String,
      trim: true,
      defaul: "#dddddd",
    },
    background_photo: {
      type: String,
      default: "",
      alias: "bg",
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(groupSchema);

module.exports = mongoose.model("Group", groupSchema);
