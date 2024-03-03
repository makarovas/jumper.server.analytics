import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import TrackingDataModel from './TrackingDataModel';
import { trackApiEvent } from './googleAnalytics';

dotenv.config();

const app = express();
const NODE_MONGODB_URI = process.env.NODE_MONGODB_URI!;
const PORT = process.env.PORT!;

mongoose.connect(NODE_MONGODB_URI, {} as ConnectOptions);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

app.use(express.json());

app.post('/track', async (req: Request, res: Response) => {
  const { userId, event, eventData } = req.body;
  if (!userId || !event || !eventData) {
    return res.status(400).send('Missing userId, event, or eventData');
  }

  try {
    const newTrackingData = new TrackingDataModel({
      userId,
      eventType: event,
      eventData,
      timestamp: new Date(),
    });
    await newTrackingData.save();

    await trackApiEvent(userId, event);

    res.status(200).send('Data saved and tracked successfully');
  } catch (error) {
    console.error('Error saving or tracking data:', error);
    res.status(500).send('An error occurred while processing data');
  }
});
