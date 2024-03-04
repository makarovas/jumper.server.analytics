import { trackApiEvent } from '../googleAnalytics';

describe('Google Analytics Service', () => {
  it('should track an event successfully', async () => {
    const userId = 'testUser';
    const event = 'testEvent';
    const sessionData = {
      sessionStart: new Date(),
      sessionEnd: new Date(),
    };
    const axiosMock = jest.fn(() => Promise.resolve({ data: 'Success' }));
    jest.mock('axios', () => ({ post: axiosMock }));

    await trackApiEvent(userId, event, sessionData);
    expect(axiosMock).toHaveBeenCalledWith(
      'YOUR_GOOGLE_ANALYTICS_API_URL',
      expect.any(Object)
    );

    // Test handling missing GA_MEASUREMENT_ID
    process.env.NODE_GA_MEASUREMENT_ID = '';
    console.error = jest.fn();
    await trackApiEvent(userId, event, sessionData);
    expect(console.error).toHaveBeenCalledWith(
      'GA_MEASUREMENT_ID is not defined'
    );

    // Test handling axios error
    const axiosErrorMock = new Error('Axios Error');
    axiosMock.mockRejectedValue(axiosErrorMock);
    console.error = jest.fn();
    try {
      await trackApiEvent(userId, event, sessionData);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to track event'));
      expect(console.error).toHaveBeenCalled();
    }

    // Tracking event with empty session data
    const emptySessionData = {};
    console.error = jest.fn();
    await trackApiEvent(userId, event, emptySessionData);
    expect(console.error).toHaveBeenCalledWith(
      'Session data is missing or invalid'
    );

    // Tracking event with invalid event name
    const invalidEventName = 'invalidEvent';
    console.error = jest.fn();
    await trackApiEvent(userId, invalidEventName, sessionData);
    expect(console.error).toHaveBeenCalledWith('Invalid event name provided');

    // Tracking event with invalid user ID
    const invalidUserId = '';
    console.error = jest.fn();
    await trackApiEvent(invalidUserId, event, sessionData);
    expect(console.error).toHaveBeenCalledWith('Invalid user ID provided');
  });
});
