import RegisterForm from '@/components/auth/components/RegisterForm'
import type { TypeRegisterSchema } from '@/components/auth/schemas/register.schema'
import { createFileRoute } from '@tanstack/react-router'
import type React from 'react'

export const Route = createFileRoute('/auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full w-full flex justify-center items-center'>
    <RegisterForm />
  </div>
}
