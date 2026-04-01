import { APIRequestContext, expect } from '@playwright/test';

// API Constants
export const API_ENDPOINTS = {
  PING: '/ping',
  AUTH: '/auth',
  BOOKING: '/booking',
  BOOKING_BY_ID: (id: number) => `/booking/${id}`,
};

// Request/Response Interfaces
export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

export interface AuthResponse {
  token: string;
}

export interface BookingResponse extends BookingData {
  bookingid: number;
}

export interface BookingIdResponse {
  bookingid: number;
}

// API Helper Functions
export async function validateStatusCode(
  response: Awaited<ReturnType<APIRequestContext['get'] | APIRequestContext['post'] | APIRequestContext['put'] | APIRequestContext['patch'] | APIRequestContext['delete']>>,
  expectedStatus: number
): Promise<void> {
  expect(response.status()).toBe(expectedStatus);
}

export async function validateResponseSchema(
  response: Awaited<ReturnType<APIRequestContext['get'] | APIRequestContext['post'] | APIRequestContext['put'] | APIRequestContext['patch'] | APIRequestContext['delete']>>,
  expectedFields: string[]
): Promise<void> {
  const body = await response.json();
  expectedFields.forEach((field) => {
    expect(body).toHaveProperty(field);
  });
}

export async function validateResponseHeader(
  response: Awaited<ReturnType<APIRequestContext['get'] | APIRequestContext['post'] | APIRequestContext['put'] | APIRequestContext['patch'] | APIRequestContext['delete']>>,
  headerName: string,
  expectedValue?: string
): Promise<void> {
  const headerValue = response.headers()[headerName.toLowerCase()];
  if (expectedValue) {
    expect(headerValue).toContain(expectedValue);
  } else {
    expect(headerValue).toBeDefined();
  }
}

export async function measureResponseTime(
  response: Awaited<ReturnType<APIRequestContext['get'] | APIRequestContext['post'] | APIRequestContext['put'] | APIRequestContext['patch'] | APIRequestContext['delete']>>
): Promise<number> {
  // Approximate timing - Playwright doesn't directly expose response time
  // In real scenarios, you might use browser dev tools or server logs
  return 0;
}

export async function validateBookingData(booking: any): Promise<void> {
  expect(booking).toHaveProperty('firstname');
  expect(booking).toHaveProperty('lastname');
  expect(booking).toHaveProperty('totalprice');
  expect(booking).toHaveProperty('depositpaid');
  expect(booking).toHaveProperty('bookingdates');
  expect(booking.bookingdates).toHaveProperty('checkin');
  expect(booking.bookingdates).toHaveProperty('checkout');
}
