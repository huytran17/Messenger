const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const messageSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    onModelId: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
      required: [true, "Không được để trống."],
    },
    onModel: {
      type: String,
      enum: ["Conversation", "Group"],
      required: [true, "Không được để trống."],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Không được để trống."],
    },
    file_path: {
      type: String,
      trim: true,
      default: "",
      alias: "filepath",
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(messageSchema);

module.exports = mongoose.model("Message", messageSchema);
