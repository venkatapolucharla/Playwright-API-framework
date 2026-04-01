import { test, expect } from '@fixtures/auth.fixture';
import { createValidBooking } from '@fixtures/booking.fixture';
import { API_ENDPOINTS } from '@utils/api-helpers';

test.describe('Patch Booking API (PATCH)', () => {
  test('should partially update a booking with PATCH', async ({ request, authToken }) => {
    // Create a booking
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Partial update with PATCH
    const patchData = {
      firstname: 'Jonathan',
    };

    const patchResponse = await request.patch(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: patchData,
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(patchResponse.status()).toBe(200);
    const patchedBooking = await patchResponse.json();
    expect(patchedBooking.firstname).toBe('Jonathan');
    expect(patchedBooking.lastname).toBe(bookingData.lastname); // Should remain unchanged
  });

  test('should fail PATCH without authentication token', async ({ request }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const patchResponse = await request.patch(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: { firstname: 'Test' },
      }
    );

    expect([403, 401, 400]).toContain(patchResponse.status());
  });

  test('should validate PATCH response structure', async ({ request, authToken }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const patchResponse = await request.patch(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: { totalprice: 300 },
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    expect(patchResponse.status()).toBe(200);
    const patchedData = await patchResponse.json();
    expect(patchedData).toHaveProperty('firstname');
    expect(patchedData).toHaveProperty('lastname');
    expect(patchedData.totalprice).toBe(300);
  });

  test('should handle PATCH with empty body', async ({ request, authToken }) => {
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    const patchResponse = await request.patch(
      API_ENDPOINTS.BOOKING_BY_ID(bookingId),
      {
        data: {},
        headers: {
          Cookie: `token=${authToken}`,
        },
      }
    );

    // Empty PATCH should either succeed or return validation error
    expect([200, 400]).toContain(patchResponse.status());
  });
});
