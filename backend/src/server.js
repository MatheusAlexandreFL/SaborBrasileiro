require('dotenv').config({quiet: true});
const routes = require('./routes/routes');
const express = require('express');

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/login', (req, res) => {
    res.send('Login Page');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});