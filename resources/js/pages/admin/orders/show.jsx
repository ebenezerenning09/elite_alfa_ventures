import AdminLayout from '@/components/admin/Layout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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
                                <div className="text-sm font-medium text-[var(--color-brown)]">Order Number</div>
                                <div className="mt-1 text-lg font-semibold text-[var(--color-deep-blue)]">#{order.order_number}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={order.status} />
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Total Amount</div>
                                <div className="mt-1 text-xl font-bold text-[var(--color-deep-blue)]">
                                    ₵{Number(order.total_amount).toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-[var(--color-brown)]">Order Date</div>
                                <div className="mt-1 text-[var(--color-brown)]">{new Date(order.created_at).toLocaleString()}</div>
                            </div>
                            {order.user && (
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Customer</div>
                                    <div className="mt-1 text-[var(--color-deep-blue)]">{order.user.email}</div>
                                    {order.user.name && <div className="text-sm text-[var(--color-brown)]">{order.user.name}</div>}
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
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Payment Reference</div>
                                    <div className="mt-1 text-[var(--color-deep-blue)]">{order.payment.payment_reference}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Status</div>
                                    <div className="mt-1">
                                        <StatusBadge status={order.payment.status} />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-[var(--color-brown)]">Amount</div>
                                    <div className="mt-1 text-lg font-semibold text-[var(--color-deep-blue)]">
                                        ₵{Number(order.payment.amount).toLocaleString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Shipping Information */}
                    {order.shipping_full_name && (
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-deep-blue)]">
                                <MapPin className="h-5 w-5" />
                                Delivery Information
                            </h3>
                            <div className="flex flex-col gap-2 text-[var(--color-brown)]">
                                <div>
                                    <span className="font-semibold">Name:</span> {order.shipping_full_name}
                                </div>
                                <div>
                                    <span className="font-semibold">Phone:</span> {order.shipping_phone}
                                </div>
                                <div className="break-all">
                                    <span className="font-semibold">Email:</span> {order.shipping_email}
                                </div>

                                <div className="mt-2 border-t pt-2">
                                    <div>{order.shipping_address}</div>
                                    <div>
                                        {order.shipping_town}, {order.shipping_region}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                            <div className="font-semibold text-[var(--color-deep-blue)]">{item.product?.name}</div>
                                            <div className="text-sm text-[var(--color-brown)]">Quantity: {item.quantity}</div>
                                        </div>
                                        <div className="font-bold text-[var(--color-deep-blue)]">
                                            ₵{Number(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-[var(--color-brown)]">No items found</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
