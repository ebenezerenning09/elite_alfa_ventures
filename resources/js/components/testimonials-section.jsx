import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Mensah',
            location: 'Kumasi, Ghana',
            rating: 5,
            text: 'I purchased a luxury watch from Elite Alfa Ventures and I\'m extremely satisfied! The quality is outstanding and the delivery was fast. Highly recommend!',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        },
        {
            id: 2,
            name: 'Kwame Asante',
            location: 'Accra, Ghana',
            rating: 5,
            text: 'The jewelry I bought for my wife was absolutely beautiful. Authentic quality and excellent customer service. Will definitely shop here again!',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        },
        {
            id: 3,
            name: 'Ama Osei',
            location: 'Kumasi, KNUST',
            rating: 5,
            text: 'Fast delivery, secure payment, and authentic products. Elite Alfa Ventures has become my go-to for luxury items. Trustworthy and reliable!',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        },
        {
            id: 4,
            name: 'David Kofi',
            location: 'Kumasi, Ghana',
            rating: 5,
            text: 'Excellent experience from start to finish. The designer bag I ordered exceeded my expectations. Great quality and professional service!',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        },
    ];

    return (
        <section className="bg-[var(--color-off-white)] py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-[var(--color-brown)] mx-auto mt-4 max-w-2xl text-lg">
                        Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-5 w-5 fill-[var(--color-bright-yellow)] text-[var(--color-bright-yellow)]"
                                    />
                                ))}
                            </div>
                            <div className="mb-4">
                                <Quote className="h-8 w-8 text-[var(--color-deep-blue)]/20" />
                            </div>
                            <p className="text-[var(--color-brown)] mb-6 text-sm leading-relaxed">
                                {testimonial.text}
                            </p>
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-[var(--color-deep-blue)] font-semibold">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-[var(--color-brown)] text-xs">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
