import { create } from 'zustand'
import { persist} from 'zustand/middleware'

type IsAuth = {
    isAuth: boolean,
    setAuth: (value: boolean) => void
}

export const useIsAuth = create<IsAuth>()(
    persist(
        (set) => ({
            isAuth: false,
            setAuth: value => set({ isAuth: value }),
        }),
        {
            name: 'auth',
        }
    )
)