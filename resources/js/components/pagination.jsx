import { Link } from '@inertiajs/react';

export default function Pagination({ links, lastPage, className = '' }) {
    // Don't render if no pagination data or only one page
    if (!links || !lastPage || lastPage <= 1) {
        return null;
    }

    return (
        <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    preserveScroll
                    className={`px-4 py-2 rounded-md transition-colors ${
                        link.active
                            ? 'bg-[var(--color-deep-blue)] text-white'
                            : 'bg-white text-[var(--color-brown)] border border-gray-300 hover:bg-gray-50'
                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
