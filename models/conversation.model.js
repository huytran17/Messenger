const mongoose_delete = require("mongoose-delete");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rid: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    nickname: {
      type: String,
      trim: true,
      required: [true, "Nickname không được để trống."],
    },
  },
  { timestamp: true }
);

conversationSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Conversation", conversationSchema);
