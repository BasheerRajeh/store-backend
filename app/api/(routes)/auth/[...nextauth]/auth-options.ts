import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import db from '@/lib/db'

const invalidMessage = 'Invalid credentials'
const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error(invalidMessage)
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error(invalidMessage)
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                )

                if (!isCorrectPassword) throw new Error(invalidMessage)

                return user
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',

    secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions

export default authOptions
