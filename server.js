const app = require('./src/app');
const server = require('http').Server(app);
const io = require('./src/io');
const PORT = 8000;


io.listen(server);

server.listen(PORT, () => console.log('server started on port:', PORT));