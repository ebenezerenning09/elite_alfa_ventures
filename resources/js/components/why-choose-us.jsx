import { Shield, Truck, CreditCard, Headphones, Award, CheckCircle } from 'lucide-react';

export function WhyChooseUs() {
    const features = [
        {
            icon: Shield,
            title: '100% Authentic Products',
            description: 'We guarantee the authenticity of every item. All products are verified before shipping.',
        },
        {
            icon: Truck,
            title: 'Fast & Reliable Delivery',
            description: 'Quick delivery across Ghana. We ensure your orders reach you safely and on time.',
        },
        {
            icon: CreditCard,
            title: 'Secure Payment',
            description: 'Your payments are processed securely through Paystack. Your financial information is protected.',
        },
        {
            icon: Headphones,
            title: '24/7 Customer Support',
            description: 'Our dedicated support team is always ready to assist you with any questions or concerns.',
        },
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'We curate only the finest luxury items from trusted suppliers worldwide.',
        },
        {
            icon: CheckCircle,
            title: 'Satisfaction Guaranteed',
            description: 'Not satisfied? We offer hassle-free returns within 7 days of delivery.',
        },
    ];

    return (
        <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">
                        Why Choose Elite Alfa Ventures?
                    </h2>
                    <p className="text-[var(--color-brown)] mx-auto mt-4 max-w-2xl text-lg">
                        We're committed to providing you with the best shopping experience and premium quality products.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 bg-[var(--color-off-white)] p-6 text-center transition-all hover:border-[var(--color-mustard-gold)] hover:shadow-md"
                            >
                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-[var(--color-deep-blue)]/10 p-4">
                                        <Icon className="h-8 w-8 text-[var(--color-deep-blue)]" />
                                    </div>
                                </div>
                                <h3 className="text-[var(--color-deep-blue)] mb-2 text-xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-[var(--color-brown)] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
