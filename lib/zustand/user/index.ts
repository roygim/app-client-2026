import { User } from "@/lib/types";
import { create } from "zustand";

type UserStore = {
    user: User | null;
    isLogin: boolean;
    saveUser: (user: User) => void;
    removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLogin: false,
    saveUser: (_user: User) => {
        set((state) => ({ ...state, isLogin: true, user: _user }))
    },
    removeUser: () => {
        set((state) => ({ ...state, isLogin: false, user: null }))
    }
}))