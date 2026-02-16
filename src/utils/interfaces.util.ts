import type { JSX, ReactNode } from "react";

export interface IStorage {
  storeAuth(token: string, id: string, userType: string, email: string): void;
  checkToken(): boolean;
  getToken(): string | null;
  checkUserID(): boolean;
  getUserID(): string;
  checkUserType(): boolean;
  getUserType(): string | null;
  checkUserEmail(): boolean;
  getUserEmail(): string | null;
  getConfig(): { headers: Record<string, string> };
  getConfigWithBearer(): { headers: Record<string, string> };
  clearAuth(): void;
  keep(key: string, data: unknown): boolean;
  fetch(key: string): unknown;
  deleteItem(key: string, legacy?: boolean): boolean;
}

export type RouteType = {
  path: string;
  element: JSX.Element;
  roles?: string[];
  children?: RouteType[];
  index?: boolean;
};

export interface IFallbackAndError {
  element: JSX.Element;
  fallbackUI?: ReactNode;
  errorUI?: ReactNode;
}

export interface IAPIResponse {
  error: boolean;
  errors: unknown[];
  count?: number;
  total?: number;
  pagination?: IPagination;
  data: unknown;
  message: string;
  token?: string;
  status?: number;
}

export interface IPagination {
  next: { page: number; limit: number };
  prev: { page: number; limit: number };
}
