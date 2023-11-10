import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

type ToastProvider = {
    position?:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right'
    expand?: boolean
    richColors?: boolean
}

const ToastProvider: React.FC<ToastProvider> = ({
    position = 'bottom-right',
    expand = false,
    richColors = false,
}) => {
    const { resolvedTheme: theme } = useTheme()

    return (
        <Toaster
            theme={theme === 'dark' ? 'dark' : 'light'}
            visibleToasts={3}
            position={position}
            expand={expand}
            richColors={richColors}
        />
    )
}

export default ToastProvider
