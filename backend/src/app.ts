import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
	res.json({ message: 'Hello World' });
	next();
});

export default app;
