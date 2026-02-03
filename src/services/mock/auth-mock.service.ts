/**
 * Mock auth service for development and demo.
 * Simulates login, signup, forgot/reset password, logout without backend.
 */

import storage from "@/utils/storage.util";
import type { LoginDTO, RegisterUserDTO, ForgotPasswordDTO, ResetPasswordDTO } from "@/dtos/auth.dto";
import type { IAPIResponse } from "@/utils/interfaces.util";

const MOCK_DELAY_MS = 800;

function delay(ms = MOCK_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mock reset token - any non-empty token is valid in mock mode */
export const MOCK_RESET_TOKEN = "mock-reset-token-12345";

/** OTP required for admin login in mock mode */
export const MOCK_ADMIN_OTP = "123456";

/**
 * Mock login - accepts any email/password, but OTP must be "123456".
 */
export async function mockLogin(payload: LoginDTO): Promise<IAPIResponse> {
  await delay();

  if (!payload.email?.trim() || !payload.password?.trim()) {
    return {
      error: true,
      data: null,
      message: "Email and password are required.",
      errors: [],
      status: 400,
    };
  }

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
  const tokenPayload = btoa(JSON.stringify({ sub: mockUserId, email: payload.email }));
  const mockToken = `mock.${tokenPayload}.${Math.random().toString(36).slice(2)}`;

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
  // Token must have 3 dot-separated parts to pass storage.checkToken() (JWT format)
  const tokenPayload = btoa(JSON.stringify({ sub: mockUserId, email: payload.email }));
  const mockToken = `mock.${tokenPayload}.${Math.random().toString(36).slice(2)}`;

  storage.storeAuth(mockToken, mockUserId, "admin", payload.email);

  return {
    error: false,
    data: {
      user: {
        id: mockUserId,
        email: payload.email,
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
 * Mock forgot password - always returns success (never reveals if email exists).
 */
export async function mockForgotPassword(payload: ForgotPasswordDTO): Promise<IAPIResponse> {
  await delay();

  if (!payload.email?.trim()) {
    return {
      error: true,
      data: null,
      message: "Email is required.",
      errors: [],
      status: 400,
    };
  }

  return {
    error: false,
    data: { message: "If an account exists with this email, you will receive a reset link." },
    message: "If an account exists with this email, you will receive a password reset link shortly.",
    errors: [],
    status: 200,
  };
}

/**
 * Mock reset password - accepts token + new password.
 * Use MOCK_RESET_TOKEN or any non-empty token in mock mode.
 */
export async function mockResetPassword(payload: ResetPasswordDTO): Promise<IAPIResponse> {
  await delay();

  if (!payload.token?.trim()) {
    return {
      error: true,
      data: null,
      message: "Invalid or expired reset link. Please request a new one.",
      errors: [],
      status: 400,
    };
  }

  if (!payload.newPassword || payload.newPassword.length < 8) {
    return {
      error: true,
      data: null,
      message: "Password must be at least 8 characters.",
      errors: [],
      status: 400,
    };
  }

  return {
    error: false,
    data: null,
    message: "Your password has been reset successfully. You can now log in.",
    errors: [],
    status: 200,
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
