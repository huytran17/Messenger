const mongoose_delete = require("mongoose-delete");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rid: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    content: {
      type: String,
      trim: true,
    },
    file_path: {
      type: String,
      trim: true,
      alias: "filepath",
    },
  },
  { timestamp: true }
);

messageSchema.plugin(mongoose_delete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

module.exports = mongoose.model("Message", messageSchema);
