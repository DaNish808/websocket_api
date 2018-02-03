const PORT = 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('./src/io');

io.listen(server);

app.use(express.static('public-react/build'));




server.listen(PORT, () => console.log('server started on port:', PORT));