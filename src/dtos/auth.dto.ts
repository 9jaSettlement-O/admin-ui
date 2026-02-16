export interface RegisterUserDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
  otp?: string;
}

export interface LogoutDTO {
  userId: string;
  goTo?: (url: string) => Promise<void>;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  token: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
