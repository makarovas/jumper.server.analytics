// server.ts
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import TrackingDataModel from './TrackingDataModel';
import { trackEvent } from './googleAnalytics';

const PORT = 8001;

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

    await newTrackingData.save();
    res.status(200).send('Tracking data stored successfully');
  } catch (error) {
    console.error('Error storing tracking data:', error);
    res.status(500).send('An error occurred while storing tracking data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
