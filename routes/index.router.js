const testRouter = require("./test.router");
const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const pwdRouter = require("./pwd.router");
const { verifyAccess } = require("../middlewares/verifyAccess.middleware");

module.exports = (app) => {
  app.use("/", testRouter);

  app.use("/auth", authRouter);

  app.use("/users", [verifyAccess, userRouter]);

  app.use("/forget-pwd", pwdRouter);
};
