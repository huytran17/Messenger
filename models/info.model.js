const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    mid: {
      type: Schema.Types.ObjectId,
      refPath: "onModel",
      required: [true, "Không được để trống."],
    },
    onModel: {
      type: String,
      enum: ["Conversation", "Group"],
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

module.exports = mongoose.model("Info", infoSchema);
