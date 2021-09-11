const testRouter = require("./test.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  app.use("/", testRouter);
  app.use("/user", userRouter);
};
