const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");

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

friendRequestSchema.statics.accept = async function (sender, receiver) {
  try {
    const user = await User.addFriend(receiver, sender);
    await User.addFriend(sender, receiver);

    return user;
  } catch (err) {
    return new Error(err);
  }
};

friendRequestSchema.statics.decline = function (sender, receiver) {
  try {
    await this.findOneAndDelete({ sender, receiver }).exec();
  } catch (err) {
    return new Error(err);
  }
};

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
