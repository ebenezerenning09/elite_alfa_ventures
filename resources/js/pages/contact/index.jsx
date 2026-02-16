import { Head, useForm } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'));
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            content: '+233 24 123 4567',
            link: 'tel:+233241234567',
        },
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            content: '+233 24 123 4567',
            link: 'https://wa.me/233241234567',
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'info@elitealfaventures.com',
            link: 'mailto:info@elitealfaventures.com',
        },
        {
            icon: MapPin,
            title: 'Location',
            content: 'Kumasi, KNUST, Ghana',
            link: '#',
        },
    ];

    return (
        <EcommerceLayout>
            <Head title="Contact Us - Elite Alfa Ventures | Kumasi, KNUST, Ghana" />

            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight sm:text-5xl">
                        Contact Us
                    </h1>
                    <p className="text-[var(--color-brown)] mx-auto mt-4 max-w-2xl text-lg">
                        Have a question or need assistance? We're here to help! Reach out to us through any of the
                        channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-[var(--color-deep-blue)] mb-6 text-xl font-bold">
                                Get in Touch
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={info.link}
                                            target={info.link.startsWith('http') ? '_blank' : '_self'}
                                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                            className="flex items-start gap-4 text-[var(--color-brown)] transition-colors hover:text-[var(--color-deep-blue)]"
                                        >
                                            <div className="rounded-full bg-[var(--color-deep-blue)]/10 p-3">
                                                <Icon className="h-5 w-5 text-[var(--color-deep-blue)]" />
                                            </div>
                                            <div>
                                                <h3 className="text-[var(--color-deep-blue)] mb-1 font-semibold">
                                                    {info.title}
                                                </h3>
                                                <p className="text-sm">{info.content}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Business Hours */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-[var(--color-deep-blue)] mb-4 font-semibold">
                                    Business Hours
                                </h3>
                                <div className="text-[var(--color-brown)] space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="text-[var(--color-deep-blue)] mb-6 text-xl font-bold">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="name" className="text-[var(--color-deep-blue)]">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-[var(--color-deep-blue)]">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="phone" className="text-[var(--color-deep-blue)]">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="subject" className="text-[var(--color-deep-blue)]">
                                            Subject *
                                        </Label>
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="mt-1 text-[var(--color-deep-blue)]"
                                            required
                                        />
                                        {errors.subject && (
                                            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="message" className="text-[var(--color-deep-blue)]">
                                        Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="mt-1 min-h-[150px] text-[var(--color-deep-blue)]"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-lg"
                                    size="lg"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </EcommerceLayout>
    );
}
