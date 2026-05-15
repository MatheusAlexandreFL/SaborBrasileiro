require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});