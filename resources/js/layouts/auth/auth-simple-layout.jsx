import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({ children, title, description }) {
    return (
        <div className="flex min-h-svh flex-col bg-[var(--color-off-white)]">
            {/* Header Section with Deep Blue Background */}
            <div className="bg-[var(--color-deep-blue)] px-6 py-8 md:px-10 md:py-12">
                <div className="mx-auto max-w-md">
                    <Link href={route('home')} className="mb-6 flex items-center justify-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                            <AppLogoIcon className="size-8 fill-current text-white"/>
                        </div>
                        <span className="text-xl font-bold text-white">Elite Alfa Ventures</span>
                    </Link>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-[var(--color-deep-blue)] text-3xl font-bold tracking-tight">{title}</h1>
                                <p className="text-[var(--color-brown)] text-center text-base">{description}</p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

