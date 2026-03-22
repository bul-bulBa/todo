import { useQueryOptions } from '@/components/todo/hooks/useMeQuery'
import { createFileRoute, isRedirect, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(useQueryOptions)
      if (user) {
        throw redirect({
          to: '/',
        })
      }
    } catch (e) {
      if (isRedirect(e)) throw e
      return
    }
  },
})
