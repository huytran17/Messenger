const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps }
);

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
