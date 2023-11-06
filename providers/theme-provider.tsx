'use client'

import { ThemeProvider as Provider } from 'next-themes'

/**
 * The props of {@link ThemeProvider}.
 */
type ThemeProviderProps = {
    /**
     * The child elements to render.
     */
    children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <Provider
            attribute='class'
            disableTransitionOnChange
        >
            {children}
        </Provider>
    )
}

export default ThemeProvider
