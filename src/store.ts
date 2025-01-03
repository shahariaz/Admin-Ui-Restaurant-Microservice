import { create } from "zustand";
import { devtools } from "zustand/middleware";
export interface IUser {
  id: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
}

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }))
);
