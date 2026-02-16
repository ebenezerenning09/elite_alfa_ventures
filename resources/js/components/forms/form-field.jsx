import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function FormField({ 
    id, 
    label, 
    type = 'text', 
    value, 
    onChange, 
    error, 
    required = false, 
    placeholder, 
    disabled = false,
    className = ''
}) {
    return (
        <div>
            <Label htmlFor={id} className="text-[var(--color-deep-blue)]">
                {label} {required && '*'}
            </Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`mt-1 text-[var(--color-deep-blue)] ${
                    error ? 'border-red-300 focus:border-red-500' : ''
                } ${className}`}
            />
            {error && (
                <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
            )}
        </div>
    );
}
