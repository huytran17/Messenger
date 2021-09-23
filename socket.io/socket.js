const socketIO = require("socket.io");

module.exports.listen = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(async (socket, next) => {
    next();
  });

  io.on("connection", (socket) => {
    console.log("socket: an user conncetd");
  });
};
