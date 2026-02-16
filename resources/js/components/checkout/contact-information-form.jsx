import { FormField } from '@/components/forms/form-field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function ContactInformationForm({ 
    data, 
    setData, 
    errors = {}, 
    userEmail 
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-[var(--color-deep-blue)] mb-4 text-xl font-bold">
                Contact Information
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                    id="full_name"
                    label="Full Name"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                    error={errors.full_name}
                    required={true}
                />

                <FormField
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    error={errors.phone}
                    required={true}
                />
            </div>

            <div className="mt-4">
                <Label htmlFor="email" className="text-[var(--color-deep-blue)]">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={userEmail || ''}
                    disabled
                    className="mt-1 bg-gray-50 text-[var(--color-deep-blue)]"
                />
                <p className="text-[var(--color-brown)] mt-1 text-xs">
                    Email cannot be changed
                </p>
            </div>
        </div>
    );
}
