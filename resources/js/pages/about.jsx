import { Head } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Shield, Award, Users, Heart, CheckCircle } from 'lucide-react';
import { WhyChooseUs } from '@/components/why-choose-us';


export default function About() {
    const values = [
        {
            icon: Shield,
            title: 'Quality Assurance',
            description: 'We guarantee the authenticity and quality of every product in our collection.',
        },
        {
            icon: Award,
            title: 'Premium Selection',
            description: 'Curated collection of the finest luxury items from trusted suppliers.',
        },
        {
            icon: Users,
            title: 'Customer First',
            description: 'Your satisfaction is our priority. We\'re here to serve you with excellence.',
        },
        {
            icon: Heart,
            title: 'Trusted Service',
            description: 'Years of experience in delivering premium products and exceptional service.',
        },
    ];

    const whyTrustUs = [
        {
            title: 'Authentic Products',
            description: 'All our products are verified for authenticity and quality.',
        },
        {
            title: 'Secure Payments',
            description: 'Your payments are processed securely through trusted payment gateways.',
        },
        {
            title: 'Fast Delivery',
            description: 'We ensure timely delivery to your doorstep across Ghana.',
        },
        {
            title: 'Customer Support',
            description: 'Our dedicated support team is always ready to assist you.',
        },
    ];

    return (
        <EcommerceLayout>
            <Head>
                <title>About Us - Elite Alfa Ventures | Premium Luxury Goods in Kumasi, Ghana</title>
                <meta name="description" content="Learn about Elite Alfa Ventures, your trusted destination for premium luxury items in Kumasi, KNUST, Ghana. We offer authentic watches, jewelry, bags, and accessories with quality assurance." />
                <meta name="keywords" content="about us, Elite Alfa Ventures, Kumasi, KNUST, Ghana, luxury goods, premium products, authentic watches, jewelry" />
            </Head>

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        About Elite Alfa Ventures
                    </h1>
                    <p className="text-[var(--color-brown)] mx-auto mt-6 max-w-3xl text-lg leading-relaxed">
                        Your trusted destination for premium luxury items. We bring you the finest watches, jewelry, bags, and accessories with unmatched quality and service.
                    </p>
                </div>

                {/* Who We Are */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="text-[var(--color-deep-blue)] mb-6 text-3xl font-bold">Who We Are</h2>
                            <div className="text-[var(--color-brown)] space-y-4 text-base leading-relaxed">
                                <p>
                                    Elite Alfa Ventures is a premier e-commerce platform specializing in luxury goods, based in Kumasi, KNUST, Ghana. We are passionate about bringing you the finest collection of watches, exquisite jewelry, designer handbags, and premium accessories.
                                </p>
                                <p>
                                    Founded with a vision to make luxury accessible, we carefully curate each product in our collection to ensure authenticity, quality, and timeless elegance. Our commitment to excellence has made us a trusted name in the luxury goods market across Ghana.
                                </p>
                                <p>
                                    We understand that when you shop for luxury items, you're not just buying a product—you're investing in quality, style, and sophistication. That's why we go the extra mile to ensure every purchase meets our high standards. Located in the heart of Kumasi, KNUST, we serve customers throughout Ghana with dedication and excellence.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gradient-to-br from-[var(--color-deep-blue)] to-[var(--color-mustard-gold)] p-8">
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center text-white">
                                        <h3 className="mb-4 text-2xl font-bold">Elite Alfa Ventures</h3>
                                        <p className="text-lg opacity-90">Luxury Redefined</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                <section className="mb-20">
                    <h2 className="text-[var(--color-deep-blue)] mb-12 text-center text-3xl font-bold">What We Do</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <div className="rounded-full bg-[var(--color-deep-blue)]/10 p-4">
                                            <Icon className="h-8 w-8 text-[var(--color-deep-blue)]" />
                                        </div>
                                    </div>
                                    <h3 className="text-[var(--color-deep-blue)] mb-2 text-xl font-semibold">
                                        {value.title}
                                    </h3>
                                    <p className="text-[var(--color-brown)] text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Why Trust Us */}
                <section className="mb-20 rounded-lg bg-[var(--color-off-white)] p-12">
                    <h2 className="text-[var(--color-deep-blue)] mb-12 text-center text-3xl font-bold">
                        Why Trust Us
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {whyTrustUs.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <CheckCircle className="h-6 w-6 text-[var(--color-mustard-gold)]" />
                                </div>
                                <div>
                                    <h3 className="text-[var(--color-deep-blue)] mb-2 text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--color-brown)] text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="rounded-lg border border-gray-200 bg-white p-12 text-center">
                    <h2 className="text-[var(--color-deep-blue)] mb-6 text-3xl font-bold">Our Mission</h2>
                    <p className="text-[var(--color-brown)] mx-auto max-w-3xl text-lg leading-relaxed">
                        To provide our customers with access to the finest luxury goods while maintaining the highest standards of quality, authenticity, and customer service. We believe everyone deserves to experience the elegance and sophistication that comes with premium products.
                    </p>
                </section>
            </main>

            {/* Why Choose Us Section */}
            <WhyChooseUs />


        </EcommerceLayout>
    );
}
