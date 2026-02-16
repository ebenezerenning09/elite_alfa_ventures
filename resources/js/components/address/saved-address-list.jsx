import { SavedAddressItem } from './saved-address-item';

export function SavedAddressList({ 
    addresses = [], 
    selectedAddressId, 
    onSelectAddress 
}) {
    if (addresses.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            <h3 className="text-[var(--color-deep-blue)] mb-3 text-sm font-semibold uppercase tracking-wide">
                Select a Saved Address
            </h3>
            <div className="space-y-3">
                {addresses.map((address) => (
                    <SavedAddressItem
                        key={address.id}
                        address={address}
                        isSelected={selectedAddressId === address.id}
                        onSelect={() => onSelectAddress(address.id)}
                    />
                ))}
            </div>
        </div>
    );
}
