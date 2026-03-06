import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart-store';
import { Link, usePage } from '@inertiajs/react';
import { Search, ShoppingCart } from 'lucide-react';
import { Logo } from './logo';
import { NavMobileMenu } from './nav-mobile-menu';
import { NavSearchBar } from './nav-search-bar';

export function NavMainBar({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, cartCount: propCartCount }) {
    const { auth } = usePage().props;
    const cartItems = useCartStore((state) => state.cartItems);
    const cartCount = propCartCount !== undefined ? propCartCount : cartItems.length;

    return (
        <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={route('home')} className="flex items-center">
                <Logo imgClassName="h-14 md:h-16" />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="mx-8 hidden max-w-2xl flex-1 lg:block">
                <NavSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Search Icon - Mobile */}
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <Search className="h-5 w-5 text-[var(--color-deep-blue)]" />
                </Button>

                {/* Cart */}
                <Link href="/cart" className="relative">
                    <Button variant="ghost" size="icon" className="relative h-12 w-12 hover:bg-gray-100">
                        <ShoppingCart className="h-9 w-9 text-[var(--color-deep-blue)]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-bright-yellow)] text-[10px] font-bold text-[var(--color-deep-blue)]">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Button>
                </Link>

                {/* User Account */}
                {auth?.user && (
                    <Link href={route('dashboard')} className="hidden md:flex">
                        <Avatar className="h-10 w-10 cursor-pointer border-2 border-gray-200 transition-all hover:border-[var(--color-mustard-gold)]">
                            <AvatarImage src={auth.user.avatar} alt={auth.user.name || auth.user.full_name} />
                            <AvatarFallback className="bg-[var(--color-deep-blue)] text-sm font-semibold text-white">
                                {auth.user.name?.[0]?.toUpperCase() || auth.user.full_name?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                )}

                {/* Mobile Menu */}
                <NavMobileMenu />
            </div>
        </div>
    );
}
