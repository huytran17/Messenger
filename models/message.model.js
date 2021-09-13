const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const messageSchema = new Schema(
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

mongoose_delete(userSchema);

module.exports = mongoose.model("Message", messageSchema);
