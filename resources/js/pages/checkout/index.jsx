import { Head, router, useForm } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import useCartStore from '@/stores/cart-store';
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { AddressSelector } from '@/components/address/address-selector';
import { ContactInformationForm } from '@/components/checkout/contact-information-form';
import { OrderSummary } from '@/components/checkout/order-summary';

export default function Checkout({ addresses = [], regions = [], user }) {
    const { cartItems } = useCartStore();
    const [selectedAddressId, setSelectedAddressId] = useState(
        addresses.find((addr) => addr.is_default)?.id || addresses[0]?.id || null
    );
    const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0);

    const { data, setData, post, processing, errors } = useForm({
        address_id: selectedAddressId,
        region: '',
        town: '',
        address: '',
        full_name: user?.full_name || '',
        phone: user?.phone || '',
        save_address: false,
        cart: cartItems,
    });


    useEffect(() => {
        if (selectedAddressId) {
            const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
            if (selectedAddress) {
                // Set address_id and populate form with saved address details
            setData('address_id', selectedAddressId);
                setData('region', selectedAddress.region || '');
                setData('town', selectedAddress.town || '');
                setData('address', selectedAddress.address || '');
                // Pre-fill contact info from address if available
                if (selectedAddress.full_name && !data.full_name) {
                    setData('full_name', selectedAddress.full_name);
                }
                if (selectedAddress.phone && !data.phone) {
                    setData('phone', selectedAddress.phone);
                }
            }
        } else {
            setData('address_id', null);
            // Clear address fields when no address is selected
            setData('region', '');
            setData('town', '');
            setData('address', '');
        }
    }, [selectedAddressId, addresses]);

    const total = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) || 0) * (item.quantity || 1);
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Form data already has all the values populated (either from saved address or user input)
        // When a saved address is selected, useEffect populates region/town/address from the saved address
        const formData = {
            cart: cartItems,
            address_id: selectedAddressId || null,
            region: data.region,
            town: data.town,
            address: data.address,
            full_name: data.full_name,
            phone: data.phone,
            save_address: data.save_address,
        };

        post(route('checkout.store'), {
            data: formData,
            onSuccess: () => {
                // After successful checkout, POST to payment redirect with all data
                router.post(route('payment.redirect'), {
                    cart: cartItems,
                    address_id: selectedAddressId || null,
                    full_name: data.full_name,
                    phone: data.phone,
                });
            },
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
                    <div className="text-center py-16">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                        <h2 className="text-[var(--color-deep-blue)] mt-4 text-2xl font-bold">
                            Your cart is empty
                        </h2>
                        <p className="text-[var(--color-brown)] mt-2">Add items to your cart to checkout</p>
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
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">
                        Checkout
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-8">
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

                            <ContactInformationForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                userEmail={user?.email}
                            />
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <OrderSummary
                                cartItems={cartItems}
                                total={total}
                                processing={processing}
                                getProductImage={getProductImage}
                            />
                        </div>
                    </div>
                </form>
            </main>
        </EcommerceLayout>
    );
}
