require('dotenv').config({quiet: true});
const routes = require('./routes/routes');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});