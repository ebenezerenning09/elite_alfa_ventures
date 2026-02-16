import { Head, Link } from '@inertiajs/react';
import AccountLayout from '@/layouts/account-layout';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import { CreditCard, Eye } from 'lucide-react';

export default function PaymentsIndex({ payments }) {
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
            <Head title="My Payments - Elite Alfa Ventures" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">My Payments</h2>
                </div>

                {payments.data && payments.data.length > 0 ? (
                    <div className="space-y-4">
                        {payments.data.map((payment) => (
                            <div
                                key={payment.id}
                                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <CreditCard className="h-5 w-5 text-[var(--color-brown)]" />
                                            <div>
                                                <div className="text-[var(--color-deep-blue)] font-semibold">
                                                    Payment #{payment.payment_reference}
                                                </div>
                                                {payment.order && (
                                                    <Link
                                                        href={route('account.orders.show', payment.order.id)}
                                                        className="text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)] transition-colors text-sm"
                                                    >
                                                        Order #{payment.order.order_number}
                                                    </Link>
                                                )}
                                                <span
                                                    className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                                                        payment.status
                                                    )}`}
                                                >
                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-[var(--color-brown)] text-sm">
                                            {payment.payment_date
                                                ? new Date(payment.payment_date).toLocaleDateString('en-US', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                  })
                                                : 'Pending'}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-[var(--color-deep-blue)] text-lg font-bold">
                                                ₵{Number(payment.amount).toLocaleString()}
                                            </p>
                                            <p className="text-[var(--color-brown)] text-xs">
                                                {payment.currency || 'GHS'}
                                            </p>
                                        </div>
                                        <Link href={route('account.payments.show', payment.id)}>
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
                        ))}

                        {/* Pagination */}
                        <Pagination 
                            links={payments?.links} 
                            lastPage={payments?.last_page} 
                            className="mt-6" 
                        />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CreditCard className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="text-[var(--color-deep-blue)] mt-4 text-xl font-semibold">
                            No payments yet
                        </h3>
                        <p className="text-[var(--color-brown)] mt-2">
                            Your payment history will appear here after you make a purchase
                        </p>
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}
