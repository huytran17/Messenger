const mongoose = require("mongoose");
const _CONF = require("../config/app");

const dbConnect = () => {
  main().catch((error) => {
    console.error(new Error(error.message));
  });

  async function main() {
    await mongoose.connect(_CONF.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");
  }
};

module.exports = dbConnect;
