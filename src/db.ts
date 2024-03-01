import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/trackingdb';

mongoose
  .connect(MONGODB_URI, {
  } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

export default mongoose.connection;
