const PORT = 8080;

const express = require('express');
const app = express();
const server = require('https').createServer(app);
const IO = require('socket.io');
// const io = require('socket.io').listen(server);
// const cors = require('cors')();

app.use(express.static('./public'));
app.use(express.json());
// app.use(cors);

app.get('/', (req, res) => {
    res.send(req.body);
}
)
app.post('/', (req, res) => {
    console.log('test fetch')
    res.send(req.body);
})


const io = new IO(server, {
    serveClient: false
}).listen(server);
io.on('connection', socket => console.log('connection!'))
// io.sockets.on('connection', socket => console.log('connection!'))


app.listen(PORT, () => console.log('server started on port', PORT));