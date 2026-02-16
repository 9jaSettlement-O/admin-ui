import type { IStorage } from "./interfaces.util";

const storeAuth = (token: string, id: string, userType: string, email: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", id);
  localStorage.setItem("role", userType);
  localStorage.setItem("userEmail", email);
};

const checkToken = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token || token.trim() === "") return false;
  const tokenParts = token.split(".");
  return tokenParts.length === 3;
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const checkUserID = (): boolean => {
  return !!localStorage.getItem("userId");
};

const getUserID = (): string => {
  const uid = localStorage.getItem("userId");
  return uid ?? "";
};

const checkUserType = (): boolean => {
  return !!localStorage.getItem("role");
};

const getUserType = (): string | null => {
  return localStorage.getItem("role");
};

const checkUserEmail = (): boolean => {
  return !!localStorage.getItem("userEmail");
};

const getUserEmail = (): string | null => {
  return localStorage.getItem("userEmail");
};

const getConfig = (): { headers: Record<string, string> } => ({
  headers: {
    "Content-Type": "application/json",
    lg: "en",
    ch: "web",
  },
});

const getConfigWithBearer = (): { headers: Record<string, string> } => {
  const token = getToken();
  const base = getConfig();
  if (!token) return base;
  return {
    headers: {
      ...base.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};

const clearAuth = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("userEmail");
};

const keep = (key: string, data: unknown): boolean => {
  if (data !== undefined && data !== null) {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  }
  return false;
};

const fetch = (key: string): unknown => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const deleteItem = (key: string, _legacy = false): boolean => {
  const data = localStorage.getItem(key);
  if (data !== null) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
};

export const storage: IStorage = {
  storeAuth,
  checkToken,
  getToken,
  checkUserID,
  getUserID,
  checkUserType,
  getUserType,
  checkUserEmail,
  getUserEmail,
  getConfig,
  getConfigWithBearer,
  clearAuth,
  keep,
  fetch,
  deleteItem,
};

export default storage;
