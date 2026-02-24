import { api } from "@/lib/axios.config";

class TodoService {
    async get() {
        return api.get('/todo')
    }
}