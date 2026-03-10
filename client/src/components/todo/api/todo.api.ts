import { api } from "@/lib/axios.config";
import type { Todo } from "../types/todoType";
import type { TypeTodoSchema } from "../schemas/todo.schema";

class TodoService {
    getTodo = () => api.get('/todo').then(res => res.data)

    create = (data: TypeTodoSchema): Promise<Todo> =>
        api.post('/todo', data).then(res => res.data)

    update = (data: any): Promise<Todo> =>
        api.patch('/todo', data).then(res => res.data)

    delete = (id: string): Promise<boolean> =>
        api.delete(`/todo/${id}`).then(res => res.data)

    async getMe() {
        return api.get('/auth/me').then(res => res.data)
    }
}

export const todoService = new TodoService