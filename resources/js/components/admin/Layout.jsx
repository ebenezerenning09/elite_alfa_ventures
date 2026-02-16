import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import ToastProvider from '@/components/toast-provider';

export default function AdminLayout({ children, activeTab = 'dashboard', title = 'Admin Dashboard' }) {
    return (
        <ToastProvider>
            <Head title={title} />
            <div className="min-h-screen bg-[var(--color-off-white)]">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-[var(--color-deep-blue)] text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-[var(--color-brown)] mt-2">Manage products, orders, payments, and users</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <Sidebar activeTab={activeTab} />

                        <main className="lg:col-span-3">
                            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </ToastProvider>
    );
}
