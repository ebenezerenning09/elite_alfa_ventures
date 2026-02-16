import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

export function InfiniteScroll({ 
    children, 
    data, 
    hasMore, 
    onLoadMore, 
    buffer = 300,
    loading: LoadingComponent,
    className = ''
}) {
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef(null);
    const sentinelRef = useRef(null);

    useEffect(() => {
        if (!hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasMore && !isLoading) {
                    setIsLoading(true);
                    if (onLoadMore) {
                        onLoadMore(() => {
                            setIsLoading(false);
                        });
                    }
                }
            },
            {
                rootMargin: `${buffer}px`,
                threshold: 0.1,
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, [hasMore, isLoading, buffer, onLoadMore]);

    return (
        <div className={className}>
            {children}
            {hasMore && (
                <div ref={sentinelRef} className="h-4" />
            )}
            {isLoading && LoadingComponent && (
                <LoadingComponent loading={isLoading} />
            )}
        </div>
    );
}
