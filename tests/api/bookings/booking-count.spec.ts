import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '@utils/api-helpers';

test.describe('Booking Count Validation', () => {
  test('should fetch and display total booking count', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING);
    expect(response.status()).toBe(200);

    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBeTruthy();

    const totalCount = bookings.length;
    console.log(`\n📊 Total Bookings Available: ${totalCount}`);
    console.log(`📋 Booking IDs: ${bookings.map((b: any) => b.bookingid).join(', ')}`);

    // Validate count is reasonable
    expect(totalCount).toBeGreaterThan(0);
    expect(totalCount).toBeLessThan(10000); // Sanity check

    // Log booking details
    bookings.forEach((booking: any, index: number) => {
      if (index < 3) {
        console.log(`  - Booking ${index + 1}: ID ${booking.bookingid}`);
      }
    });

    if (totalCount > 3) {
      console.log(`  ... and ${totalCount - 3} more bookings`);
    }
  });

  test('should validate booking count response structure', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING);
    const bookings = await response.json();

    // Validate each booking has required ID
    bookings.forEach((booking: any) => {
      expect(booking).toHaveProperty('bookingid');
      expect(typeof booking.bookingid).toBe('number');
    });

    const uniqueIds = new Set(bookings.map((b: any) => b.bookingid));
    console.log(`✅ All ${bookings.length} booking IDs are unique: ${uniqueIds.size === bookings.length}`);
  });

  test('should validate response headers for booking list', async ({ request }) => {
    const response = await request.get(API_ENDPOINTS.BOOKING);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
