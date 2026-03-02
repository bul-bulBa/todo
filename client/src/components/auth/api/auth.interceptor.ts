import { useIsAuth } from "@/clientStore/isAuth"
import { api } from "@/lib/axios.config"
import { toastMessageHandler } from "@/lib/toast/toastMessageHandler"
import { router } from "@/main"

let isRefreshing = false
let queue: (() => void)[] = []

const runQueue = () => {
    queue.forEach(fn => fn())
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

        if(originalRequest._retry) return Promise.reject(error)

        if (originalRequest.url.includes('/auth/refresh')) {
            useIsAuth.setState(() => ({ isAuth: false }))
            router.navigate({ to: '/auth/register' })
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise(resolve => {
                queue.push(() => resolve(api(originalRequest)))
            })
        }
        
        originalRequest._retry = true
        isRefreshing = true

        try {
            console.log(originalRequest.url)
            await api.post('/auth/refresh')

            runQueue()
            return api(originalRequest)
        } catch (err) {
            useIsAuth.setState(() => ({ isAuth: false }))
            router.navigate({ to: '/auth/register' })
            return Promise.reject(err)
        } finally {
            isRefreshing = false
        }
    }
)