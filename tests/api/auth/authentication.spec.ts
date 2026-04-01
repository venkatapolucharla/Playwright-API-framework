import { test, expect } from '@fixtures/auth.fixture';

test.describe('Authentication API', () => {
  test('should successfully authenticate with valid credentials', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: process.env.AUTH_USERNAME || 'admin',
        password: process.env.AUTH_PASSWORD || 'password123',
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('token');
    expect(typeof data.token).toBe('string');
    expect(data.token.length).toBeGreaterThan(0);
  });

  test('should validate auth response headers', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: process.env.AUTH_USERNAME || 'admin',
        password: process.env.AUTH_PASSWORD || 'password123',
      },
    });

    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should fail with invalid credentials', async ({ request }) => {
    const response = await request.post('/auth', {
      data: {
        username: 'invalid_user',
        password: 'invalid_password',
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    // API returns 200 with error message for invalid credentials
    expect(data).toHaveProperty('reason');
  });

  test('should return token fixture successfully', async ({ authToken }) => {
    expect(authToken).toBeTruthy();
    expect(typeof authToken).toBe('string');
    expect(authToken.length).toBeGreaterThan(0);
  });
});
