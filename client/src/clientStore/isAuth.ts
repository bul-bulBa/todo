import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IsAuth = {
    isAuth: boolean,
    user: any | null,
    setUser: (user: any) => void
    setAuth: (value: boolean) => void
}

export const useIsAuth = create<IsAuth>(
    (set) => ({
        isAuth: false,
        user: null,
        setUser: user => ({user, isAuth: !!user}),
        setAuth: value => set({ isAuth: value }),
    }),
)