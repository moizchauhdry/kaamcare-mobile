export type ILoginResponse = {
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
