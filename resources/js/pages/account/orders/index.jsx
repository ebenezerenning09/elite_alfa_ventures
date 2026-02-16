import { Head, Link, router } from '@inertiajs/react';
import AccountLayout from '@/layouts/account-layout';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import { Package, Eye, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function OrdersIndex({ orders, filters }) {
    const [verifyingOrderId, setVerifyingOrderId] = useState(null);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            delivered: 'bg-purple-100 text-purple-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleVerifyPayment = (orderId) => {
        setVerifyingOrderId(orderId);
        router.post(route('account.orders.verify-payment', orderId), {}, {
            preserveScroll: true,
            onFinish: () => {
                setVerifyingOrderId(null);
            },
        });
    };

    const canVerifyPayment = (order) => {
        // Check if order status is pending and payment exists with pending status
        return (
            order.status === 'pending' &&
            order.payment &&
            order.payment.status === 'pending' &&
            !order.payment.processed_at
        );
    };

    return (
        <AccountLayout activeTab="orders">
            <Head title="My Orders - Elite Alfa Ventures" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">My Orders</h2>
                </div>

                {orders.data && orders.data.length > 0 ? (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <div
                                key={order.id}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <Package className="h-5 w-5 text-[var(--color-brown)]" />
                                            <div>
                                                <Link
                                                    href={route('account.orders.show', order.id)}
                                                    className="text-[var(--color-deep-blue)] font-semibold hover:text-[var(--color-mustard-gold)] transition-colors"
                                                >
                                                    Order #{order.order_number}
                                                </Link>
                                                <span
                                                    className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-[var(--color-brown)] text-sm">
                                            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                        {order.order_items && order.order_items.length > 0 && (
                                            <p className="text-[var(--color-brown)] mt-1 text-sm">
                                                {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-[var(--color-deep-blue)] text-lg font-bold">
                                                ₵{Number(order.total_amount).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {canVerifyPayment(order) && (
                                                <Button
                                                    onClick={() => handleVerifyPayment(order.id)}
                                                    disabled={verifyingOrderId === order.id}
                                                    className="bg-[var(--color-mustard-gold)] text-white hover:bg-[var(--color-mustard-gold)]/90 disabled:opacity-50"
                                                >
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    {verifyingOrderId === order.id ? 'Verifying...' : 'Verify Payment'}
                                                </Button>
                                            )}
                                            <Link href={route('account.orders.show', order.id)}>
                                                <Button
                                                    variant="outline"
                                                    className="border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]"
                                                >
                                                    <Eye className="mr-2 h-4 w-4 text-[var(--color-brown)]" />
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <Pagination 
                            links={orders?.links} 
                            lastPage={orders?.last_page} 
                            className="mt-6" 
                        />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="text-[var(--color-deep-blue)] mt-4 text-xl font-semibold">
                            No orders yet
                        </h3>
                        <p className="text-[var(--color-brown)] mt-2">Start shopping to see your orders here</p>
                        <Link href="/shop" className="mt-6 inline-block">
                            <Button className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}
