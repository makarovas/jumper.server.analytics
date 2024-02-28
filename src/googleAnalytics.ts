import axios from 'axios';
require('dotenv').config();

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

console.log(GA_MEASUREMENT_ID);

export function trackEvent(userId: string, event: string): void {
  const payload = {
    v: '1',
    tid: GA_MEASUREMENT_ID,
    cid: userId,
    t: 'event',
    ec: 'User Interaction',
    ea: event,
  };

  axios
    .post('https://www.google-analytics.com/collect', null, { params: payload })
    .then(() => console.log('Event sent to Google Analytics'))
    .catch((error) =>
      console.error('Error sending event to Google Analytics:', error)
    );
}
