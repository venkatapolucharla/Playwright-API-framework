import { test as base, APIRequestContext } from '@playwright/test';
import { AuthResponse } from '../utils/api-helpers';

type AuthFixtures = {
  authToken: string;
};

export const test = base.extend<AuthFixtures>({
  authToken: async ({ request }, use) => {
    let token = '';

    try {
      const response = await request.post('/auth', {
        data: {
          username: process.env.AUTH_USERNAME || 'admin',
          password: process.env.AUTH_PASSWORD || 'password123',
        },
      });

      if (response.ok()) {
        const authData: AuthResponse = await response.json();
        token = authData.token;
        console.log('✅ Auth token obtained successfully');
      } else {
        console.error('❌ Failed to obtain auth token:', response.status());
      }
    } catch (error) {
      console.error('❌ Auth fixture error:', error);
    }

    await use(token);
  },
});

export { expect } from '@playwright/test';
