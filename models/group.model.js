const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");
const User = require("./user.model");
const Message = require("./message.model");

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
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Không được để trống."],
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(groupSchema);

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

  await Message.deleteMany({ onModelId: doc._id }).exec();
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

module.exports = mongoose.model("Group", groupSchema);
