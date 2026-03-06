import { AddressSelector } from '@/components/address/address-selector';
import { ContactInformationForm } from '@/components/checkout/contact-information-form';
import { OrderSummary } from '@/components/checkout/order-summary';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import useCartStore from '@/stores/cart-store';
import { Head, useForm } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Checkout({ addresses = [], regions = [], user }) {
    const { cartItems } = useCartStore();
    const [selectedAddressId, setSelectedAddressId] = useState(addresses.find((addr) => addr.is_default)?.id || addresses[0]?.id || null);
    const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0);

    const { data, setData, post, processing, errors } = useForm({
        address_id: selectedAddressId,
        region: '',
        town: '',
        address: '',
        full_name: user?.full_name || '',
        phone: user?.phone || '',
        save_address: addresses.length === 0,
        cart: cartItems,
    });

    // Sync address fields when selected address changes (cho pattern: no guards, single setData call)
    useEffect(() => {
        if (selectedAddressId) {
            const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
            if (selectedAddress) {
                setData({
                    ...data,
                    address_id: selectedAddressId,
                    region: selectedAddress.region || '',
                    town: selectedAddress.town || '',
                    address: selectedAddress.address || '',
                    full_name: selectedAddress.full_name || user?.full_name || '',
                    phone: selectedAddress.phone || user?.phone || '',
                });
            }
        } else {
            setData({
                ...data,
                address_id: null,
                region: '',
                town: '',
                address: '',
            });
        }
    }, [selectedAddressId]);

    const total = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);

    // Single POST — controller saves address AND initiates payment redirect (cho pattern)
    const handleSubmit = (e) => {
        e.preventDefault();

        setData('cart', cartItems);

        post(route('checkout.store'), {
            preserveScroll: true,
        });
    };

    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            return product.images[0].image_path;
        }
        return product.image || null;
    };

    if (cartItems.length === 0) {
        return (
            <EcommerceLayout>
                <Head title="Checkout - Elite Alfa Ventures" />
                <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="py-16 text-center">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                        <h2 className="mt-4 text-2xl font-bold text-[var(--color-deep-blue)]">Your cart is empty</h2>
                        <p className="mt-2 text-[var(--color-brown)]">Add items to your cart to checkout</p>
                    </div>
                </main>
            </EcommerceLayout>
        );
    }

    return (
        <EcommerceLayout>
            <Head title="Checkout - Elite Alfa Ventures" />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--color-deep-blue)]">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column - Forms */}
                        <div className="space-y-8 lg:col-span-2">
                            <AddressSelector
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={(id) => {
                                    setSelectedAddressId(id);
                                    setShowNewAddress(false);
                                }}
                                showNewAddress={showNewAddress}
                                onToggleNewAddress={() => {
                                    setShowNewAddress(true);
                                    setSelectedAddressId(null);
                                }}
                                onBackToSaved={() => {
                                    setShowNewAddress(false);
                                    const defaultAddress = addresses.find((addr) => addr.is_default);
                                    setSelectedAddressId(defaultAddress?.id || addresses[0]?.id || null);
                                }}
                                data={data}
                                setData={setData}
                                regions={regions}
                                errors={errors}
                            />

                            <ContactInformationForm data={data} setData={setData} errors={errors} userEmail={user?.email} />
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary cartItems={cartItems} total={total} processing={processing} getProductImage={getProductImage} />
                        </div>
                    </div>
                </form>
            </main>
        </EcommerceLayout>
    );
}
