import UserNav from '@/components/dashboard/user-nav'
import { getCurrentUser } from '@/lib/get-current-user'

import ThemeSwitcher from './theme-switcher'

/**
 * Home Page
 */
export default async function Home() {
    const user = await getCurrentUser()
    return (
        <div>
            <h1>Hello empty project</h1>
            <ThemeSwitcher />
            <UserNav user={user} />
        </div>
    )
}
