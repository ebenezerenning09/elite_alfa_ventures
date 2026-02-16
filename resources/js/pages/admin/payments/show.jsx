import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Package, CreditCard } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
                                <div className="text-[var(--color-brown)] text-sm font-medium">Payment Reference</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">{payment.payment_reference}</div>
                            </div>
                            {payment.transaction_id && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Transaction ID</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1 font-mono text-sm break-all">{payment.transaction_id}</div>
                                </div>
                            )}
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Amount</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-xl font-bold">₵{Number(payment.amount).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Currency</div>
                                <div className="text-[var(--color-deep-blue)] mt-1">{payment.currency || 'GHS'}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={payment.status} />
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Payment Method</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 capitalize">{payment.payment_method || 'N/A'}</div>
                            </div>
                            {payment.payment_date && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Payment Date</div>
                                    <div className="text-[var(--color-brown)] mt-1">{new Date(payment.payment_date).toLocaleString()}</div>
                                </div>
                            )}
                            {payment.processed_at && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Processed At</div>
                                    <div className="text-[var(--color-brown)] mt-1">{new Date(payment.processed_at).toLocaleString()}</div>
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
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Name</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1 font-semibold">
                                        {payment.user.full_name || payment.user.name || 'N/A'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Email</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{payment.user.email}</div>
                                </div>
                                {payment.user.phone && (
                                    <div>
                                        <div className="text-[var(--color-brown)] text-sm font-medium">Phone</div>
                                        <div className="text-[var(--color-deep-blue)] mt-1">{payment.user.phone}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Account Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={payment.user.is_active ? 'active' : 'inactive'} />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Link href={route('admin.users.show', payment.user.id)}>
                                        <Button variant="outline" size="sm" className="w-full border-[var(--color-deep-blue)] text-[var(--color-deep-blue)] hover:bg-[var(--color-deep-blue)] hover:text-white">
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
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Order Number</div>
                                    <Link href={route('admin.orders.show', payment.order.id)} className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold hover:underline block">
                                        #{payment.order.order_number}
                                    </Link>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Order Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={payment.order.status} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Order Total</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">₵{Number(payment.order.total_amount).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Order Date</div>
                                    <div className="text-[var(--color-brown)] mt-1">{new Date(payment.order.created_at).toLocaleString()}</div>
                                </div>
                                {payment.order.shipping_address && (
                                    <div>
                                        <div className="text-[var(--color-brown)] text-sm font-medium">Shipping Address</div>
                                        <div className="text-[var(--color-brown)] mt-1 text-sm">
                                            <div>{payment.order.shipping_address.address}</div>
                                            <div>{payment.order.shipping_address.town}, {payment.order.shipping_address.region}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="pt-2">
                                    <Link href={route('admin.orders.show', payment.order.id)}>
                                        <Button variant="outline" size="sm" className="w-full border-[var(--color-deep-blue)] text-[var(--color-deep-blue)] hover:bg-[var(--color-deep-blue)] hover:text-white">
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
                                    <div key={item.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors">
                                        {item.product?.images?.[0] && (
                                            <img
                                                src={item.product.images[0].image_path}
                                                alt={item.product.name}
                                                className="h-20 w-20 rounded object-cover border border-gray-200"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="text-[var(--color-deep-blue)] font-semibold text-lg">{item.product?.name || 'Product not found'}</div>
                                            <div className="text-[var(--color-brown)] text-sm mt-1">
                                                Quantity: {item.quantity} × ₵{Number(item.price).toLocaleString()}
                                            </div>
                                            {item.product && (
                                                <Link href={route('admin.products.show', item.product.id)} className="text-[var(--color-deep-blue)] text-sm hover:underline mt-1 inline-block">
                                                    View Product
                                                </Link>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[var(--color-deep-blue)] font-bold text-lg">₵{Number(item.price * item.quantity).toLocaleString()}</div>
                                            <div className="text-[var(--color-brown)] text-sm">Subtotal</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <div className="text-[var(--color-brown)] font-semibold">Order Total</div>
                                        <div className="text-[var(--color-deep-blue)] text-xl font-bold">₵{Number(payment.order.total_amount).toLocaleString()}</div>
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
