import { useAuth } from '@/lib/hooks/useAuth'
import { createFileRoute, isRedirect, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout
})


function AuthLayout() {
  const { data: user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Якщо завантаження завершено і користувач АВТОРИЗОВАНИЙ
    if (!isLoading && user) {
      navigate({ to: '/todo', replace: true })
    }
  }, [user, isLoading, navigate])

  if (isLoading) return <p>Loading...</p>

  return <Outlet /> // Рендеримо /login або /register
}