import { useRef } from 'react'
import { SnackbarProvider as NotistackProvider, SnackbarKey } from 'notistack'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import MaterialDesignContent from './styles'

type Props = {
    children: React.ReactNode
}

export default function SnackbarProvider({ children }: Props) {
    const notistackRef = useRef<any>(null)

    const onClose = (key: SnackbarKey) => () => {
        notistackRef.current.closeSnackbar(key)
    }

    return (
        <>
            <NotistackProvider
                ref={notistackRef}
                dense
                maxSnack={5}
                preventDuplicate
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                iconVariant={{
                    info: <SnackbarIcon icon="info" color="info" />,
                    success: <SnackbarIcon icon="success" color="success" />,
                    warning: <SnackbarIcon icon="warning" color="warning" />,
                    error: <SnackbarIcon icon="error" color="error" />,
                }}
                action={(key) => (
                    <button
                        onClick={onClose(key)}
                        className="p-1 text-white hover:bg-white/20 rounded transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
                className="!font-sans"
                Components={{
                    success: MaterialDesignContent,
                    error: MaterialDesignContent,
                    warning: MaterialDesignContent,
                    info: MaterialDesignContent,
                }}
            >
                {children}
            </NotistackProvider>
        </>
    )
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
    icon: 'info' | 'success' | 'warning' | 'error'
    color: 'info' | 'success' | 'warning' | 'error'
}

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
    const getIconComponent = () => {
        switch (icon) {
            case 'success':
                return <CheckCircle size={20} />
            case 'error':
                return <AlertCircle size={20} />
            case 'warning':
                return <AlertTriangle size={20} />
            case 'info':
                return <Info size={20} />
            default:
                return <Info size={20} />
        }
    }

    const getColorClasses = () => {
        switch (color) {
            case 'success':
                return 'bg-green-500/80 text-white'
            case 'error':
                return 'bg-red-500/80 text-white'
            case 'warning':
                return 'bg-yellow-500/80 text-white'
            case 'info':
                return 'bg-blue-500/80 text-white'
            default:
                return 'bg-blue-500/80 text-white'
        }
    }

    return (
        <div className={`mr-3 w-10 h-10 flex items-center justify-center rounded-lg ${getColorClasses()}`}>
            {getIconComponent()}
        </div>
    )
}
