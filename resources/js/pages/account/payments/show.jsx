import { Head, Link } from '@inertiajs/react';
import AccountLayout from '@/layouts/account-layout';
import { CreditCard, Package } from 'lucide-react';

export default function PaymentShow({ payment }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            completed: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AccountLayout activeTab="payments">
            <Head title={`Payment #${payment.payment_reference} - Elite Alfa Ventures`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={route('account.payments.index')}
                        className="text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)] transition-colors text-sm"
                    >
                        ← Back to Payments
                    </Link>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">
                            Payment #{payment.payment_reference}
                        </h2>
                        <span
                            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                                payment.status
                            )}`}
                        >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-[var(--color-brown)] text-sm">Payment Date</p>
                        <p className="text-[var(--color-deep-blue)] font-semibold">
                            {payment.payment_date
                                ? new Date(payment.payment_date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })
                                : 'Pending'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Payment Details */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-semibold">
                            Payment Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-[var(--color-brown)]">Amount</span>
                                <span className="text-[var(--color-deep-blue)] font-semibold">
                                    ₵{Number(payment.amount).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--color-brown)]">Currency</span>
                                <span className="text-[var(--color-deep-blue)] font-semibold">
                                    {payment.currency || 'GHS'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--color-brown)]">Payment Method</span>
                                <span className="text-[var(--color-deep-blue)] font-semibold">
                                    {payment.payment_method || 'Paystack'}
                                </span>
                            </div>
                            {payment.transaction_id && (
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-brown)]">Transaction ID</span>
                                    <span className="text-[var(--color-deep-blue)] font-mono text-sm">
                                        {payment.transaction_id}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Order */}
                    {payment.order && (
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-semibold">
                                Related Order
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <Link
                                        href={route('account.orders.show', payment.order.id)}
                                        className="text-[var(--color-deep-blue)] font-semibold hover:text-[var(--color-mustard-gold)] transition-colors"
                                    >
                                        Order #{payment.order.order_number}
                                    </Link>
                                </div>
                                {payment.order.order_items && payment.order.order_items.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-[var(--color-brown)] text-sm font-medium">
                                            Items ({payment.order.order_items.length}):
                                        </p>
                                        {payment.order.order_items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-2">
                                                <Package className="h-4 w-4 text-[var(--color-brown)]" />
                                                <span className="text-[var(--color-brown)] text-sm">
                                                    {item.product?.name} × {item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    );
}
