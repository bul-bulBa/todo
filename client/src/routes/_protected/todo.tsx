import { useIsAuth } from '@/clientStore/isAuth'
import TodoPage from '@/components/todo/components/TodoPage'
import { useQueryOptions } from '@/components/todo/hooks/useMeQuery'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/todo')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isAuth = useIsAuth.getState().isAuth

    if (!isAuth) throw redirect({ to: '/register' })

    await context.queryClient.ensureQueryData(useQueryOptions)
  }
})

function RouteComponent() {
  return <TodoPage />
}
