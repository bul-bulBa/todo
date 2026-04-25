import { useAuth } from '@/lib/hooks/useAuth'
import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout
})

function ProtectedLayout() {
  const { data: user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Якщо завантаження завершено і користувач НЕ авторизований
    if (!isLoading && !user) {
      navigate({ to: '/login', replace: true })
    }
  }, [user, isLoading, navigate])

  if (isLoading) return <p>Loading...</p>

  return <Outlet /> // Рендеримо /todo
}