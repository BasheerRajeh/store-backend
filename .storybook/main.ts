import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: async (config, { configType }) => {
        if (config.resolve)
            config.resolve.alias = {
                ...config.resolve.alias,
                '@/app': path.resolve(__dirname, '../app'),
                '@/public': path.resolve(__dirname, '../public'),
                '@/components': path.resolve(__dirname, '../components'),
            }
        return config
    },
    staticDirs: ['../public'],
}
export default config
