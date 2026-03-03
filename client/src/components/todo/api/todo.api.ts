import { api } from "@/lib/axios.config";
import type { Todo } from "../types/todoType";

class TodoService {
    async getTodo() {
        return api.get('/todo').then(res => res.data)
    }

    async create(text: string): Promise<Todo> {
        return api.post('/todo', {text}).then(res => res.data)
    }

    async getMe() {
        return await api.get('/auth/me').then(res => res.data)
    }
}

export const todoService = new TodoService