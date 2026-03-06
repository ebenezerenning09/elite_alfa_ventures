import { Logo } from '@/components/logo';
import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({ children, title, description }) {
    return (
        <div className="flex min-h-svh flex-col bg-[var(--color-off-white)]">
            {/* Header Section with Deep Blue Background */}
            <div className="bg-[var(--color-deep-blue)] px-6 py-6 md:px-10 md:py-8">
                <div className="mx-auto max-w-md">
                    <Link href={route('home')} className="mb-6 flex flex-col items-center justify-center gap-2">
                        <Logo className="h-16 w-auto" imgClassName="h-24 mt-2 w-auto" />
                        <span className="mt-6 text-xl font-bold tracking-tight text-white">Elite Alfa Ventures</span>
                    </Link>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="w-full max-w-md">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)]">{title}</h1>
                                <p className="text-center text-base text-[var(--color-brown)]">{description}</p>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
