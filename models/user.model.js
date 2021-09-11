const mongoose_delete = require("mongoose-delete");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: 6,
      required: [true, "Tên đăng nhập không được để trống."],
    },
    password: {
      type: String,
      min: [8, "Mật khẩu tối thiểu 8 ký tự."],
      max: [32, "Mật khẩu tối đa 32 ký tự."],
      set: (v) => {
        let salt = bcrypt.genSalt(10);
        bcrypt.hash(v, salt);
      },
      required: [true, "Mật khẩu không được để trống."],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "Email đã tồn tại."],
      required: [true, "Email không được để trống."],
    },
    avatar_photo_path: {
      type: String,
      trim: true,
      alias: "avatar",
    },
  },
  { timestamp: true }
);

userSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

module.exports = mongoose.model("User", userSchema);
