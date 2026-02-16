import { Link, usePage } from '@inertiajs/react';
import { Home, LogOut, Facebook, Instagram, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { router } from '@inertiajs/react';
import { useActiveRoute } from '@/hooks/use-active-route';

export function NavMobileMenu() {
    const { auth } = usePage().props;
    const { isActive } = useActiveRoute();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100">
                    <Menu className="h-6 w-6 text-[var(--color-deep-blue)]" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                    <SheetTitle className="text-[var(--color-deep-blue)]">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                    <Link 
                        href={route('home')} 
                        className={`flex items-center gap-2 font-medium transition-colors ${
                            isActive('/', true) || isActive(route('home'), true)
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        <Home className="h-5 w-5" />
                        Home
                    </Link>
                    <Link 
                        href="/shop" 
                        className={`font-medium transition-colors ${
                            isActive('/shop')
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        All Products
                    </Link>
                    <Link 
                        href="/categories" 
                        className={`font-medium transition-colors ${
                            isActive('/categories')
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        Categories
                    </Link>
                    <Link 
                        href={route('about')} 
                        className={`font-medium transition-colors ${
                            isActive(route('about'))
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        About
                    </Link>
                    <Link 
                        href={route('contact.index')} 
                        className={`font-medium transition-colors ${
                            isActive(route('contact.index'))
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        Contact
                    </Link>
                    <Link 
                        href={route('faq')} 
                        className={`font-medium transition-colors ${
                            isActive(route('faq'))
                                ? 'text-[var(--color-mustard-gold)]'
                                : 'text-[var(--color-deep-blue)] hover:text-[var(--color-mustard-gold)]'
                        }`}
                    >
                        FAQ
                    </Link>
                    <div className="my-2 flex items-center gap-4 border-t border-gray-200 pt-4">
                        <a
                            href="https://facebook.com/elitealfaventures"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[var(--color-deep-blue)]/10 p-2 text-[var(--color-deep-blue)] transition-colors hover:bg-[var(--color-deep-blue)] hover:text-white"
                            aria-label="Facebook"
                        >
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a
                            href="https://instagram.com/elitealfaventures"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-[var(--color-deep-blue)]/10 p-2 text-[var(--color-deep-blue)] transition-colors hover:bg-[var(--color-deep-blue)] hover:text-white"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                    </div>
                    {auth?.user ? (
                        <>
                            <Link href={route('dashboard')} className="text-[var(--color-deep-blue)] font-medium hover:text-[var(--color-mustard-gold)] transition-colors">
                                Dashboard
                            </Link>
                            <button
                                onClick={() => router.post(route('logout'))}
                                className="flex items-center gap-2 text-left text-[var(--color-deep-blue)] font-medium hover:text-[var(--color-mustard-gold)] transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-[var(--color-deep-blue)] font-medium hover:text-[var(--color-mustard-gold)] transition-colors">
                                Sign In
                            </Link>
                            <Link href={route('register')} className="text-[var(--color-deep-blue)] font-medium hover:text-[var(--color-mustard-gold)] transition-colors">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
