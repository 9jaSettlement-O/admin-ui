/**
 * Environment configuration.
 * Provides type-safe access to environment variables.
 */

export const env = {
  VITE_APP_API_URL: (import.meta.env.VITE_APP_API_URL as string) ?? "",
  VITE_USE_MOCK_SERVICES: import.meta.env.VITE_USE_MOCK_SERVICES === "true",
  MODE: import.meta.env.MODE as "development" | "production" | "test",
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
};
