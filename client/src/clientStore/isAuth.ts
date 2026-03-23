import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type IsAuth = {
    isAuth: boolean
    user: any | null,
    setAuth: (isAuth: boolean, user: any) => void
}

export const useIsAuth = create<IsAuth>()(
    persist(
        (set) => ({
            isAuth: false,
            user: null,
            setAuth: (isAuth, user) => set({ isAuth, user }),
        }),
        {
            name: 'isAuth'
        }
    )
)