const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const conversationSchema = new Schema(
  {
    mems: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Không được để trống."],
      },
    ],
    color: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
      alias: "bg",
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(conversationSchema);

module.exports = mongoose.model("Conversation", conversationSchema);
