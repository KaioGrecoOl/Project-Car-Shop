import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import Carroute from './routes/carsRoute';

const app = express();
app.use(express.json());
app.use(Carroute);
app.use(errorHandler);

export default app;
