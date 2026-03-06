import AccountLayout from '@/layouts/account-layout';
import { Head, Link } from '@inertiajs/react';
import { CreditCard, MapPin, Package } from 'lucide-react';

export default function OrderShow({ order }) {
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

    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0].image_path;
        }
        return null;
    };

    return (
        <AccountLayout activeTab="orders">
            <Head title={`Order #${order.order_number} - Elite Alfa Ventures`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={route('account.orders.index')}
                        className="text-sm text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]"
                    >
                        ← Back to Orders
                    </Link>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-deep-blue)]">Order #{order.order_number}</h2>
                        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-[var(--color-brown)]">Order Date</p>
                        <p className="font-semibold text-[var(--color-deep-blue)]">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Order Items */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-[var(--color-deep-blue)]">Order Items</h3>
                        {order.order_items && order.order_items.length > 0 ? (
                            <div className="space-y-4">
                                {order.order_items.map((item) => {
                                    const image = getProductImage(item.product);

                                    return (
                                        <div key={item.id} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-off-white)]">
                                                {image ? (
                                                    <img src={image} alt={item.product?.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Package className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <Link
                                                    href={`/products/${item.product?.id}`}
                                                    className="font-semibold text-[var(--color-deep-blue)] transition-colors hover:text-[var(--color-mustard-gold)]"
                                                >
                                                    {item.product?.name}
                                                </Link>
                                                <p className="mt-1 text-sm text-[var(--color-brown)]">
                                                    Quantity: {item.quantity} × ₵{Number(item.price).toLocaleString()}
                                                </p>
                                                <p className="mt-2 font-semibold text-[var(--color-deep-blue)]">
                                                    ₵{Number(item.subtotal).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-[var(--color-brown)]">No items found</p>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-semibold text-[var(--color-deep-blue)]">Order Summary</h3>

                            <div className="space-y-3 border-b border-gray-200 pb-4">
                                <div className="flex justify-between text-[var(--color-brown)]">
                                    <span>Subtotal</span>
                                    <span>₵{Number(order.total_amount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[var(--color-brown)]">
                                    <span>Shipping</span>
                                    <span>Included</span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <span className="text-lg font-bold text-[var(--color-deep-blue)]">Total</span>
                                <span className="text-2xl font-bold text-[var(--color-deep-blue)]">
                                    ₵{Number(order.total_amount).toLocaleString()}
                                </span>
                            </div>

                            {/* Shipping Address */}
                            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-deep-blue)]">
                                    <MapPin className="h-5 w-5" />
                                    Delivery Information
                                </h3>
                                {order.shipping_address && (
                                    <div className="text-[var(--color-brown)]">
                                        <div className="mb-4 space-y-1">
                                            <p className="font-medium">{order.shipping_full_name}</p>
                                            <p>{order.shipping_phone}</p>
                                            <p className="break-all">{order.shipping_email}</p>
                                        </div>
                                        <div className="space-y-1 border-t border-gray-100 pt-4">
                                            <p>{order.shipping_region}</p>
                                            <p>{order.shipping_town}</p>
                                            <p>{order.shipping_address}</p>
                                        </div>
                                    </div>
                                )}
                                {!order.shipping_address && <p className="text-[var(--color-brown)]">No delivery information available.</p>}
                            </div>

                            {/* Payment Status */}
                            {order.payment && (
                                <div className="mt-6 border-t border-gray-200 pt-6">
                                    <div className="mb-2 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-[var(--color-brown)]" />
                                        <h4 className="font-semibold text-[var(--color-deep-blue)]">Payment</h4>
                                    </div>
                                    <div className="text-sm text-[var(--color-brown)]">
                                        <p>
                                            Status:{' '}
                                            <span
                                                className={`font-medium ${
                                                    order.payment.status === 'completed'
                                                        ? 'text-green-600'
                                                        : order.payment.status === 'failed'
                                                          ? 'text-red-600'
                                                          : 'text-yellow-600'
                                                }`}
                                            >
                                                {order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1)}
                                            </span>
                                        </p>
                                        {order.payment.payment_reference && <p className="mt-1">Ref: {order.payment.payment_reference}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
