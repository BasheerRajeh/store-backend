'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import Icons from '@/components/icons'
import { Button } from '@/components/ui/button'

import { FormVariant } from './layout'

const LoginForm = dynamic(() => import('./_components/login-form'), {
    ssr: false,
})
const RegisterForm = dynamic(() => import('./_components/register-form'), {
    ssr: false,
})

type ProviderLogin = 'GOOGLE' | 'GITHUB'

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const variant: FormVariant =
        searchParams.get('type')?.toUpperCase() === 'LOGIN'
            ? 'LOGIN'
            : 'REGISTER'

    const signInWithProvider = async (provider: ProviderLogin) => {
        if (provider === 'GOOGLE') {
            setIsLoading(true)
            await signIn('google', { redirect: true, callbackUrl: '/' })
            setIsLoading(false)
        }
        if (provider === 'GITHUB') {
            setIsLoading(true)
            await signIn('github', { redirect: true, callbackUrl: '/' })
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='flex flex-col space-y-2 text-center'>
                <h1 className='text-2xl font-semibold tracking-tight'>
                    {variant === 'LOGIN'
                        ? 'Login with your account'
                        : 'Create a new account'}
                </h1>
                <p className='text-sm text-muted-foreground'>
                    {variant === 'LOGIN'
                        ? 'Enter your email below to login to your account'
                        : 'Enter your email below to create a new account'}
                </p>
            </div>
            <div className='grid gap-6'>
                {variant === 'LOGIN' ? (
                    <LoginForm loading={isLoading} />
                ) : (
                    <RegisterForm loading={isLoading} />
                )}
                <div className='grid gap-4 md:grid-cols-2'>
                    <Button
                        variant='outline'
                        type='button'
                        className='flex gap-2'
                        disabled={isLoading}
                        onClick={() => signInWithProvider('GITHUB')}
                    >
                        {isLoading ? (
                            <Icons.spinner className='h-4 w-4 animate-spin' />
                        ) : (
                            <Icons.gitHub className='h-4 w-4' />
                        )}{' '}
                        Github
                    </Button>
                    <Button
                        variant='outline'
                        type='button'
                        className='flex gap-2'
                        disabled={isLoading}
                        onClick={() => signInWithProvider('GOOGLE')}
                    >
                        {isLoading ? (
                            <Icons.spinner className='h-4 w-4 animate-spin' />
                        ) : (
                            <Icons.google className='h-4 w-4' />
                        )}{' '}
                        Google
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AuthPage
