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
  socket.emit('newMessage', {
    from: 'someuserinserver@example.com',
    text: 'Hey, this is a message from the server.',
    createdAt: 123
  });
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });
});


server.listen(PORT, () => console.log(`Started on port ${PORT}`));
