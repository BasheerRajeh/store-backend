'use client'

import { useTheme } from 'next-themes'
import { toast } from 'sonner'

const ThemeSwitcher = () => {
    const { resolvedTheme: theme, setTheme } = useTheme()
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        toast.success('Theme changed successfully')
    }
    return (
        <button
            type='button'
            onClick={toggleTheme}
            className='rounded-md bg-sky-500 px-4 py-2'
        >
            Toggle Theme
        </button>
    )
}

export default ThemeSwitcher
