import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderShow({ order }) {
    return (
        <AdminLayout activeTab="orders" title={`Order: ${order.order_number}`}>
            <Head title={`Order: ${order.order_number}`} />

            <div className="p-6">
                <Link href={route('admin.orders.index')}>
                    <Button variant="ghost" className="mb-4 text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Button>
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Order Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Order Number</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">#{order.order_number}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Total Amount</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-xl font-bold">₵{Number(order.total_amount).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Order Date</div>
                                <div className="text-[var(--color-brown)] mt-1">{new Date(order.created_at).toLocaleString()}</div>
                            </div>
                            {order.user && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Customer</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{order.user.email}</div>
                                    {order.user.name && (
                                        <div className="text-[var(--color-brown)] text-sm">{order.user.name}</div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {order.payment && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-[var(--color-deep-blue)]">Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Payment Reference</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{order.payment.payment_reference}</div>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={order.payment.status} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Amount</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">₵{Number(order.payment.amount).toLocaleString()}</div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {order.shipping_address && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-[var(--color-deep-blue)]">Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-[var(--color-brown)]">
                                    <div>{order.shipping_address.address}</div>
                                    <div>{order.shipping_address.town}, {order.shipping_address.region}</div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-[var(--color-deep-blue)]">Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {order.order_items && order.order_items.length > 0 ? (
                            <div className="space-y-4">
                                {order.order_items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                        {item.product?.images?.[0] && (
                                            <img
                                                src={item.product.images[0].image_path}
                                                alt={item.product.name}
                                                className="h-16 w-16 rounded object-cover"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="text-[var(--color-deep-blue)] font-semibold">{item.product?.name}</div>
                                            <div className="text-[var(--color-brown)] text-sm">Quantity: {item.quantity}</div>
                                        </div>
                                        <div className="text-[var(--color-deep-blue)] font-bold">₵{Number(item.price * item.quantity).toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--color-brown)] text-center">No items found</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
