export type User = {
  user: {
    id: number;
    token: string;
    email: string;
    updated_at: string;
    created_at: string;
    is_verified: number;
  };
};

export type ILoginResponse = {
  data: User;
  message: string;
};

export type ISignupResponse = {
  data: User & { email: string; token: string };
};

export type IVerifyOtpResponse = {
  data: User;
};

export type IResendOtpResponse = {
  data: {
    token: string;
  };
};

export type IPasswordResponse = {
  data: {
    id: number;
    token: string;
    email: string;
    updated_at: string;
    created_at: string;
  };
};

export type IForgotPassResponse = {
  data: {
    token: string;
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
