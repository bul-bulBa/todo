import { api } from "@/lib/axios.config";
import type { Todo } from "../types/todoType";

class TodoService {
    getTodo = () => api.get('/todo').then(res => res.data)

    create = (text: string): Promise<Todo> =>
        api.post('/todo', { text }).then(res => res.data)

    update = (data: any): Promise<Todo> =>
        api.patch('/todo', data).then(res => res.data)

    delete = (id: string): Promise<boolean> =>
        api.delete(`/todo/${id}`).then(res => res.data)

    async getMe() {
        return api.get('/auth/me').then(res => res.data)
    }
}

export const todoService = new TodoService