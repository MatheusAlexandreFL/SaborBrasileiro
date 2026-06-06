import 'dotenv/config.js';
import routes from './routes/routes.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
