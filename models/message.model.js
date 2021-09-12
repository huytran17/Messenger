const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const messageSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rid: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    content: {
      type: String,
      trim: true,
    },
    file_path: {
      type: String,
      trim: true,
      alias: "filepath",
    },
  },
  { timestamps: true }
);

mongoose_delete(userSchema);

module.exports = mongoose.model("Message", messageSchema);
