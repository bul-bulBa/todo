import { useEmailConfirmationMutation } from '@/components/auth/hooks/useEmailConfirmationMutation'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth/new-verification/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: search.token as string
    }
  },
})

function RouteComponent() {
  const token = useSearch({
    from: '/_auth/new-verification/',
    select: (search) => search.token
  })

  const { mutate, isPending } = useEmailConfirmationMutation()

  useEffect(() => {
    mutate(token)
  }, [])

  return (
    <div>
      <div>Email confirmation</div>
      {isPending && <div>Loading...</div>}
    </div>
  )
}
