import { StrictMode, useEffect, useMemo } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import '@/components/auth/api/auth.interceptor'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { useAuth } from "./lib/hooks/useAuth"

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      user: null,
      isLoading: true,
    },
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// const InnerApp = () => {
//   const { data: user, isLoading } = useAuth();

//   const authContext = useMemo(() => ({
//     auth: { user, isLoading }
//   }), [user, isLoading]);


//   return (
//     <RouterProvider 
//       router={router} 
//       context={authContext} />
//   );
// };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
      router={router} />
    </QueryClientProvider>
  </StrictMode>
)
