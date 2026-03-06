import express from 'express';
import morgan from 'morgan';

import { connectDB } from './DB';
import categoryRouter from './routes/categroy.route';
import proposalRouter from './routes/proposal.route';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

connectDB();

// API routes
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/proposal', proposalRouter);

export default app;
