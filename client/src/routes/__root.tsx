import { createRootRoute, createRootRouteWithContext, Link, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import Header from '@/components/Header'
import { Suspense } from 'react'
import { ToastProvider } from '../lib/toast/toastMessageProvider'
import { useIsAuth } from '@/clientStore/isAuth'

const RootLayout = () => (
    <>
        {/* <Header /> */}
        <div className='h-screen w-screen'>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Outlet />
            </Suspense>
        </div>
        <ToastProvider />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
)

export const Route = createRootRoute({
    component: RootLayout,
    beforeLoad: ({ location }) => {
        const { isAuth } = useIsAuth.getState()
        const path = location.pathname
        console.log(isAuth)
        if (isAuth && path.includes('/auth/login') || path.includes('/auth/register')) 
            return redirect({ to: '/todo' })

        if (!isAuth && path.startsWith('/todo') || path === '/') 
            return redirect({ to: '/auth/register' })

        return null
    }
})