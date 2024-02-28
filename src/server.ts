import express from 'express';
import { trackEvent } from './googleAnalytics';

const app = express();
const PORT = 8001;

app.use(express.json());

// Sample route to track user interactions
app.post('/track', (req, res) => {
  const { userId, event } = req.body;

  // Track the event
  trackEvent(userId, event);

  res.status(200).send('Event tracked successfully');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
