import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.ENVIRONMENT,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

