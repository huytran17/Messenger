const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const infoSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    cid: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: [true, "Không được để trống."],
    },
    nickname: {
      type: String,
      trim: true,
      default: "",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(infoSchema);

module.exports = mongoose.model("Info", infoSchema);