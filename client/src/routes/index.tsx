import App from '@/components/App'
import TodoPage from '@/components/todo/components/TodoPage'
import { useQueryOptions } from '@/components/todo/hooks/useMeQuery'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData(useQueryOptions)
    } catch (e) {
      throw redirect({
        to: '/register',
        search: { redirect: window.location.pathname },
      })
    }
  },
})

function Index() {
  return <TodoPage />
}