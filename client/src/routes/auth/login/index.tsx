import LoginForm from '@/components/auth/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <LoginForm />
    </div>
  )
}
