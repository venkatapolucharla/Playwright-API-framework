import { test, expect } from '@fixtures/auth.fixture';
import { createValidBooking } from '@fixtures/booking.fixture';
import {
  validateStatusCode,
  validateResponseSchema,
  validateBookingData,
  API_ENDPOINTS,
} from '@utils/api-helpers';

test.describe('Create Booking API (POST)', () => {
  test('should create a new booking successfully', async ({ request }) => {
    const bookingData = createValidBooking();
    const response = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData).toHaveProperty('bookingid');
    expect(typeof responseData.bookingid).toBe('number');
  });

  test('should validate booking creation response structure', async ({ request }) => {
    const bookingData = createValidBooking();
    const response = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });

    expect(response.status()).toBe(200);
    const responseData = await response.json();
    expect(responseData).toHaveProperty('bookingid');
    expect(responseData).toHaveProperty('booking');
    await validateBookingData(responseData.booking);
  });

  test('should validate response headers on booking creation', async ({ request }) => {
    const bookingData = createValidBooking();
    const response = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });

    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should fail to create booking with missing required fields', async ({ request }) => {
    const invalidData = {
      firstname: 'John',
      // Missing required fields
    };

    const response = await request.post(API_ENDPOINTS.BOOKING, {
      data: invalidData,
    });

    expect(response.status()).not.toBe(200);
  });

  test('should handle booking creation error responses', async ({ request }) => {
    const response = await request.post(API_ENDPOINTS.BOOKING, {
      data: {},
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
