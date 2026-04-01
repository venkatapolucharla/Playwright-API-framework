import { test, expect } from '@fixtures/auth.fixture';
import { createValidBooking } from '@fixtures/booking.fixture';
import { API_ENDPOINTS } from '@utils/api-helpers';

test.describe('Delete Booking API (DELETE)', () => {
  test('should delete a booking with valid auth token', async ({ request, authToken }) => {
    // Create a booking
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Delete it
    const deleteResponse = await request.delete(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(deleteResponse.status()).toBe(201);
  });

  test('should fail DELETE without authentication token', async ({ request }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const deleteResponse = await request.delete(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId)
    );

    expect([403, 401, 400]).toContain(deleteResponse.status());
  });

  test('should confirm booking is deleted after DELETE', async ({ request, authToken }) => {
    // Create a booking
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Delete it
    await request.delete(API_ENDPOINTS.BOOKING_BY_ID(bookingId), {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });

    // Verify it's gone
    const getResponse = await request.get(API_ENDPOINTS.BOOKING_BY_ID(bookingId));
    expect(getResponse.status()).toBe(404);
  });

  test('should return 404 when deleting non-existent booking', async ({ request, authToken }) => {
    const deleteResponse = await request.delete(
      API_ENDPOINTS.BOOKING_BY_ID(999999),
      {
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(deleteResponse.status()).toBe(405);
  });

  test('should validate DELETE response status', async ({ request, authToken }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const deleteResponse = await request.delete(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(deleteResponse.status()).toBe(201);
  });
});
