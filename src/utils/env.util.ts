/**
 * Environment variable helpers.
 * Uses Vite's import.meta.env for build-time substitution.
 */

export const env = {
  get apiUrl(): string {
    return (import.meta.env.VITE_APP_API_URL as string) ?? "";
  },
  get isDev(): boolean {
    return import.meta.env.DEV;
  },
  get isProd(): boolean {
    return import.meta.env.PROD;
  },
};
