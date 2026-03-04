import Pagination from '@/components/pagination';

import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { WhyChooseUs } from '@/components/why-choose-us';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ products }) {
    // Handle both paginated and non-paginated products
    const productsData = products?.data || products || [];
    const hasProducts = Array.isArray(productsData) && productsData.length > 0;

    return (
        <EcommerceLayout>
            <Head>
                <title>Elite Alfa Ventures - Premium Luxury Watches, Jewelry & Accessories in Ghana</title>
                <meta
                    name="description"
                    content="Shop premium luxury watches, exquisite jewelry, designer handbags, and accessories in Ghana. Authentic products, secure payments, fast delivery. Located in Kumasi, KNUST."
                />
                <meta
                    name="keywords"
                    content="luxury watches, jewelry, designer bags, accessories, Ghana, Kumasi, KNUST, premium products, online shopping"
                />
            </Head>

            {/* Hero Section - Robert Half Style */}
            <section className="relative bg-[var(--color-deep-blue)]">
                {/* Background Images - Jewelry, Watches, Bags */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Watch Image */}
                    <div
                        className="absolute top-0 right-0 h-full w-1/3 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800")' }}
                    ></div>
                    {/* Jewelry Image */}
                    <div
                        className="absolute top-0 left-1/4 h-full w-1/3 bg-cover bg-center opacity-15"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800")' }}
                    ></div>
                    {/* Bag Image */}
                    <div
                        className="absolute top-0 left-0 h-full w-1/4 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800")' }}
                    ></div>
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-blue)] via-[var(--color-deep-blue)]/95 to-[var(--color-deep-blue)]/80"></div>
                </div>

                {/* Content */}
                <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-4xl">
                        {/* Main Heading */}
                        <h1 className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Anything's possible when you have
                            <span className="block text-[var(--color-bright-yellow)]">the finest luxury</span>
                        </h1>

                        {/* Subheading */}
                        <p className="mb-10 text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                            Find premium watches, exquisite jewelry, and luxury accessories. Discover the elegance and quality you deserve.
                        </p>

                        {/* CTA Buttons Section */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                            {/* For Customers */}
                            <div>
                                <div className="mb-3 text-sm font-semibold tracking-wide text-white/80 uppercase">FOR CUSTOMERS</div>
                                <Link href="/shop">
                                    <Button
                                        size="lg"
                                        className="w-full bg-white px-8 py-4 text-base font-semibold text-[var(--color-deep-blue)] transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
                                    >
                                        Shop Our Collection
                                    </Button>
                                </Link>
                            </div>

                            {/* For Businesses */}
                            <div>
                                <div className="mb-3 text-sm font-semibold tracking-wide text-white/80 uppercase">EXPLORE MORE</div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Link href="/shop" className="flex-1">
                                        <Button
                                            size="lg"
                                            className="w-full border-2 border-white bg-[var(--color-deep-blue)] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--color-deep-blue)]"
                                        >
                                            Browse Categories
                                        </Button>
                                    </Link>
                                    <Link href="/about" className="flex-1">
                                        <Button
                                            size="lg"
                                            className="w-full border-2 border-white bg-[var(--color-deep-blue)] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--color-deep-blue)]"
                                        >
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content - Products Grid */}
            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-[var(--color-deep-blue)]">Featured Products</h2>
                    <p className="mt-3 text-lg text-[var(--color-brown)]">Discover our premium collection of luxury items</p>
                </div>

                {hasProducts ? (
                    <>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {productsData.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination links={products?.links} lastPage={products?.last_page} className="mt-12" />
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-[var(--color-brown)]">No products available at the moment.</p>
                    </div>
                )}
            </main>

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Testimonials Section */}
            {/* <TestimonialsSection /> */}


        </EcommerceLayout>
    );
}
