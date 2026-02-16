import { Link } from '@inertiajs/react';
import { Home } from 'lucide-react';
import { useActiveRoute } from '@/hooks/use-active-route';

export function NavCategoriesBar() {
    const { isActive } = useActiveRoute();

    return (
        <div className="hidden items-center gap-8 border-t border-gray-100 py-3 md:flex">
            <Link 
                href={route('home')} 
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive('/', true) || isActive(route('home'), true)
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                <Home className="h-4 w-4" />
                Home
            </Link>
            <Link 
                href="/shop" 
                className={`text-sm font-medium transition-colors ${
                    isActive('/shop')
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                All Products
            </Link>
            <Link 
                href="/shop?category=watches" 
                className={`text-sm font-medium transition-colors ${
                    isActive('/shop?category=watches')
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                Watches
            </Link>
            <Link 
                href="/shop?category=jewelries" 
                className={`text-sm font-medium transition-colors ${
                    isActive('/shop?category=jewelries')
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                Jewelries
            </Link>
            <Link 
                href="/shop?category=bags" 
                className={`text-sm font-medium transition-colors ${
                    isActive('/shop?category=bags')
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                Bags
            </Link>
            <Link 
                href="/shop?category=accessories" 
                className={`text-sm font-medium transition-colors ${
                    isActive('/shop?category=accessories')
                        ? 'text-[var(--color-mustard-gold)]'
                        : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                }`}
            >
                Accessories
            </Link>
            <div className="ml-auto flex items-center gap-6">
                <Link 
                    href={route('about')} 
                    className={`text-sm font-medium transition-colors ${
                        isActive(route('about'))
                            ? 'text-[var(--color-mustard-gold)]'
                            : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                    }`}
                >
                    About
                </Link>
                <Link 
                    href={route('contact.index')} 
                    className={`text-sm font-medium transition-colors ${
                        isActive(route('contact.index'))
                            ? 'text-[var(--color-mustard-gold)]'
                            : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                    }`}
                >
                    Contact
                </Link>
                <Link 
                    href={route('faq')} 
                    className={`text-sm font-medium transition-colors ${
                        isActive(route('faq'))
                            ? 'text-[var(--color-mustard-gold)]'
                            : 'text-[var(--color-brown)] hover:text-[var(--color-mustard-gold)]'
                    }`}
                >
                    FAQ
                </Link>
            </div>
        </div>
    );
}
