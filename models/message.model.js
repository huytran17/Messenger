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
    content: {
      type: String,
      trim: true,
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

messageSchema.statics.getByModelId = async function (mid) {
  let messages = await this.findWithDeleted({ mid })
    .populate({
      path: "mid",
      populate: {
        path: "mems",
      },
    })
    .exec();

  return messages;
};

messageSchema.statics.store = async function (onModel, uid, mid, content) {
  let message = await new this({
    uid,
    mid,
    onModel,
    content,
  }).save();

  return message;
};

messageSchema.statics.storeFile = async function (
  onModel,
  uid,
  mid,
  file_path
) {
  let message = await new this({
    uid,
    mid,
    onModel,
    file_path,
  }).save();

  return message;
};

messageSchema.statics.destroy = async function (id) {
  let message = await this.delete({ _id: id }).exec();

  return message;
};

mongoose_delete_plugin(messageSchema);

module.exports = mongoose.model("Message", messageSchema);
