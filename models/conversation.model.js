const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const conversationSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rid: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    nickname: {
      type: String,
      trim: true,
      required: [true, "Nickname không được để trống."],
    },
  },
  { timestamps: true }
);

mongoose_delete(userSchema);

module.exports = mongoose.model("Conversation", conversationSchema);
