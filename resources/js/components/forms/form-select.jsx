import { Label } from '@/components/ui/label';

export function FormSelect({ 
    id, 
    label, 
    value, 
    onChange, 
    options = [], 
    error, 
    required = false,
    placeholder = 'Select...',
    className = ''
}) {
    return (
        <div>
            <Label htmlFor={id} className="text-[var(--color-deep-blue)]">
                {label} {required && '*'}
            </Label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full rounded-md bg-white px-3 py-2 text-[var(--color-deep-blue)] shadow-sm focus:ring-[var(--color-mustard-gold)]/20 ${
                    error
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-[var(--color-mustard-gold)]'
                } ${className}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value || option} value={option.value || option}>
                        {option.label || option}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
            )}
        </div>
    );
}
