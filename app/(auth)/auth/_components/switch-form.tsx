'use client'

import { ArrowRightFromLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { FormVariant } from '../layout'

type SwitchFormProps = React.HTMLAttributes<HTMLButtonElement>

const SwitchForm: React.FC<SwitchFormProps> = ({ className, ...rest }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const variant: FormVariant =
        searchParams.get('type')?.toUpperCase() === 'LOGIN'
            ? 'LOGIN'
            : 'REGISTER'

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') router.replace('/auth?type=register')
        if (variant === 'REGISTER') router.replace('/auth?type=login')
    }, [variant, router])

    return (
        <Button
            variant='ghost'
            onClick={toggleVariant}
            className={cn('flex gap-2', className)}
            {...rest}
        >
            {variant === 'LOGIN' ? 'Register' : 'Login'}
            <ArrowRightFromLine className='h-5 w-5' />
        </Button>
    )
}

export default SwitchForm
