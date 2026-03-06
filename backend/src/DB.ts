import devEnv from 'config/ts-env/dev-env';
import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    await connect(devEnv.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
