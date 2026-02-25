import TodoPage from '@/components/todo/components/TodoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todo/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TodoPage />
}
