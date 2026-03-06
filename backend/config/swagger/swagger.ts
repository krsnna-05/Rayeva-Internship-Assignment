import type { Express } from 'express';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import devEnv from '../ts-env/dev-env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Commerce API',
      version: '1.0.0',
      description: 'API documentation for AI-powered commerce tools',
    },
    servers: [
      {
        url: `http://localhost:${devEnv.PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, '../../src/routes/*.ts')],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at http://localhost:${devEnv.PORT}/api-docs`);
}