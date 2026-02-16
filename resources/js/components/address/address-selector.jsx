import { Plus, MapPin } from 'lucide-react';
import { SavedAddressList } from './saved-address-list';
import { NewAddressForm } from './new-address-form';

export function AddressSelector({
    addresses = [],
    selectedAddressId,
    onSelectAddress,
    showNewAddress,
    onToggleNewAddress,
    onBackToSaved,
    data,
    setData,
    regions = [],
    errors = {},
}) {
    // Show new address form if there are errors for region/town/address (validation failed)
    const hasAddressErrors = errors.region || errors.town || errors.address;
    const shouldShowNewForm = showNewAddress || addresses.length === 0 || hasAddressErrors;
    const shouldShowSaved = addresses.length > 0 && !shouldShowNewForm;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-[var(--color-deep-blue)] mb-4 flex items-center gap-2 text-xl font-bold">
                <MapPin className="h-5 w-5" />
                Delivery Information
            </h2>

            {/* General Error Message */}
            {(errors.address_id || errors.cart) && (
                <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-800">
                        {errors.address_id || errors.cart || 'Please check the form for errors.'}
                    </p>
                </div>
            )}

            {/* Show validation errors summary if address fields have errors */}
            {hasAddressErrors && (
                <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3">
                    <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
                    <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                        {errors.region && <li className="font-medium">{errors.region}</li>}
                        {errors.town && <li className="font-medium">{errors.town}</li>}
                        {errors.address && <li className="font-medium">{errors.address}</li>}
                    </ul>
                </div>
            )}

            {/* Saved Addresses */}
            {shouldShowSaved && (
                <SavedAddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={onSelectAddress}
                />
            )}

            {/* Divider */}
            {addresses.length > 0 && shouldShowSaved && (
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-[var(--color-brown)]">OR</span>
                    </div>
                </div>
            )}

            {/* New Address Form */}
            {shouldShowNewForm && (
                <div>
                    {addresses.length > 0 && (
                        <h3 className="text-[var(--color-deep-blue)] mb-2 text-sm font-semibold uppercase tracking-wide">
                            Add New Address
                        </h3>
                    )}
                    <NewAddressForm
                        data={data}
                        setData={setData}
                        regions={regions}
                        errors={errors}
                        showSaveOption={addresses.length > 0}
                    />
                </div>
            )}

            {/* Toggle Buttons */}
            {addresses.length > 0 && shouldShowSaved && (
                <button
                    type="button"
                    onClick={onToggleNewAddress}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-[var(--color-deep-blue)] transition-all hover:border-[var(--color-mustard-gold)] hover:bg-[var(--color-mustard-gold)]/5"
                >
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add New Address</span>
                </button>
            )}

            {addresses.length > 0 && shouldShowNewForm && !hasAddressErrors && (
                <button
                    type="button"
                    onClick={onBackToSaved}
                    className="mt-4 flex items-center gap-2 text-sm text-[var(--color-brown)] hover:text-[var(--color-deep-blue)] transition-colors"
                >
                    ← Back to saved addresses
                </button>
            )}
        </div>
    );
}
