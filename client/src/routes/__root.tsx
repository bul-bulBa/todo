import { createRootRoute, createRootRouteWithContext, Link, Outlet, redirect, useRouter, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import Header from '@/components/Header'
import { Suspense } from 'react'
import { ToastProvider } from '../lib/toast/toastMessageProvider'
import { useIsAuth } from '@/clientStore/isAuth'
import type { QueryClient } from '@tanstack/react-query'
import FullScreenLoader from '@/lib/components/FullScreenLoader'

interface MyRouterContext {
    auth: {
        user: any | null
        isLoading: boolean
    }
}

const RootLayout = () => {

    return (
        <>
            <div className='h-dvh w-full'>
                <Outlet />
            </div>
            <ToastProvider />
            {/* <TanStackRouterDevtools position="bottom-left" />
            <ReactQueryDevtools initialIsOpen={false}  /> */}
        </>
    )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootLayout,
})