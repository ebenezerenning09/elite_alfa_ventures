import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './logo';


export function EcommerceFooter() {
    return (
        <footer className="border-t border-gray-200/50 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <Link href={route('home')} className="mb-4 inline-block">
                            <Logo imgClassName="h-10" />
                        </Link>

                        <p className="text-[var(--color-brown)] mb-4 text-sm leading-relaxed">
                            Your trusted destination for premium luxury items. We bring you the finest watches, jewelry, bags, and accessories.
                        </p>
                        <div className="flex gap-4">
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
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-bold">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={route('home')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={route('shop.index')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={route('contact.index')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href={route('faq')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-bold">
                            Policy & Terms
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={route('legal.terms')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href={route('legal.privacy')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href={route('legal.acceptable-use')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Acceptable Use
                                </Link>
                            </li>
                            <li>
                                <Link href={route('legal.shipping-returns')} className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]">
                                    Shipping & Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[var(--color-deep-blue)] mb-4 text-lg font-bold">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-deep-blue)]" />
                                <span className="text-[var(--color-brown)] text-sm">
                                    Kumasi, KNUST, Ghana
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-[var(--color-deep-blue)]" />
                                <a
                                    href="tel:+233241234567"
                                    className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]"
                                >
                                    +233 24 123 4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-[var(--color-deep-blue)]" />
                                <a
                                    href="mailto:info@elitealfaventures.com"
                                    className="text-[var(--color-brown)] text-sm transition-colors hover:text-[var(--color-deep-blue)]"
                                >
                                    info@elitealfaventures.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8 text-center">
                    <p className="text-[var(--color-brown)] text-sm">
                        © {new Date().getFullYear()} Elite Alfa Ventures. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
