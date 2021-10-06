const moment = require("moment");

module.exports.dmyFormat = (date) => {
  return moment(date).format("DD/MM/yyyy");
};
