import { Head, router, useForm } from '@inertiajs/react';
import AccountLayout from '@/layouts/account-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Edit, Trash2, Star } from 'lucide-react';
import { useState } from 'react';

export default function AddressesIndex({ addresses = [], regions = [], user }) {
    const [editingId, setEditingId] = useState(null);
    const [showNewForm, setShowNewForm] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        region: '',
        town: '',
        address: '',
        full_name: user?.full_name || '',
        phone: user?.phone || '',
    });

    const handleEdit = (address) => {
        setEditingId(address.id);
        setData({
            region: address.region,
            town: address.town,
            address: address.address,
            full_name: user?.full_name || '',
            phone: user?.phone || '',
        });
        setShowNewForm(false);
    };

    const handleCancel = () => {
        setEditingId(null);
        setShowNewForm(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(route('account.addresses.update', editingId), {
                onSuccess: () => {
                    handleCancel();
                },
            });
        } else {
            post(route('account.addresses.store'), {
                onSuccess: () => {
                    handleCancel();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this address?')) {
            destroy(route('account.addresses.destroy', id));
        }
    };

    const handleSetDefault = (id) => {
        router.post(route('account.addresses.set-default', id));
    };

    return (
        <AccountLayout activeTab="addresses">
            <Head title="My Addresses - Elite Alfa Ventures" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">My Addresses</h2>
                    {!showNewForm && !editingId && (
                        <Button
                            onClick={() => {
                                setShowNewForm(true);
                                setEditingId(null);
                                reset();
                            }}
                            className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Address
                        </Button>
                    )}
                </div>

                {/* New/Edit Address Form */}
                {(showNewForm || editingId) && (
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-semibold">
                            {editingId ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="region" className="text-[var(--color-deep-blue)]">
                                            Region *
                                        </Label>
                                        <select
                                            id="region"
                                            value={data.region}
                                            onChange={(e) => setData('region', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-[var(--color-deep-blue)] shadow-sm focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                                            required
                                        >
                                            <option value="">Select Region</option>
                                            {regions.map((region) => (
                                                <option key={region.name} value={region.name}>
                                                    {region.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.region && (
                                            <p className="mt-1 text-sm text-red-600">{errors.region}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="town" className="text-[var(--color-deep-blue)]">
                                            Town *
                                        </Label>
                                        <Input
                                            id="town"
                                            value={data.town}
                                            onChange={(e) => setData('town', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.town && (
                                            <p className="mt-1 text-sm text-red-600">{errors.town}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="address" className="text-[var(--color-deep-blue)]">
                                        Specific Address *
                                    </Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-1 text-[var(--color-deep-blue)]"
                                        placeholder="Street, building, landmark, etc."
                                        required
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="full_name" className="text-[var(--color-deep-blue)]">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="full_name"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.full_name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-[var(--color-deep-blue)]">
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Addresses List */}
                {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`rounded-lg border-2 p-6 ${
                                    address.is_default
                                        ? 'border-[var(--color-mustard-gold)] bg-[var(--color-mustard-gold)]/5'
                                        : 'border-gray-200 bg-white'
                                }`}
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-[var(--color-brown)]" />
                                        <div>
                                            <div className="text-[var(--color-deep-blue)] font-semibold">
                                                {address.region}, {address.town}
                                            </div>
                                            {address.is_default && (
                                                <span className="text-[var(--color-mustard-gold)] mt-1 inline-flex items-center gap-1 text-xs font-medium">
                                                    <Star className="h-3 w-3" />
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[var(--color-brown)] mb-4 text-sm">{address.address}</p>
                                <div className="flex gap-2">
                                    {!address.is_default && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSetDefault(address.id)}
                                            className="border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]"
                                        >
                                            Set as Default
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(address)}
                                        className="border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]"
                                    >
                                        <Edit className="mr-1 h-3 w-3 text-[var(--color-brown)]" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(address.id)}
                                        className="border-red-300 bg-white text-red-600 hover:bg-red-50 hover:text-red-600"
                                    >
                                        <Trash2 className="mr-1 h-3 w-3 text-red-600" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !showNewForm && (
                        <div className="text-center py-12">
                            <MapPin className="mx-auto h-16 w-16 text-gray-400" />
                            <h3 className="text-[var(--color-deep-blue)] mt-4 text-xl font-semibold">
                                No addresses yet
                            </h3>
                            <p className="text-[var(--color-brown)] mt-2">
                                Add an address to make checkout faster
                            </p>
                        </div>
                    )
                )}
            </div>
        </AccountLayout>
    );
}
