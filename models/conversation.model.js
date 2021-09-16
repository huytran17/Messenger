const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_delete_plugin = require("../utils/Plugins/mongoseDelete.plugin");

const conversationSchema = new Schema({ timestamps: true });

mongoose_delete_plugin(userSchema);

module.exports = mongoose.model("Conversation", conversationSchema);
