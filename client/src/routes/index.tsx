import { useIsAuth } from '@/clientStore/isAuth'
import App from '@/components/App'
import TodoPage from '@/components/todo/components/TodoPage'
import FullScreenLoader from '@/lib/components/FullScreenLoader'
import { useAuth } from '@/lib/hooks/useAuth'
import { createFileRoute, Outlet, redirect, useNavigate, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const navigate = useNavigate()
  const { data: user, isLoading } = useAuth();
  // const { auth } = Route.useRouteContext()

  // useEffect(() => {
  //   console.log(auth.isLoading)
  //   if (!auth.isLoading) {
  //     if (auth.user) {
  //       navigate({ to: '/todo', replace: true })
  //     } else {
  //       navigate({ to: '/login', replace: true })
  //     }
  //   }
  // }, [auth.isLoading, auth.user, navigate])

  useEffect(() => {
    // Чекаємо, поки isLoading стане false
    console.log(user, isLoading)
    if (!isLoading) {
      if (user) {
        // replace: true, щоб користувач не міг повернутися назад на "/"
        navigate({ to: '/todo', replace: true })
      } else {
        navigate({ to: '/login', replace: true })
      }
    }
  }, [user, isLoading, navigate])

  // Поки чекаємо на відповідь isAuth, рендеримо порожній екран або спінер
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Завантаження...</p>
      </div>
    )
  }

  return null
}