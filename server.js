const PORT = 3001;
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(req.body);
}
)
app.post('/', (req, res) => {
    res.send(req.body);
})

app.listen(PORT, () => console.log('server started on port', PORT));