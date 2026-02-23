import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import Header from '@/components/Header'
import { Suspense } from 'react'


const RootLayout = () => (
    <>
        {/* <Header /> */}
        <div className='h-screen w-screen'>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Outlet />
            </Suspense>
        </div>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
)

export const Route = createRootRoute({ component: RootLayout })