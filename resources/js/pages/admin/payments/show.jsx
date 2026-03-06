import AdminLayout from '@/components/admin/Layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CreditCard, Package, User } from 'lucide-react';

export default function PaymentShow({ payment }) {
    return (
        <AdminLayout activeTab="payments" title={`Payment: ${payment.payment_reference}`}>
            <Head title={`Payment: ${payment.payment_reference}`} />

            <div className="p-6">
                <Link href={route('admin.payments.index')}>
                    <Button variant="ghost" className="mb-4 text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Payments
                    </Button>
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Payment Details */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-[var(--color-deep-blue)]" />
                                <CardTitle className="text-[var(--color-deep-blue)]">Payment Details</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Payment Reference</div>
                                <div className="mt-1 text-lg font-semibold text-[var(--color-deep-blue)]">{payment.payment_reference}</div>
                            </div>
                            {payment.transaction_id && (
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Transaction ID</div>
                                    <div className="mt-1 font-mono text-sm break-all text-[var(--color-deep-blue)]">{payment.transaction_id}</div>
                                </div>
                            )}
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Amount</div>
                                <div className="mt-1 text-xl font-bold text-[var(--color-deep-blue)]">₵{Number(payment.amount).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Currency</div>
                                <div className="mt-1 text-[var(--color-deep-blue)]">{payment.currency || 'GHS'}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={payment.status} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Payment Method</div>
                                <div className="mt-1 text-[var(--color-deep-blue)] capitalize">{payment.payment_method || 'N/A'}</div>
                            </div>
                            {payment.payment_date && (
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Payment Date</div>
                                    <div className="mt-1 text-[var(--color-brown)]">{new Date(payment.payment_date).toLocaleString()}</div>
                                </div>
                            )}
                            {payment.processed_at && (
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Processed At</div>
                                    <div className="mt-1 text-[var(--color-brown)]">{new Date(payment.processed_at).toLocaleString()}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Customer Details */}
                    {payment.user && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-[var(--color-deep-blue)]" />
                                    <CardTitle className="text-[var(--color-deep-blue)]">Customer Information</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Name</div>
                                    <div className="mt-1 font-semibold text-[var(--color-deep-blue)]">
                                        {payment.user.full_name || payment.user.name || 'N/A'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Email</div>
                                    <div className="mt-1 text-[var(--color-deep-blue)]">{payment.user.email}</div>
                                </div>
                                {payment.user.phone && (
                                    <div>
                                        <div className="text-sm font-medium text-[var(--color-brown)]">Phone</div>
                                        <div className="mt-1 text-[var(--color-deep-blue)]">{payment.user.phone}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Account Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={payment.user.is_active ? 'active' : 'inactive'} />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Link href={route('admin.users.show', payment.user.id)}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-[var(--color-deep-blue)] text-[var(--color-deep-blue)] hover:bg-[var(--color-deep-blue)] hover:text-white"
                                        >
                                            View Customer Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Order Details */}
                    {payment.order && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Package className="h-5 w-5 text-[var(--color-deep-blue)]" />
                                    <CardTitle className="text-[var(--color-deep-blue)]">Order Information</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Order Number</div>
                                    <Link
                                        href={route('admin.orders.show', payment.order.id)}
                                        className="mt-1 block text-lg font-semibold text-[var(--color-deep-blue)] hover:underline"
                                    >
                                        #{payment.order.order_number}
                                    </Link>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Order Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={payment.order.status} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Order Total</div>
                                    <div className="mt-1 text-lg font-semibold text-[var(--color-deep-blue)]">
                                        ₵{Number(payment.order.total_amount).toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Order Date</div>
                                    <div className="mt-1 text-[var(--color-brown)]">{new Date(payment.order.created_at).toLocaleString()}</div>
                                </div>
                                {payment.order.shipping_address && (
                                    <div className="mt-4 border-t border-gray-100 pt-4">
                                        <h4 className="mb-2 text-sm font-semibold text-[var(--color-brown)]">Delivery Information</h4>
                                        <div className="text-sm text-gray-700">
                                            <div>{payment.order.shipping_address}</div>
                                            <div>
                                                {payment.order.shipping_town}, {payment.order.shipping_region}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pt-2">
                                    <Link href={route('admin.orders.show', payment.order.id)}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full border-[var(--color-deep-blue)] text-[var(--color-deep-blue)] hover:bg-[var(--color-deep-blue)] hover:text-white"
                                        >
                                            View Full Order Details
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Order Items */}
                {payment.order && payment.order.order_items && payment.order.order_items.length > 0 && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Order Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {payment.order.order_items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                                    >
                                        {item.product?.images?.[0] && (
                                            <img
                                                src={item.product.images[0].image_path}
                                                alt={item.product.name}
                                                className="h-20 w-20 rounded border border-gray-200 object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="text-lg font-semibold text-[var(--color-deep-blue)]">
                                                {item.product?.name || 'Product not found'}
                                            </div>
                                            <div className="mt-1 text-sm text-[var(--color-brown)]">
                                                Quantity: {item.quantity} × ₵{Number(item.price).toLocaleString()}
                                            </div>
                                            {item.product && (
                                                <Link
                                                    href={route('admin.products.show', item.product.id)}
                                                    className="mt-1 inline-block text-sm text-[var(--color-deep-blue)] hover:underline"
                                                >
                                                    View Product
                                                </Link>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-[var(--color-deep-blue)]">
                                                ₵{Number(item.price * item.quantity).toLocaleString()}
                                            </div>
                                            <div className="text-sm text-[var(--color-brown)]">Subtotal</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="font-semibold text-[var(--color-brown)]">Order Total</div>
                                        <div className="text-xl font-bold text-[var(--color-deep-blue)]">
                                            ₵{Number(payment.order.total_amount).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
