import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import '../public/styles/globals.css'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'
import Providers from '@/providers'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: site.title,
        template: `%s ${site.titleTemplate}`,
    },
    description: site.description,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: site.name,
        card: 'summary_large_image',
        site: 'BasheerRajeh',
        creator: 'BasheerRajeh',
        images: [`${site.url}/images/og.png`],
    },
    keywords: site.keywords,
    openGraph: {
        url: `${site.url}`,
        type: 'website',
        title: site.title,
        siteName: site.title,
        description: site.description,
        locale: 'en-US',
        images: [
            {
                url: `${site.url}/images/og.png`,
                width: 1200,
                height: 630,
                alt: site.description,
                type: 'image/png',
            },
        ],
    },
    manifest: '/favicon/site.webmanifest',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/favicon/favicon.svg',
                color: '#fff',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/favicon/favicon-light.svg',
                color: '#000',
            },
        ],
        shortcut: '/favicon/favicon.svg',
        apple: [
            {
                url: '/favicon/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
        ],
        other: [...site.favicons],
    },
}

export const viewport: Viewport = {
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: '#ffffff',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: '#000000',
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang='en'
            className={cn(inter.variable, 'scroll-smooth')}
            suppressHydrationWarning
        >
            <body className='font-default'>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
