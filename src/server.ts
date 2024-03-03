import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import dotenv from 'dotenv';
import TrackingDataModel from './TrackingDataModel';
import { trackEvent } from './googleAnalytics';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const PORT = process.env.PORT!;

mongoose.connect(MONGODB_URI, {} as ConnectOptions);
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

const newTrackingData = new TrackingDataModel({
  eventType: 'click',
  eventData: { action: 'button_click', page: 'homepage' },
  timestamp: new Date(),
});

newTrackingData
  .save()
  .then((result) => {
    console.log('New tracking data saved successfully:', result);
  })
  .catch((error) => {
    console.log('Error saving tracking data:', error);
  });

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.post('/track', async (req: Request, res: Response) => {
  const { userId, event } = req.body;
  if (!userId || !event) {
    return res.status(400).send('Missing userId or event data');
  }

  try {
    await trackEvent(userId, event);
    res.status(200).send('Event tracked successfully');
  } catch (error) {
    console.error('Error tracking event:', error);
    res.status(500).send('An error occurred while tracking event');
  }
});

app.post('/trackEventData', async (req: Request, res: Response) => {
  const { userId, eventType, eventData } = req.body;
  if (!userId || !eventType || !eventData) {
    return res.status(400).send('Missing userId, eventType, or eventData');
  }

  try {
    const newTrackingData = new TrackingDataModel({
      userId,
      eventType,
      eventData,
    });

    newTrackingData
      .save()
      .then(() => {
        res.status(200).send('Tracking data stored successfully');
      })
      .catch((error) => {
        console.error('Error storing tracking data:', error);
        res.status(500).send('An error occurred while storing tracking data');
      });
  } catch (error) {
    console.error('Error saving tracking data:', error);
    res.status(500).send('An error occurred while saving tracking data');
  }
});
