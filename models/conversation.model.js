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

conversationSchema.statics.getAll = async function () {
  let conversations = await this.find({}).populate("mems").exec();

  return conversations;
};

conversationSchema.statics.getById = async function (id) {
  let conversation = await this.findById(id).populate("mems").exec();

  return conversation;
};

conversationSchema.statics.store = async function (data) {
  let conversation = await new this(data).save();

  return conversation;
};

conversationSchema.statics.updateBackground = async function (
  id,
  background_photo
) {
  let conversation = await this.findByIdAndUpdate(
    id,
    { background_photo },
    {
      new: true,
    }
  ).exec();

  return conversation;
};

conversationSchema.statics.updateInfo = async function (id, data) {
  let conversation = await this.findByIdAndUpdate(id, data, {
    new: true,
  });

  return conversation;
};

conversationSchema.statics.destroy = async function (id) {
  let conversation = await this.findOneAndDelete({ _id: id }).exec();

  return conversation;
};

module.exports = mongoose.model("Conversation", conversationSchema);
