import axios, { AxiosError } from 'axios';

const NODE_GA_MEASUREMENT_ID = process.env.NODE_GA_MEASUREMENT_ID!;
const NODE_GOOGLE_ANALYTICS_API_URL =
  process.env.NODE_GOOGLE_ANALYTICS_API_URL!;

export async function trackApiEvent(
  userId: string,
  event: string,
  sessionData: any
): Promise<void> {
  if (!NODE_GA_MEASUREMENT_ID) {
    console.error('GA_MEASUREMENT_ID is not defined');
    return;
  }

  const trackingData = {
    v: '1',
    tid: NODE_GA_MEASUREMENT_ID,
    cid: userId,
    t: 'event',
    ec: 'yourEventCategory',
    ea: event,
    ev: '1',
    cd1: sessionData.sessionStart, // Custom dimension for session start
    cd2: sessionData.sessionEnd, // Custom dimension for session end
  };

  try {
    const response = await axios.post(
      NODE_GOOGLE_ANALYTICS_API_URL,
      trackingData
    );
    console.log('Event tracked successfully', response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        'Request failed with status:',
        axiosError.response.status,
        'Response:',
        axiosError.response.data
      );
    } else if (axiosError.request) {
      console.error('Request failed:', axiosError.request);
    } else {
      console.error('Error:', axiosError.message);
    }
    throw new Error('Failed to track event');
  }
}
