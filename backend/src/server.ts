import express from 'express';
import morgan from 'morgan';

import { setupSwagger } from '../config/swagger/swagger';
import { connectDB } from './DB';
import productRouter from './routes/product.route';
import proposalRouter from './routes/proposal.route';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Swagger setup
setupSwagger(app);

// API routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/proposal', proposalRouter);

app.use('/health', (req, res) => {
  res.status(200).json({
    status: 'OK 😀',
    service: 'rayeva-ai-api',
    timestamp: new Date().toISOString(),
  });
});

export default app;
