import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { NavTopBar } from './nav-top-bar';
import { NavMainBar } from './nav-main-bar';
import { NavSearchBar } from './nav-search-bar';
import { NavCategoriesBar } from './nav-categories-bar';

export function EcommerceNav({ cartCount: propCartCount }) {
    const { url } = usePage();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    // Get search query from URL if on shop page
    const getSearchFromUrl = () => {
        if (url.includes('/shop')) {
            const params = new URLSearchParams(window.location.search);
            return params.get('search') || '';
        }
        return '';
    };
    
    const [searchQuery, setSearchQuery] = useState(getSearchFromUrl());

    // Update search query when URL changes
    useEffect(() => {
        setSearchQuery(getSearchFromUrl());
    }, [url]);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <NavTopBar />
                <NavMainBar 
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    cartCount={propCartCount}
                />
                {isSearchOpen && (
                    <div className="border-t border-gray-100 py-3 lg:hidden">
                        <NavSearchBar 
                            searchQuery={searchQuery} 
                            setSearchQuery={setSearchQuery} 
                            isMobile={true}
                        />
                    </div>
                )}
                <NavCategoriesBar />
            </div>
        </header>
    );
}
