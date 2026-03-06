import { Link, router, usePage } from '@inertiajs/react';
import { Facebook, Instagram } from 'lucide-react';

export function NavTopBar() {
    const { auth } = usePage().props;

    return (
        <div className="hidden items-center justify-between border-b border-gray-100 py-2 text-sm md:flex">
            <div className="flex items-center gap-6">
                <a href="#" className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]">
                    Help & Support
                </a>
                <div className="flex items-center gap-3">
                    <a
                        href="https://www.facebook.com/profile.php?id=61588397607898"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-deep-blue)]"
                        aria-label="Facebook"
                    >
                        <Facebook className="h-4 w-4" />
                    </a>
                    <a
                        href="https://instagram.com/elitealfaventures"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-deep-blue)]"
                        aria-label="Instagram"
                    >
                        <Instagram className="h-4 w-4" />
                    </a>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {auth?.user ? (
                    <>
                        <Link
                            href={route('dashboard')}
                            className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]"
                        >
                            {auth.user.name}
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href={route('login')} className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]">
                            Sign In
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href={route('register')} className="text-[var(--color-brown)] transition-colors hover:text-[var(--color-mustard-gold)]">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
