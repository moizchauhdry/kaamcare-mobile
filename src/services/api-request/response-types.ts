export type User = {
  user: {
    id: number;
    token: string;
    email: string;
    updated_at: string;
    created_at: string;
  };
};

export type ILoginResponse = {
  data: User;
};

export type ISignupResponse = {
  data: User & { email: string };
};

export type IVerifyOtpResponse = {
  data: User;
};

export type IResendOtpResponse = {
  data: {
    email: string;
    otp: number;
  };
};

export type IPasswordResponse = {
  data: User;
};

export type IForgotPassResponse = {
  data: {
    email: string;
    otp: number;
  };
};

export type IResetPassResponse = {
  data: {
    user: {
      id: number;
      token: string;
      email: string;
      updated_at: string;
      created_at: string;
    };
  };
};
