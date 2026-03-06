import { create } from "zustand";

type Store = {
    editingId: string | null,
    setTodo: (id: string) => void,
    unSetTodo: () => void
}

export const useUpdate = create<Store>((set) => ({
    editingId: null,
    setTodo(id) {
        set({ editingId: id })
    },
    unSetTodo() {
        set({ editingId: null })
    },
}))