import { Metadata } from 'next'

import Icons from '@/components/icons'

import SwitchForm from './_components/switch-form'

export type FormVariant = 'LOGIN' | 'REGISTER'

type AuthLayoutProps = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Sign in / Sign up',
    description: 'Login to access to store dashboard',
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className='container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <SwitchForm className='absolute right-4 top-4 font-bold capitalize md:right-8 md:top-8' />
            <div className='relative hidden h-full flex-col bg-muted p-10 text-muted-foreground dark:border-r lg:flex'>
                <div className='absolute inset-0 bg-zinc-200 dark:bg-zinc-900' />
                <div className='relative z-20 flex items-center text-lg font-medium'>
                    <Icons.logo className='h-16 w-16' />
                </div>
            </div>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
