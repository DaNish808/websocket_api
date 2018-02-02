const PORT = 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public-react/build'));

io.on('connection', socket => {
  console.log('client connected!');

  socket.on('message-all', msg => {
    console.log(msg);
    io.emit('message-all', msg);
  });

  socket.on('disconnect', () => console.log('client disconnected'));
});

server.listen(PORT, () => console.log('server started on port:', PORT));