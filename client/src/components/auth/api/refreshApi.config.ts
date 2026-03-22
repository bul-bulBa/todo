import { api } from "@/lib/axios.config";
import axios from "axios";

export const refreshApi = axios.create({
    baseURL: api.defaults.baseURL,
    withCredentials: true
})