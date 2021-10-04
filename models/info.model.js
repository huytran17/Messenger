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

infoSchema.statics.getInfo = async function (uid, mid) {
  let infos = await this.find({ uid, mid }).exec();

  return infos;
};

infoSchema.statics.store = async function (uid, mid, onModel, data) {
  let info = await new this({ uid, mid, onModel }, data).save();

  return info;
};

infoSchema.statics.updateInfo = async function (uid, mid, data) {
  let info = await this.findOneAndUpdate(
    { uid, mid },
    { data },
    { new: true }
  ).exec();

  return info;
};

infoSchema.statics.destroy = async function (id) {
  let info = await this.findByIdAndDelete(id);

  return info;
};

module.exports = mongoose.model("Info", infoSchema);
