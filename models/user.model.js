const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hash = require("../utils/Encrypt/password.encrypt");
const mongoose_delete = require("../utils/Plugins/mongoseDelete.plugin");

const userSchema = new Schema(
  {
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
    avatar_photo_path: {
      type: String,
      trim: true,
      default: "",
      alias: "avatar",
    },
  },
  { timestamps: true }
);

mongoose_delete(userSchema);

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
  let update = { ...this.getUpdate() };
  if (update.password) {
    update.password = await hash(update.password, 10);
  }
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

module.exports = mongoose.model("User", userSchema);
