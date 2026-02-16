import { Head, Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';

export default function AdminAuthLayout({ children, title, description }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--color-deep-blue)] via-[#2a3d7a] to-[var(--color-deep-blue)] flex items-center justify-center p-4">
            <Head title={title} />
            
            <div className="w-full max-w-md">
                {/* Admin Badge */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-mustard-gold)] px-4 py-2">
                        <Shield className="h-5 w-5 text-[var(--color-deep-blue)]" />
                        <span className="text-[var(--color-deep-blue)] font-bold text-sm">ADMIN PANEL</span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-[var(--color-mustard-gold)]/20">
                    <div className="mb-6 text-center">
                        <h1 className="text-[var(--color-deep-blue)] text-3xl font-bold mb-2">{title}</h1>
                        <p className="text-[var(--color-brown)] text-sm">{description}</p>
                    </div>

                    {children}

                    {/* Back to site link */}
                    <div className="mt-6 text-center">
                        <Link 
                            href="/" 
                            className="text-[var(--color-brown)] text-sm hover:text-[var(--color-deep-blue)] transition-colors"
                        >
                            ← Back to website
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-white/80 text-xs">
                    Elite Alfa Ventures - Admin Access Only
                </p>
            </div>
        </div>
    );
}
