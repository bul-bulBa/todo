import ResetPasswordForm from '@/components/auth/components/ResetPasswordForm'
import { createFileRoute } from '@tanstack/react-router'
import type React from 'react'

export const Route = createFileRoute('/_auth/reset-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full w-full flex justify-center items-center'>
    <ResetPasswordForm />
  </div>
}