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
  { timestamps: true }
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

friendRequestSchema.statics.decline = async function (sender, receiver) {
  try {
    const user = await this.findOneAndDelete({ sender, receiver }).exec();

    return user;
  } catch (err) {
    return new Error(err);
  }
};

friendRequestSchema.statics.store = async function (data) {
  try {
    const user = await new this(data).save();

    return user;
  } catch (err) {
    return new Error(err);
  }
};

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
