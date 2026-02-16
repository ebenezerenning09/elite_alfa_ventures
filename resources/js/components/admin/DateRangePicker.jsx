import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange, className = '' }) {
    return (
        <div className={`flex gap-4 items-end ${className}`}>
            <div className="flex-1">
                <Label htmlFor="start_date" className="text-[var(--color-deep-blue)] font-medium mb-2 block">Start Date</Label>
                <Input
                    id="start_date"
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                />
            </div>
            <div className="flex-1">
                <Label htmlFor="end_date" className="text-[var(--color-deep-blue)] font-medium mb-2 block">End Date</Label>
                <Input
                    id="end_date"
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                />
            </div>
        </div>
    );
}
