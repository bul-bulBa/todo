import type { Todo } from "@/components/todo/types/todoType";
import { create } from "zustand";

type Store = {
    editingId: string | null,
    todo: Todo | null,
    setTodo: (id: string, todo: Todo | null) => void,
    unSetTodo: () => void
}

export const useUpdate = create<Store>((set) => ({
    editingId: null,
    todo: null, 
    setTodo(id, todo = null) {
        set({ editingId: id, todo })
    },
    unSetTodo() {
        set({ editingId: null, todo: null })
    },
}))