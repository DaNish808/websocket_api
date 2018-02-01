const PORT = 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('client connected!');
});

server.listen(PORT, () => console.log('server started on port:', PORT));