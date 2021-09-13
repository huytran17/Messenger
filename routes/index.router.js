const testRouter = require("./test.router");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");

const { verifyAccess } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  app.use("/", testRouter);
  app.use("/user", [userRouter]);
  app.use("/auth", authRouter);
};
