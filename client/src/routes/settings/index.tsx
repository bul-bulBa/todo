import SettingsPage from '@/components/settings/components/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <SettingsPage />
    </div>
  )
}
