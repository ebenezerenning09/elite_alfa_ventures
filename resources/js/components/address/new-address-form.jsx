import { FormSelect } from '@/components/forms/form-select';
import { FormField } from '@/components/forms/form-field';
import { Label } from '@/components/ui/label';

export function NewAddressForm({ 
    data, 
    setData, 
    regions = [], 
    errors = {}, 
    showSaveOption = false 
}) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormSelect
                    id="region"
                    label="Region"
                    value={data.region}
                    onChange={(e) => setData('region', e.target.value)}
                    options={regions.map((region) => ({ value: region.name, label: region.name }))}
                    error={errors.region}
                    required={true}
                    placeholder="Select Region"
                />

                <FormField
                    id="town"
                    label="Town"
                    value={data.town}
                    onChange={(e) => setData('town', e.target.value)}
                    error={errors.town}
                    required={true}
                />
            </div>

            <FormField
                id="address"
                label="Specific Address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                error={errors.address}
                required={true}
                placeholder="Street, building, landmark, etc."
            />

            {showSaveOption && (
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="save_address"
                        checked={data.save_address}
                        onChange={(e) => setData('save_address', e.target.checked)}
                        className="rounded border-gray-300 text-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                    />
                    <Label htmlFor="save_address" className="ml-2 text-[var(--color-brown)]">
                        Save this address for future orders
                    </Label>
                </div>
            )}
        </div>
    );
}
