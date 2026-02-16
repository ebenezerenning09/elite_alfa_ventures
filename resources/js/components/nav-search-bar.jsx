import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

export function NavSearchBar({ searchQuery, setSearchQuery, isMobile = false }) {
    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            if (query.trim()) {
                router.get('/shop', { search: query.trim() }, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['products'],
                    reset: ['products'], // Reset infinite scroll when search changes
                });
            } else {
                router.get('/shop', {}, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    only: ['products'],
                    reset: ['products'], // Reset infinite scroll when clearing search
                });
            }
        }, 500),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            router.get('/shop', { search: query }, {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                reset: ['products'], // Reset infinite scroll when search changes
            });
        } else {
            router.get('/shop', {}, {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                reset: ['products'], // Reset infinite scroll when clearing search
            });
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <form onSubmit={handleSearch} className="relative">
            <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleInputChange}
                className={`w-full rounded-lg border border-gray-300 bg-[var(--color-off-white)] px-4 py-2.5 pl-10 text-[var(--color-deep-blue)] ${
                    isMobile ? 'pr-20 text-sm' : 'pr-12 text-sm'
                } focus:border-[var(--color-mustard-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mustard-gold)]/20`}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90 ${
                    isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-1.5 text-sm'
                }`}
            >
                Search
            </Button>
        </form>
    );
}
