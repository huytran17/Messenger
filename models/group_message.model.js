const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const groupMessageSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    gid: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: [true, "Không được để trống."],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Không được để trống."],
    },
    file: {
      type: String,
      default: "",
      alias: "filepath",
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(groupMessageSchema);

module.exports = mongoose.model("GroupMessage", groupMessageSchema);
