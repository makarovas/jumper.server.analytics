import axios, { AxiosError } from 'axios';

const NODE_GA_MEASUREMENT_ID = process.env.NODE_GA_MEASUREMENT_ID!;

export async function trackEvent(userId: string, event: string): Promise<void> {
  const trackingData = {
    v: '1',
    tid: NODE_GA_MEASUREMENT_ID,
    cid: userId,
    t: 'event',
    ec: 'yourEventCategory',
    ea: event,
    ev: '1',
  };

  try {
    await axios.post('https://www.google-analytics.com/collect', trackingData);
    console.log('Event tracked successfully');
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Request failed with status:', axiosError.response.status);
    } else if (axiosError.request) {
      console.error('Request failed:', axiosError.request);
    } else {
      console.error('Error:', axiosError.message);
    }
    throw new Error('Failed to track event');
  }
}
