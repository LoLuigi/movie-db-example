import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import serviceRouter from './routes/service.js';
import moviesRouter from './routes/movies.js';
import reviewsRouter from './routes/reviews.js';
import usersRouter from './routes/users.js'

// load environment variables
dotenv.config();
const { PORT } = process.env;

// create server
const app = express();

// apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// apply routes/controllers

app.use('/movies', moviesRouter);
app.use('/service', serviceRouter);
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
