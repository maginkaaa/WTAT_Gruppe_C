let io;
exports.initSocket = (server) => {
    io = require("socket.io")(server, { cors: {origin: "*"}});
};

exports.sendNotification = (job) => {
    io.sockets.emit('jobNotification', job);
}
