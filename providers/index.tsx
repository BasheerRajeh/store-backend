'use client'

import ThemeProvider from './theme-provider'

/**
 * The props of {@link Providers}.
 */
type ProvidersProps = {
    /**
     * The child elements to render.
     */
    children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

export default Providers
