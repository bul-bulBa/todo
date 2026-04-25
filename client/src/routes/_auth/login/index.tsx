import LoginForm from '@/components/auth/components/LoginForm'
// import { useQueryOptions } from '@/components/todo/hooks/useMeQuery'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <LoginForm />
    </div>
  )
}
