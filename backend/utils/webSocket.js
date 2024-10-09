const socketIo = require('socket.io');
let io;

exports.setupWebSocket = (server) => {
  io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

exports.emitOrderStatusUpdate = (orderId, status) => {
  io.emit(`order_${orderId}_status`, { status });
};
