const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const conversationSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    rid: {
      type: Schema.Types.ObjectId,
      ref: "Room",
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

mongoose_delete_plugin(userSchema);

module.exports = mongoose.model("Conversation", conversationSchema);
