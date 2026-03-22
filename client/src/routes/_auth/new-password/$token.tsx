import { NewPasswordForm } from '@/components/auth/components/NewPasswordForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/new-password/$token')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <NewPasswordForm />
    </div>
  )
}
