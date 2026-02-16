import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { 
    Package, 
    CreditCard, 
    MapPin, 
    User, 
    LogOut,
    ShoppingBag
} from 'lucide-react';
import { router } from '@inertiajs/react';
import ToastProvider from '@/components/toast-provider';

export default function AccountLayout({ children, activeTab = 'orders' }) {
    const { auth } = usePage().props;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const navigation = [
        { name: 'Orders', href: route('account.orders.index'), icon: Package, key: 'orders' },
        { name: 'Payments', href: route('account.payments.index'), icon: CreditCard, key: 'payments' },
        { name: 'Addresses', href: route('account.addresses.index'), icon: MapPin, key: 'addresses' },
        { name: 'Profile', href: route('account.profile'), icon: User, key: 'profile' },
    ];

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[var(--color-off-white)]">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-[var(--color-deep-blue)] text-3xl font-bold">My Account</h1>
                    <p className="text-[var(--color-brown)] mt-2">Manage your orders, payments, and account settings</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <nav className="space-y-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.key;
                                
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-[var(--color-deep-blue)] text-white'
                                                : 'text-[var(--color-brown)] hover:bg-gray-100 hover:text-[var(--color-brown)]'
                                        )}
                                    >
                                        <Icon className={cn('h-5 w-5', isActive ? 'text-white' : 'text-[var(--color-brown)]')} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                            
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <Link
                                    href="/shop"
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-brown)] hover:bg-gray-100 hover:text-[var(--color-brown)] transition-colors"
                                >
                                    <ShoppingBag className="h-5 w-5 text-[var(--color-brown)]" />
                                    Continue Shopping
                                </Link>
                            </div>

                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
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
