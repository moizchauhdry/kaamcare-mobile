import { create } from 'zustand';

interface SignupStore {
  isLogged: boolean;
  isTermsChecked: boolean;
  setIsLogged: (isLogged: boolean) => void;
  setIsTermsChecked: (isTermsChecked: boolean) => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  isLogged: false,
  isTermsChecked: false,
  setIsLogged: (isLogged) => set({ isLogged }),
  setIsTermsChecked: (isTermsChecked) => set({ isTermsChecked }),
}));
