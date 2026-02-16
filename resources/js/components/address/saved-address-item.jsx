import { Check, Star } from 'lucide-react';

export function SavedAddressItem({ 
    address, 
    isSelected, 
    onSelect 
}) {
    return (
        <label
            className={`group relative flex cursor-pointer items-start gap-4 rounded-lg border-2 p-4 transition-all ${
                isSelected
                    ? 'border-[var(--color-mustard-gold)] bg-[var(--color-mustard-gold)]/10 shadow-md'
                    : 'border-gray-200 bg-white hover:border-[var(--color-mustard-gold)]/50 hover:bg-gray-50'
            }`}
        >
            <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                isSelected
                    ? 'border-[var(--color-mustard-gold)] bg-[var(--color-mustard-gold)]'
                    : 'border-gray-300 group-hover:border-[var(--color-mustard-gold)]'
            }`}>
                {isSelected && (
                    <Check className="h-3 w-3 text-white" />
                )}
            </div>
            <input
                type="radio"
                name="address_id"
                value={address.id}
                checked={isSelected}
                onChange={onSelect}
                className="sr-only"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div className="text-[var(--color-deep-blue)] font-semibold">
                        {address.region}, {address.town}
                    </div>
                    {address.is_default && (
                        <span className="flex items-center gap-1 rounded-full bg-[var(--color-mustard-gold)]/20 px-2 py-0.5 text-xs font-medium text-[var(--color-mustard-gold)]">
                            <Star className="h-3 w-3 fill-current" />
                            Default
                        </span>
                    )}
                </div>
                <div className="text-[var(--color-brown)] mt-1 text-sm">
                    {address.address}
                </div>
                {address.full_name && (
                    <div className="text-[var(--color-brown)] mt-1 text-xs">
                        {address.full_name}
                    </div>
                )}
                {address.phone && (
                    <div className="text-[var(--color-brown)] mt-1 text-xs">
                        {address.phone}
                    </div>
                )}
            </div>
        </label>
    );
}
