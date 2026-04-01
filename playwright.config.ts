import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },

  projects: [
    {
      name: 'API Tests',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  globalSetup: './tests/utils/global-setup.ts',
  webServer: undefined,
});
