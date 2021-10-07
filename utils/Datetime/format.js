const moment = require("moment");

module.exports.dmyFormat = (date) => {
  return moment(date).format("DD/MM/yyyy");
};

module.exports.dmyhmsFormat = (date) => {
  return moment(date).format("DD/MM/yyyy H:mm:ss");
};

module.exports.mdyFormat = (date) => {
  return moment(date).format("MM/DD/yyyy");
};

module.exports.mdyhmsFormat = (date) => {
  return moment(date).format("MM/DD/yyyy H:mm:ss");
};
