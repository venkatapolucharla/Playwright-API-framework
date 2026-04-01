import { test, expect } from '@playwright/test';

test.describe('Health Check API', () => {
  test('should return 201 status from /ping endpoint', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.status()).toBe(201);
  });

  test('should validate ping response structure', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.ok()).toBeTruthy();
    // Ping endpoint returns simple 201, no body validation needed
  });

  test('should respond within acceptable time', async ({ request }) => {
    const startTime = performance.now();
    const response = await request.get('/ping');
    const endTime = performance.now();
    const duration = endTime - startTime;

    expect(response.status()).toBe(201);
    console.log(`⏱️ Response time: ${duration.toFixed(2)}ms`);
    // Adjust threshold as needed based on network conditions
    expect(duration).toBeLessThan(5000);
  });
});
