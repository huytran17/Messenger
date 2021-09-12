const mongoose_delete = require("mongoose-delete");

module.exports = (schema) => {
  schema.plugin(mongoose_delete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: true,
  });
};
