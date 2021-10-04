const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");
const Message = require("./message.model");
const Info = require("./info.model");

const groupSchema = new Schema(
  {
    mems: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Không được để trống."],
      },
    ],
    name: {
      type: String,
      trim: true,
      min: [1, "Tối thiểu 1 ký tự."],
      max: [255, "Tối thiểu 255 ký tự."],
      required: [true, "Không được để trống."],
    },
    color: {
      type: String,
      trim: true,
      defaul: "#dddddd",
    },
    background_photo: {
      type: String,
      default: "",
      alias: "bg",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps: true }
);

groupSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.created_by, {
    $addToSet: { grs: doc._id },
  }).exec();
});

groupSchema.post("findOneAndDelete", async function (doc) {
  for (const memid of doc.mems) {
    await User.findByIdAndUpdate(memid, {
      $pull: { grs: doc._id },
    }).exec();
  }

  await Message.deleteMany({ mid: doc._id }).exec();
  await Info.deleteMany({ mid: doc._id }).exec();
});

groupSchema.post("findOneAndUpdate", async function (doc) {
  const update = { ...this.getUpdate() };

  if (update.$addToSet) {
    let uid = update.$addToSet.mems.toString("hex");

    await User.findByIdAndUpdate(uid, {
      $addToSet: { grs: doc._id },
    }).exec();
  } else if (update.$pull) {
    let uid = update.$pull.mems.toString("hex");

    await User.findByIdAndUpdate(uid, {
      $pull: { grs: doc._id },
    }).exec();
  }
});

groupSchema.statics.getAll = async function () {
  let groups = await this.find({})
    .populate("mems")
    .populate({ path: "created_by", select: "_id" })
    .exec();

  return groups;
};

groupSchema.statics.getById = async function (id) {
  let group = await this.findById(id)
    .populate("mems")
    .populate({ path: "created_by", select: "_id" })
    .exec();

  return group;
};

groupSchema.statics.store = async function (data) {
  let group = await new this(data).save();

  return group;
};

groupSchema.statics.updateInfo = async function (id, data) {
  let group = await this.findByIdAndUpdate(id, data, { new: true }).exec();

  return group;
};

groupSchema.statics.updateBackground = async function (id, background_photo) {
  let group = await this.findByIdAndUpdate(
    id,
    { background_photo },
    { new: true }
  ).exec();

  return group;
};

groupSchema.statics.destroy = async function (id) {
  let group = await this.findOneAndDelete({ _id: id }).exec();

  return group;
};

groupSchema.statics.leave = async function (gid, uid) {
  let group = await this.findOneAndUpdate(
    { _id: gid },
    {
      $pull: { mems: uid },
    },
    { new: true }
  ).exec();

  return group;
};

groupSchema.statics.join = async function (gid, uid) {
  let group = await this.findOneAndUpdate(
    { _id: gid },
    {
      $addToSet: { mems: uid },
    },
    { new: true }
  ).exec();

  return group;
};

module.exports = mongoose.model("Group", groupSchema);
