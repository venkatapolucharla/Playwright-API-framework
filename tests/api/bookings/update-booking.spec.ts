import { test, expect } from '@fixtures/auth.fixture';
import { createValidBooking } from '@fixtures/booking.fixture';
import { API_ENDPOINTS } from '@utils/api-helpers';

test.describe('Update Booking API (PUT)', () => {
  test('should update a booking with valid auth token', async ({ request, authToken }) => {
    // Create a booking
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Update it with PUT
    const updatedData = {
      ...bookingData,
      firstname: 'Jane',
      totalprice: 200,
    };

    const updateResponse = await request.put(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: updatedData,
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(updateResponse.status()).toBe(200);
    const updatedBooking = await updateResponse.json();
    expect(updatedBooking.firstname).toBe('Jane');
    expect(updatedBooking.totalprice).toBe(200);
  });

  test('should fail PUT without authentication token', async ({ request }) => {
    // Create a booking first
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Try to update without token
    const updateResponse = await request.put(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: bookingData,
      }
    );

    expect([403, 401, 400]).toContain(updateResponse.status());
  });

  test('should validate PUT response headers', async ({ request, authToken }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const updateResponse = await request.put(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: bookingData,
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(updateResponse.headers()['content-type']).toContain('application/json');
  });

  test('should reject PUT with invalid booking ID', async ({ request, authToken }) => {
    const bookingData = createValidBooking();
    const updateResponse = await request.put(
      API_ENDPOINTS.BOOKING_BY_ID(999999),
      {
        data: bookingData,
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(updateResponse.status()).toBeGreaterThanOrEqual(400);
  });
});
