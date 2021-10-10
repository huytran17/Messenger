const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hash = require("../utils/Encrypt/password.encrypt");
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");
const { mdyhmsFormat, mdyFormat } = require("../utils/Datetime/format");

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
    nickname: {
      type: String,
      trim: true,
      min: [2, "Tối thiểu 2 ký tự."],
      max: [20, "Tối đa 20 ký tự."],
    },
    phone: {
      type: String,
      trim: true,
      min: [10, "Tối thiểu 10 ký tự."],
      max: [12, "Tối đa 12 ký tự."],
    },
    address: {
      type: String,
      trim: true,
      min: [2, "Tối thiểu 2 ký tự."],
      max: [255, "Tối đa 255 ký tự."],
    },
    gender: {
      type: Number,
      default: 1, //1: male, 2: female, 3: other
      enum: [1, 2, 3],
    },
    relationship: {
      type: Number,
      default: 1, //1: single, 2: in a relatioship, 3: dating, 4: married
      enum: [1, 2, 3, 4],
    },
    bio: {
      type: String,
      trim: true,
      min: [2, "Tối thiểu 2 ký tự."],
      max: [255, "Tối đa 255 ký tự."],
    },
    quote: {
      type: String,
      trim: true,
      min: [2, "Tối thiểu 2 ký tự."],
      max: [255, "Tối đa 255 ký tự."],
    },
    dob: {
      type: Date,
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

    ret.dob = mdyFormat(ret.dob);
    ret.createdAt = mdyhmsFormat(ret.createdAt);
    ret.updatedAt = mdyhmsFormat(ret.updatedAt);

    return ret;
  },
});

userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = { ...this.getUpdate() };

  if (update.password) {
    update.password = await hash(update.password, 10);
    this.setUpdate(update);
  }

  next();
});

userSchema.statics.findEmail = async function (email) {
  try {
    const user = await this.findOne({ email }, "+password").exec();

    return user;
  } catch (err) {
    return new Error(err);
  }
};

userSchema.statics.emailExists = async function (email) {
  try {
    const u = await this.exists({ email });

    return u;
  } catch (err) {
    return new Error(err);
  }
};

userSchema.statics.getAll = async function () {
  const users = await this.find({}).populate("convs").populate("grs").exec();

  return users;
};

userSchema.statics.getById = async function (id) {
  const user = await this.findById(id)
    .populate({
      path: "convs",
      populate: { path: "mems" },
    })
    .populate({
      path: "grs",
      populate: [{ path: "mems" }, { path: "createdBy" }],
    })
    .exec();

  return user;
};

userSchema.statics.getByEmail = async function (email) {
  const user = await this.findOne({ email })
    .populate("convs")
    .populate("grs")
    .exec();

  return user;
};

userSchema.statics.updateInfo = async function (id, data) {
  const user = await this.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate({
      path: "convs",
      populate: { path: "mems" },
    })
    .populate({
      path: "grs",
      populate: [{ path: "mems" }, { path: "createdBy" }],
    })
    .exec();

  return user;
};

userSchema.statics.updateAvatar = async function (id, avatar_photo) {
  const user = await this.findByIdAndUpdate(
    id,
    { avatar_photo },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.updateCover = async function (id, cover_photo) {
  const user = await this.findByIdAndUpdate(
    id,
    { cover_photo },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.updatePassword = async function (id, new_password) {
  const user = await this.findOneAndUpdate(
    { _id: id },
    { password: new_password },
    { new: true }
  ).exec();

  return user; //TODO: sau khi đổi mật khẩu thì đăng xuất và đăng nhập lại
};

userSchema.statics.destroy = async function (id) {
  const user = await this.delete({ _id: id }).exec();

  return user;
};

userSchema.statics.addFriend = async function (id, fid) {
  const user = await this.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { friends: fid },
    },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.unfriend = async function (id, fid) {
  const user = await this.findOneAndUpdate(
    { _id: id },
    {
      $pull: { friends: fid },
    },
    { new: true }
  ).exec();

  return user;
};

userSchema.statics.register = async function (data) {
  const user = await new this(data).save();

  return user;
};

module.exports = mongoose.model("User", userSchema);
