const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(path.join(__dirname, '..', 'public')));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
        ...newMessage,
        createdAt: new Date().getTime()
    });
  });
});


server.listen(PORT, () => console.log(`Started on port ${PORT}`));
