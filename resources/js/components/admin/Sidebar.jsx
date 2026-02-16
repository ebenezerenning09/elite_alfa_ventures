import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Package, ShoppingBag, CreditCard, Users, LogOut } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Sidebar({ activeTab = 'dashboard' }) {
    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, key: 'dashboard' },
        { name: 'Products', href: route('admin.products.index'), icon: Package, key: 'products' },
        { name: 'Orders', href: route('admin.orders.index'), icon: ShoppingBag, key: 'orders' },
        { name: 'Payments', href: route('admin.payments.index'), icon: CreditCard, key: 'payments' },
        { name: 'Users', href: route('admin.users.index'), icon: Users, key: 'users' },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('admin.logout'));
    };

    return (
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
    );
}
