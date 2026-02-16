import { Link, usePage } from '@inertiajs/react';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useCartStore from '@/stores/cart-store';
import { NavSearchBar } from './nav-search-bar';
import { NavMobileMenu } from './nav-mobile-menu';

export function NavMainBar({ isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, cartCount: propCartCount }) {
    const { auth } = usePage().props;
    const cartItems = useCartStore((state) => state.cartItems);
    const cartCount = propCartCount !== undefined ? propCartCount : cartItems.length;

    return (
        <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={route('home')} className="flex items-center">
                <h1 className="text-[var(--color-deep-blue)] text-2xl font-bold tracking-tight">
                    Elite Alfa Ventures
                </h1>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden flex-1 max-w-2xl mx-8 lg:block">
                <NavSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                {/* Search Icon - Mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-gray-100"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                    <Search className="h-5 w-5 text-[var(--color-deep-blue)]" />
                </Button>

                {/* Cart */}
                <Link href="/cart" className="relative">
                    <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                        <ShoppingCart className="h-6 w-6 text-[var(--color-deep-blue)]" />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-bright-yellow)] text-[10px] font-bold text-[var(--color-deep-blue)]">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Button>
                </Link>

                {/* User Account */}
                {auth?.user ? (
                    <Link href={route('dashboard')} className="hidden md:flex">
                        <Avatar className="h-10 w-10 cursor-pointer border-2 border-gray-200 transition-all hover:border-[var(--color-mustard-gold)]">
                            <AvatarImage src={auth.user.avatar} alt={auth.user.name || auth.user.full_name} />
                            <AvatarFallback className="bg-[var(--color-deep-blue)] text-white text-sm font-semibold">
                                {auth.user.name?.[0]?.toUpperCase() || auth.user.full_name?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                ) : (
                    <Link href={route('login')} className="hidden md:flex">
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-gray-200 text-[var(--color-deep-blue)] text-sm font-semibold">
                                    ?
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </Link>
                )}

                {/* Mobile Menu */}
                <NavMobileMenu />
            </div>
        </div>
    );
}
