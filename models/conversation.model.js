const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");
const Message = require("./message.model");
const Info = require("./info.model");

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
      default: "#dddddd",
    },
    background_photo: {
      type: String,
      default: "",
      alias: "bg",
    },
  },
  { timestamps: true }
);

conversationSchema.post("save", async function (doc) {
  for (const memid of doc.mems) {
    await User.findByIdAndUpdate(memid, {
      $addToSet: { convs: doc._id },
    }).exec();
  }
});

conversationSchema.post("findOneAndDelete", async function (doc) {
  for (const memid of doc.mems) {
    await User.findByIdAndUpdate(memid, {
      $pull: { convs: doc._id },
    }).exec();
  }

  await Message.deleteMany({ mid: doc._id }).exec();
  await Info.deleteMany({ mid: doc._id }).exec();
});

module.exports = mongoose.model("Conversation", conversationSchema);
