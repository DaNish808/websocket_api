const PORT = 8000;
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/*', (req, res) => {
  res.sendFile(__dirname + req.url);
});

io.on('connection', socket => {
  console.log('client connected!');
});

server.listen(PORT, () => console.log('server started on port:', PORT));