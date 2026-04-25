import RegisterForm from '@/components/auth/components/RegisterForm'
import type { TypeRegisterSchema } from '@/components/auth/schemas/register.schema'
// import { useQueryOptions } from '@/components/todo/hooks/useMeQuery'
import { createFileRoute, redirect } from '@tanstack/react-router'
import type React from 'react'

export const Route = createFileRoute('/_auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full w-full flex justify-center items-center'>
    <RegisterForm />
  </div>
}
