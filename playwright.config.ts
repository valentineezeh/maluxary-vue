import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e', // Your test directory
  timeout: 30000,
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:5173', // Adjust this to match your dev server port
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'mobile',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
