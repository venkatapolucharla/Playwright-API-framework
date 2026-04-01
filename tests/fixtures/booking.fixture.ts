import { BookingData } from '../utils/api-helpers';

export function createValidBooking(): BookingData {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: today.toISOString().split('T')[0],
      checkout: nextWeek.toISOString().split('T')[0],
    },
    additionalneeds: 'Breakfast',
  };
}

export function createBookingWithCustomData(overrides: Partial<BookingData>): BookingData {
  const defaultBooking = createValidBooking();
  return {
    ...defaultBooking,
    ...overrides,
  };
}
