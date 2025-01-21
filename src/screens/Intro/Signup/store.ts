import { create } from 'zustand';

interface SignupStore {
  isLogged: boolean;
  userEmail: null | string;
  setIsLogged: (isLogged: boolean) => void;
  setUserEmail: (userEmail: string) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userEmail: null,
  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged }),
  setUserEmail: (userEmail) => set({ userEmail }),
}));
