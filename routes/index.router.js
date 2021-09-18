const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const pwdRouter = require("./pwd.router");
const conversationRouter = require("./conversation.router");
const { verifyAccess } = require("../middlewares/verifyAccess.middleware");

module.exports = (app) => {
  app.use("/auth", authRouter);

  app.use("/users", [verifyAccess, userRouter]);

  app.use("/conversations", [verifyAccess, conversationRouter]);

  app.use("/forget-pwd", pwdRouter);
};
