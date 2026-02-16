import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

export function ShopFilters({ filters = {}, priceRange = { min: 0, max: 0 } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        in_stock: filters.in_stock || false,
        sort_by: filters.sort_by || 'latest',
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);

        // Build query params
        const params = { ...filters };
        if (newFilters.min_price) params.min_price = newFilters.min_price;
        else delete params.min_price;
        
        if (newFilters.max_price) params.max_price = newFilters.max_price;
        else delete params.max_price;
        
        if (newFilters.in_stock) params.in_stock = true;
        else delete params.in_stock;
        
        params.sort_by = newFilters.sort_by;

        router.get('/shop', params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['products'],
            reset: ['products'], // Reset infinite scroll when filters change
        });
    };

    const clearFilters = () => {
        setLocalFilters({
            min_price: '',
            max_price: '',
            in_stock: false,
            sort_by: 'latest',
        });
        router.get('/shop', { category: filters.category, search: filters.search }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['products'],
            reset: ['products'], // Reset infinite scroll when clearing filters
        });
    };

    const hasActiveFilters = localFilters.min_price || localFilters.max_price || localFilters.in_stock || localFilters.sort_by !== 'latest';

    return (
        <div className="mb-6">
            {/* Mobile Filter Toggle */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                        <span className="ml-1 rounded-full bg-[var(--color-deep-blue)] px-2 py-0.5 text-xs text-white">
                            Active
                        </span>
                    )}
                </Button>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-sm text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Filter Panel */}
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } lg:block rounded-lg border border-gray-200 bg-white p-4 shadow-sm`}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-[var(--color-deep-blue)] font-semibold">Filters</h3>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-xs text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]"
                        >
                            <X className="mr-1 h-3 w-3" />
                            Clear
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    {/* Price Range */}
                    <div>
                        <label className="text-[var(--color-deep-blue)] mb-2 block text-sm font-medium">
                            Price Range
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={localFilters.min_price}
                                onChange={(e) => handleFilterChange('min_price', e.target.value)}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-[var(--color-deep-blue)] focus:border-[var(--color-mustard-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mustard-gold)]/20"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={localFilters.max_price}
                                onChange={(e) => handleFilterChange('max_price', e.target.value)}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-[var(--color-deep-blue)] focus:border-[var(--color-mustard-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mustard-gold)]/20"
                            />
                        </div>
                    </div>

                    {/* In Stock Filter */}
                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={localFilters.in_stock}
                                onChange={(e) => handleFilterChange('in_stock', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[var(--color-deep-blue)] focus:ring-[var(--color-mustard-gold)]"
                            />
                            <span className="text-[var(--color-deep-blue)] text-sm font-medium">In Stock Only</span>
                        </label>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label className="text-[var(--color-deep-blue)] mb-2 block text-sm font-medium">
                            Sort By
                        </label>
                        <select
                            value={localFilters.sort_by}
                            onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-[var(--color-deep-blue)] focus:border-[var(--color-mustard-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mustard-gold)]/20"
                        >
                            <option value="latest">Latest First</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
