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
        <div className='h-screen w-full'>
            {/* <Suspense fallback={<h1>Loading...</h1>}> */}
                <Outlet />
            {/* </Suspense> */}
        </div>
        <ToastProvider />
        {/* <TanStackRouterDevtools position="bottom-left" /> */}
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-left' /> */}
    </>
)

export const Route = createRootRoute({
    component: RootLayout,
})