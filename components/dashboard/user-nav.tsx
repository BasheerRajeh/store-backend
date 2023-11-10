'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import Icons from '../icons'

type UserNavProps = {
    user: Pick<User, 'id' | 'email' | 'image' | 'name'> | undefined
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
    const router = useRouter()
    if (!user)
        return (
            <Button
                variant='ghost'
                onClick={() => router.push('/auth')}
            >
                Sign in
            </Button>
        )
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='relative h-8 w-8 rounded-full'
                >
                    <Avatar className='h-8 w-8'>
                        <AvatarImage
                            src={user.image as string}
                            alt={`${user.name}'s picture`}
                        />
                        <AvatarFallback>
                            <Icons.user
                                className='fill-muted text-muted-foreground'
                                strokeWidth={2}
                            />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='max-h-72 w-44'
                align='end'
                forceMount
            >
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1.5 truncate'>
                        <p className='text-sm font-medium leading-none'>
                            {user.name}
                        </p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className='cursor-pointer'
                    >
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav
