'use client'

import ThemeProvider from './theme-provider'
import ToastProvider from './toast-provider'

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
    return (
        <ThemeProvider>
            {children}
            <ToastProvider />
        </ThemeProvider>
    )
}

export default Providers
