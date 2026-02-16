import { Head, Link, router, usePage } from '@inertiajs/react';
import { ProductCard } from '@/components/product-card';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Button } from '@/components/ui/button';
import { ShopFilters } from '@/components/shop-filters';
import { InfiniteScroll } from '@/components/infinite-scroll';
import { Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

export default function Shop({ products: initialProducts, category: categorySlug, filters = {}, priceRange = { min: 0, max: 0 } }) {
    const { products: pageProducts } = usePage().props;
    const [accumulatedProducts, setAccumulatedProducts] = useState(initialProducts?.data || []);
    const [lastPageLoaded, setLastPageLoaded] = useState(initialProducts?.current_page || 1);
    
    // Reset accumulated products when filters change or page 1 loads
    useEffect(() => {
        if (pageProducts) {
            // If we're loading page 1, reset accumulated products (filters changed)
            if (pageProducts.current_page === 1) {
                setAccumulatedProducts(pageProducts.data || []);
                setLastPageLoaded(1);
            } 
            // If we're loading a new page (next page), merge products
            else if (pageProducts.current_page === lastPageLoaded + 1) {
                setAccumulatedProducts(prev => [...prev, ...(pageProducts.data || [])]);
                setLastPageLoaded(pageProducts.current_page);
            }
        }
    }, [pageProducts, lastPageLoaded]);
    
    // Use accumulated products for display
    const products = useMemo(() => {
        if (!pageProducts) return initialProducts;
        
        return {
            ...pageProducts,
            data: accumulatedProducts,
        };
    }, [pageProducts, accumulatedProducts, initialProducts]);
    const categories = [
        { name: 'All', slug: null },
        { name: 'Watches', slug: 'watches' },
        { name: 'Jewelries', slug: 'jewelries' },
        { name: 'Bags', slug: 'bags' },
        { name: 'Accessories', slug: 'accessories' },
    ];

    const handleCategoryFilter = (slug) => {
        const params = slug ? { category: slug } : {};
        router.get('/shop', params, {
            preserveState: true,
            replace: true,
            only: ['products'],
            reset: ['products'], // Reset infinite scroll when category changes
        });
    };

    const handleLoadMore = (onComplete) => {
        const currentPage = products.current_page || 1;
        const nextPage = currentPage + 1;
        
        if (nextPage <= products.last_page) {
            // Build query params with current filters
            const params = {
                page: nextPage,
                ...(filters.search && { search: filters.search }),
                ...(filters.category && { category: filters.category }),
                ...(filters.min_price && { min_price: filters.min_price }),
                ...(filters.max_price && { max_price: filters.max_price }),
                ...(filters.in_stock && { in_stock: filters.in_stock }),
                ...(filters.sort_by && { sort_by: filters.sort_by }),
            };

            router.get('/shop', params, {
                preserveState: true,
                preserveScroll: true,
                only: ['products'],
                merge: true, // Merge props to preserve existing data
                onSuccess: () => {
                    onComplete();
                },
                onError: () => {
                    onComplete();
                },
                onFinish: () => {
                    onComplete();
                },
            });
        } else {
            onComplete();
        }
    };


    return (
        <EcommerceLayout>
            <Head title="Shop Luxury Products - Elite Alfa Ventures | Watches, Jewelry, Bags & Accessories" />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">Shop</h1>
                    <p className="text-[var(--color-brown)] mt-3 text-lg">Browse our complete collection</p>
                </div>

                {/* Category Filter Chips */}
                <div className="mb-6 flex flex-wrap gap-3">
                    {categories.map((category) => (
                        <Button
                            key={category.slug || 'all'}
                            variant={categorySlug === category.slug ? 'default' : 'outline'}
                            onClick={() => handleCategoryFilter(category.slug)}
                            className={
                                categorySlug === category.slug
                                    ? 'bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90'
                                    : 'border-gray-300 bg-white text-[var(--color-brown)] hover:bg-gray-50 hover:text-[var(--color-brown)]'
                            }
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>

                {/* Filters */}
                <ShopFilters filters={filters} priceRange={priceRange} />

                {/* Products Grid with Infinite Scroll */}
                {products.data && products.data.length > 0 ? (
                    <InfiniteScroll
                        data={products}
                        hasMore={products.current_page < products.last_page}
                        onLoadMore={handleLoadMore}
                        buffer={300}
                        loading={({ loading }) => (
                            loading && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex items-center gap-2 text-[var(--color-brown)]">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span className="text-sm">Loading more products...</span>
                                    </div>
                                </div>
                            )
                        )}
                    >
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-[var(--color-brown)] text-lg">No products found.</p>
                        {filters.search && (
                            <p className="text-[var(--color-brown)] mt-2 text-sm">
                                Try adjusting your search or filters
                            </p>
                        )}
                        <Link href="/shop" className="mt-4 inline-block">
                            <Button variant="outline">View All Products</Button>
                        </Link>
                    </div>
                )}
            </main>
        </EcommerceLayout>
    );
}
