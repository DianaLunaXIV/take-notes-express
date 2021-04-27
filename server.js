const express = require('express');

const PORT = process.env.PORT || 4040;

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('./public'));

app.get('/', (req, res) => res.send('Hello world'))