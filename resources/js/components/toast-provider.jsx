import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const Toast = ({ type, message, onHide }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [exit, setExit] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setExit(true);
                setTimeout(() => {
                    setIsVisible(false);
                    setExit(false);
                    if (onHide) onHide();
                }, 300);
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [message, onHide]);

    if (!isVisible || !message) return null;

    const getIcon = () => {
        if (type === 'success') {
            return <CheckCircle2 className="h-6 w-6 text-green-500" />;
        } else if (type === 'error') {
            return <XCircle className="h-6 w-6 text-red-500" />;
        } else {
            return <AlertTriangle className="h-6 w-6 text-yellow-400" />;
        }
    };

    return (
        <div
            className={`fixed top-4 right-4 z-[9999] transform transition-all duration-300 ${
                exit ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
        >
            <div
                className={`w-80 rounded-lg border p-4 shadow-lg ${
                    type === 'success'
                        ? 'border-green-200 bg-green-50'
                        : type === 'error'
                          ? 'border-red-200 bg-red-50'
                          : 'border-yellow-200 bg-yellow-50'
                }`}
            >
                <div className="flex items-start gap-2">
                    {getIcon()}
                    <div className="flex-1">
                        <h3
                            className={`text-sm font-semibold ${
                                type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-yellow-800'
                            }`}
                        >
                            {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Warning'}
                        </h3>
                        <p
                            className={`mt-1 text-sm ${
                                type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-yellow-700'
                            }`}
                        >
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setExit(true);
                            setTimeout(() => {
                                setIsVisible(false);
                                setExit(false);
                                if (onHide) onHide();
                            }, 300);
                        }}
                        className={`hover:bg-opacity-20 rounded-full p-1 ${
                            type === 'success'
                                ? 'text-green-700 hover:bg-green-200'
                                : type === 'error'
                                  ? 'text-red-700 hover:bg-red-200'
                                  : 'text-yellow-700 hover:bg-yellow-200'
                        }`}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState({
        success: null,
        warning: null,
        error: null,
    });

    const { props } = usePage();
    const flash = props.flash || {};

    const handleHide = (type) => {
        setToasts((prev) => ({
            ...prev,
            [type]: null,
        }));
    };

    useEffect(() => {
        if (flash.success) {
            setToasts((prev) => ({
                ...prev,
                success: {
                    message: flash.success,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }

        if (flash.error) {
            setToasts((prev) => ({
                ...prev,
                error: {
                    message: flash.error,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }

        if (flash.warning) {
            setToasts((prev) => ({
                ...prev,
                warning: {
                    message: flash.warning,
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                },
            }));
        }
    }, [flash]);

    // Handle client-side toast events without Inertia reload
    useEffect(() => {
        const handleToastEvent = (e) => {
            const { type, message } = e.detail;
            if (['success', 'error', 'warning'].includes(type) && message) {
                setToasts((prev) => ({
                    ...prev,
                    [type]: {
                        message,
                        id: Date.now() + Math.random().toString(36).substr(2, 9),
                    },
                }));
            }
        };

        window.addEventListener('toast', handleToastEvent);
        return () => window.removeEventListener('toast', handleToastEvent);
    }, []);

    return (
        <>
            {toasts.success && <Toast key={toasts.success.id} type="success" message={toasts.success.message} onHide={() => handleHide('success')} />}
            {toasts.error && <Toast key={toasts.error.id} type="error" message={toasts.error.message} onHide={() => handleHide('error')} />}
            {toasts.warning && <Toast key={toasts.warning.id} type="warning" message={toasts.warning.message} onHide={() => handleHide('warning')} />}
            {children}
        </>
    );
}
