'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import Icons from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Please provide a valid email address.' }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long.',
    }),
})

type LoginFormProps = {
    loading: boolean
} & React.HTMLAttributes<HTMLFormElement>

const LoginForm: React.FC<LoginFormProps> = ({ loading }) => {
    const [isLoading, setIsLoading] = useState<boolean>(loading)
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = form

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        if (isValid) {
            setIsLoading(true)
            await signIn('credentials', {
                ...values,
                redirect: true,
                callbackUrl: '/',
            })
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-5'
                >
                    <div className='grid gap-2'>
                        <div className='grid gap-1'>
                            <FormField
                                control={control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='sr-only'>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Email'
                                                type='email'
                                                autoCapitalize='none'
                                                autoComplete='email'
                                                autoCorrect='off'
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='sr-only'>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Password'
                                                type='password'
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            disabled={isLoading}
                            className='flex gap-2'
                        >
                            {isLoading && (
                                <Icons.spinner className='h-4 w-4 animate-spin' />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </Form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                        Or continue with
                    </span>
                </div>
            </div>
        </>
    )
}

export default LoginForm
