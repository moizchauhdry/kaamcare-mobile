import { create } from 'zustand';

interface SignupStore {
  isLogged: boolean;
  isTermsChecked: boolean;
  userEmail: null | string;
  setIsLogged: (isLogged: boolean) => void;
  setIsTermsChecked: (isTermsChecked: boolean) => void;
  setUserEmail: (userEmail: string) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  userEmail: null,
  isLogged: false,
  isTermsChecked: false,
  setIsLogged: (isLogged) => set({ isLogged }),
  setIsTermsChecked: (isTermsChecked) => set({ isTermsChecked }),
  setUserEmail: (userEmail) => set({ userEmail }),
}));
