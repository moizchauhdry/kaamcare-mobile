import type { AuthTypes } from 'constants/enums';

export type ILoginRequest = {
  email: string;
  type: AuthTypes;
  password?: string;
  token?: string;
};

export type ISignupRequest = {
  email: string;
  type: AuthTypes;
  token?: string;
};

export type IVerifyOtpRequest = {
  otp: string | number;
};

export type IResendOtpRequest = {};

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
