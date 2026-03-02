import { api } from "@/lib/axios.config";
import type { Todo } from "../types/todoType";

class TodoService {
    async get(): Promise<Todo[]> {
        return api.get('/todo')
    }
}

export const todoService = new TodoService