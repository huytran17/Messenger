const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hash = require("../utils/Encrypt/password.encrypt");
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const userSchema = new Schema(
  {
    convs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
    grs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    username: {
      type: String,
      trim: true,
      minlength: [6, "Tối thiểu 6 ký tự."],
      maxlength: [32, "Tối đa 32 ký tự."],
      required: [true, "Không được để trống."],
    },
    password: {
      type: String,
      min: [8, "Tối thiểu 8 ký tự."],
      max: [32, "Tối đa 32 ký tự."],
      required: [true, "Không được để trống."],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Đã tồn tại."],
      required: [true, "Không được để trống."],
    },
    avatar_photo: {
      type: String,
      default: "",
      alias: "avatar",
    },
    cover_photo: {
      type: String,
      default: "",
      alias: "avatar",
    },
    role: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

mongoose_delete_plugin(userSchema);

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;

    return ret;
  },
});

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = { ...this.getUpdate() };

  if (update.password) update.password = await hash(update.password, 10);

  this.setUpdate(update);

  next();
});

userSchema.statics.findEmail = async function (email) {
  try {
    let user = await this.findOne({ email }, "+password").exec();

    return user;
  } catch (err) {
    return new Error(err);
  }
};

userSchema.statics.emailExists = async function (email) {
  try {
    let u = await this.exists({ email });

    return u;
  } catch (err) {
    return new Error(err);
  }
};

userSchema.statics.getAll = async function () {
  let users = await this.find({}).populate("convs").populate("grs").exec();

  return users;
};

userSchema.statics.getById = async function (id) {
  let user = await this.findOne(
    { _id: id },
    "-createdAt -updatedAt -deletedAt -deleted"
  )
    .populate({
      path: "convs",
      select: ["_id", "mems"],
      populate: { path: "mems", select: ["_id", "avatar_photo", "username"] },
    })
    .populate({
      path: "grs",
      select: ["_id", "mems", "name", "background_photo"],
      populate: { path: "mems", select: ["_id", "avatar_photo", "username"] },
      populate: { path: "createdBy", select: ["_id", "avatar_photo"] },
    })
    .exec();

  return user;
};

userSchema.statics.getByEmail = async function (email) {
  let user = await this.findOne({ email })
    .populate("convs")
    .populate("grs")
    .exec();

  return user;
};

userSchema.statics.updateInfo = async function (id, data) {
  let user = await this.findOneAndUpdate({ _id: id }, data, {
    new: true,
  }).exec();

  return user;
};

userSchema.statics.updateAvatar = async function (id, avatar_photo) {
  let user = await this.findByIdAndUpdate(
    id,
    { avatar_photo },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.updateCover = async function (id, cover_photo) {
  let user = await this.findByIdAndUpdate(
    id,
    { cover_photo },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.destroy = async function (id) {
  let user = await this.delete({ _id: id }).exec();

  return user;
};

userSchema.statics.addFriend = async function (id, fid) {
  let user = await this.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { friends: fid },
    },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.unfriend = async function (id, fid) {
  let user = await this.findOneAndUpdate(
    { _id: id },
    {
      $pull: { friends: fid },
    },
    { new: true }
  ).exec();

  return user;
};

module.exports = mongoose.model("User", userSchema);
