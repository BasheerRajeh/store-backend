import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import db from '@/lib/db'

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body

    const user = await db.user.findUnique({
        where: {
            email,
        },
    })

    if (user)
        return NextResponse.json(
            {
                error: 'User with this email already exists',
                errorCode: 'USER_ALREADY_EXISTS',
            },
            { status: 409 },
        )

    const hashedPassword = await bcrypt.hash(password as string, 12)

    const newUser = await db.user.create({
        data: {
            email,
            hashedPassword,
        },
    })

    return NextResponse.json(newUser)
}
