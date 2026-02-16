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
    /** Use mock services when true (env flag) or in development when API URL is not set */
    enableMockServices:
      env.VITE_USE_MOCK_SERVICES || (env.DEV && !env.VITE_APP_API_URL),
  },
} as const;

/**
 * Check if mock services should be used.
 * When true, auth and data services use local mock instead of API.
 */
export const shouldUseMockService = (): boolean => {
  return appConfig.features.enableMockServices;
};
