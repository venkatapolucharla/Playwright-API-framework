import { test, expect } from '@fixtures/auth.fixture';
import { createValidBooking } from '@fixtures/booking.fixture';
import { validateBookingData, API_ENDPOINTS } from '@utils/api-helpers';

test.describe('Read Booking API (GET)', () => {
  let createdBookingId: number;

  test.beforeAll(async ({ browser }) => {
    // Create a booking to read
    const context = await browser?.newContext();
    const request = context?.request;
    if (request) {
      const bookingData = createValidBooking();
      const response = await request.post(API_ENDPOINTS.BOOKING, {
        data: bookingData,
      });
      const data = await response.json();
      createdBookingId = data.bookingid;
    }
  });

  test('should retrieve all bookings from GET /booking', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING);
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBeTruthy();
    expect(bookings.length).toBeGreaterThan(0);
  });

  test('should retrieve booking by ID', async ({ request }) => {
    // Create a booking first
    const bookingData = createValidBooking();
    const createResponse = await request.post(API_ENDPOINTS.BOOKING, {
      data: bookingData,
    });
    const createData = await createResponse.json();
    const bookingId = createData.bookingid;

    // Retrieve it
    const response = await request.get(API_ENDPOINTS.BOOKING_BY_ID(bookingId));
    expect(response.status()).toBe(200);
    const retrievedBooking = await response.json();
    await validateBookingData(retrievedBooking);
    expect(retrievedBooking.firstname).toBe(bookingData.firstname);
    expect(retrievedBooking.lastname).toBe(bookingData.lastname);
  });

  test('should validate response headers on GET /booking', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should return 404 for non-existent booking ID', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING_BY_ID(999999));
    expect(response.status()).toBe(404);
  });

  test('should handle GET with query parameters', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING + '?firstname=John');
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBeTruthy();
  });
});
