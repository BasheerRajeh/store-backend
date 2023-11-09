import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

import db from '@/lib/db'

export async function POST(req: Request) {
    const body = await req.json()
    const { email, password } = body
    const hashedPassword = await bcrypt.hash(password as string, 12)

    const user = await db.user.create({
        data: {
            email,
            hashedPassword,
        },
    })

    return NextResponse.json(user)
}
