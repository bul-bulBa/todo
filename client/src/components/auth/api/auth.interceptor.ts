import { useIsAuth } from "@/clientStore/isAuth"
import { api } from "@/lib/axios.config"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { router } from "@/main"
import { refreshApi } from "./refreshApi.config"

let isRefreshing = false
let queue: {
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}[] = []

const runQueue = (error?: any) => {
    queue.forEach(p => {
        if (error) p.reject(error)
        else p.resolve()
    })
    queue = []
}

api.interceptors.response.use(
    res => res,
    async error => {
        console.log('interceptor')
        const originalRequest = error.config

        if (error.response.status !== 401) {
            toastMessageHandler(error.response.data.message)
            return Promise.reject(error)
        }

        if (originalRequest._retry) return Promise.reject(error)

        if (originalRequest.url.includes('/auth/refresh')) {
            useIsAuth.setState({ isAuth: false })
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({
                    resolve: () => resolve(api(originalRequest)),
                    reject
                })
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
            console.log(originalRequest.url)
            await refreshApi.post('/auth/refresh')

            runQueue()
            return api(originalRequest)
        } catch (err) {
            useIsAuth.setState(() => ({ isAuth: false }))
            useIsAuth.setState({ isAuth: false })
            runQueue(err)
            return Promise.reject(err)
        } finally {
            isRefreshing = false
        }
    }
)