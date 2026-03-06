import express, { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';
import morgan from 'morgan';
import path from 'path';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


export default app;
