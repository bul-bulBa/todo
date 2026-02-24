import App from '@/components/App'
import TodoPage from '@/components/todo/components/TodoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <TodoPage />
    </div>
  )
}