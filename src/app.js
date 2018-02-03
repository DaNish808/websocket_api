const express = require('express');


const app = express();

app.use(express.static('public-react/build'));


module.exports = app;