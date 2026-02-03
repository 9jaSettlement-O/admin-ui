/**
 * Mock auth service for development and demo.
 * Simulates login, signup, logout without backend.
 */

import storage from "@/utils/storage.util";
import type { LoginDTO, RegisterUserDTO } from "@/dtos/auth.dto";
import type { IAPIResponse } from "@/utils/interfaces.util";

const MOCK_DELAY_MS = 800;

function delay(ms = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** OTP required for admin login in mock mode */
export const MOCK_ADMIN_OTP = "123456";

/**
 * Mock login - accepts any email/password, but OTP must be "123456".
 */
export async function mockLogin(payload: LoginDTO): Promise<IAPIResponse> {
  await delay();

  const otp = payload.otp?.trim() ?? "";
  if (otp !== MOCK_ADMIN_OTP) {
    return {
      error: true,
      data: null,
      message: "Invalid OTP. Use 123456 for mock login.",
      errors: ["OTP must be 123456"],
      status: 401,
    };
  }

  const mockUserId = `mock_admin_${Date.now()}`;
  const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  storage.storeAuth(mockToken, mockUserId, "admin", payload.email);

  return {
    error: false,
    data: {
      user: {
        id: mockUserId,
        email: payload.email,
        type: "admin",
        role: "admin",
      },
    },
    message: "Login successful",
    token: mockToken,
    errors: [],
    status: 200,
  };
}

/**
 * Mock signup - accepts any data, simulates account creation.
 */
export async function mockRegister(
  payload: RegisterUserDTO
): Promise<IAPIResponse> {
  await delay();

  const mockUserId = `mock_admin_${Date.now()}`;
  const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  storage.storeAuth(mockToken, mockUserId, "admin", payload.email);

  return {
    error: false,
    data: {
      user: {
        id: mockUserId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        type: "admin",
      },
    },
    message: "Account created successfully",
    token: mockToken,
    errors: [],
    status: 201,
  };
}

/**
 * Mock logout - clears stored auth.
 */
export async function mockLogout(): Promise<IAPIResponse> {
  await delay(300);
  storage.clearAuth();

  return {
    error: false,
    data: null,
    message: "Logged out successfully",
    errors: [],
    status: 200,
  };
}
