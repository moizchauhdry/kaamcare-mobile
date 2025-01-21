import type { AuthTypes } from 'constants/enums';

export type ILoginRequest = {
  email: string;
  type: AuthTypes;
  password?: string;
  google_token?: string;
  apple_token?: string;
};

export type ISignupRequest = {
  email: string;
  type: AuthTypes;
  google_token?: string;
  apple_token?: string;
};

export type IVerifyOtpRequest = {
  otp: string | number;
  email: null | string;
};

export type IResendOtpRequest = {
  email: null | string;
};

export type IPasswordRequest = {
  password: string;
  password_confirmation: string;
};

export type IForgotPassRequest = {
  email: string;
};

export type IResetPassRequest = {
  password: string;
};
