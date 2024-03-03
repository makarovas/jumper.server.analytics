import axios, { AxiosError } from 'axios';

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export async function trackEvent(userId: string, event: string): Promise<void> {
  const trackingData = {
    userId,
    event,
    timestamp: new Date().toISOString(),
  };

  try {
    await axios.post('https://analytics-api.com/track', trackingData);
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
