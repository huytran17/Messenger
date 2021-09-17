const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const conversationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
      alias: "bg",
    },
    chathead_photo_path: {
      type: String,
      alias: "headphoto",
    },
    type: {
      type: Number,
      default: 1,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(conversationSchema);

module.exports = mongoose.model("Conversation", conversationSchema);
