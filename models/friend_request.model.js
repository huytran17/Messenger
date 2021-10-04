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

friendRequestSchema.statics.getBySender = async function (sender) {
  let frqs = await this.find({ sender }, "-sender")
    .populate("receiver", "username friends avatar_photo cover_photo")
    .exec();

  return frqs;
};

friendRequestSchema.statics.getByReceiver = async function (receiver) {
  let frqs = await this.find({ receiver }, "-receiver")
    .populate("sender", "username friends avatar_photo cover_photo")
    .exec();

  return frqs;
};

friendRequestSchema.statics.accept = async function (sender, receiver) {
  let user = await User.addFriend(receiver, sender);

  await User.addFriend(sender, receiver);

  return user;
};

friendRequestSchema.statics.decline = async function (sender, receiver) {
  let user = await this.findOneAndDelete({ sender, receiver }).exec();

  return user;
};

friendRequestSchema.statics.store = async function (data) {
  let user = await new this(data).save();

  return user;
};

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
