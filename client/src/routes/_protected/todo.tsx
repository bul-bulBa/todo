import TodoPage from '@/components/todo/components/TodoPage'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/todo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TodoPage />
}
