const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const pwdRouter = require("./pwd.router");
const conversationRouter = require("./conversation.router");
const groupRouter = require("./group.router");
const messageRouter = require("./message.router");
const infoRouter = require("./info.router");
const homeRouter = require("./home.router");
const testRouter = require("./test.router");
const { verifyAccess } = require("../middlewares/verifyAccess.middleware");

module.exports = (app) => {
  app.use("/test", testRouter);

  app.use("/home", [verifyAccess, homeRouter]);

  app.use("/auth", authRouter);

  app.use("/users", [verifyAccess, userRouter]);

  app.use("/conversations", [verifyAccess, conversationRouter]);

  app.use("/groups", [verifyAccess, groupRouter]);

  app.use("/messages", [verifyAccess, messageRouter]);

  app.use("/info", [verifyAccess, infoRouter]);

  app.use("/auth", pwdRouter);
};
