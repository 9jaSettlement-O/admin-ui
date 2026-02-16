/**
 * Application configuration.
 * Central place for feature flags and app-wide settings.
 */

import { env } from "./env.config";

export const appConfig = {
  isDevelopment: env.DEV,
  isProduction: env.PROD,
  mode: env.MODE,
  apiUrl: env.VITE_APP_API_URL,
  apiTimeout: 30000,

  features: {
    /** Use mock services when: env flag set, or in dev without API URL, or in production without API URL (e.g. GitHub Pages) */
    enableMockServices:
      env.VITE_USE_MOCK_SERVICES ||
      (env.DEV && !env.VITE_APP_API_URL) ||
      (env.PROD && !env.VITE_APP_API_URL),
  },
} as const;

/**
 * Check if mock services should be used.
 * When true, auth and data services use local mock instead of API.
 */
export const shouldUseMockService = (): boolean => {
  return appConfig.features.enableMockServices;
};
